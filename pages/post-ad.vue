<template>
  <div class="post-ad-page">
    <div class="container">
       <div class="nav-links-right">
            <a href="#">İlan Vermenin Püf Noktaları</a>
       </div>

       <div class="step-container form-step">
           <h3 class="step-title">İlan Ver</h3>
           <p class="info-note">Hızlı ve kolay bir şekilde ilanını oluştur.</p>

           <form @submit.prevent="submitAd" class="ad-form">
                <div class="form-group">
                    <label>İlan Başlığı</label>
                    <input v-model="form.title" type="text" required class="input-field" placeholder="Örn: Sahibinden temiz..." />
                </div>
                
                <div class="form-group">
                    <label>Kategori</label>
                    <select v-model="form.categoryId" class="input-field" required>
                        <option value="" disabled>Seçiniz</option>
                        <option value="emlak">Emlak</option>
                        <option value="vasita">Vasıta</option>
                        <option value="yedek-parca">Yedek Parça</option>
                        <option value="ikinci-el">İkinci El ve Sıfır Alışveriş</option>
                        <option value="diger">Diğer</option>
                    </select>
                </div>

                <div class="form-group h-group">
                    <div class="half">
                        <label>Fiyat</label>
                        <div class="price-row">
                            <input v-model.number="form.price" type="number" required class="input-field" />
                            <select v-model="form.currency" class="input-field currency-select">
                                <option value="TL">TL</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Açıklama</label>
                    <textarea v-model="form.description" rows="6" class="input-field"></textarea>
                </div>
                
                <div class="form-group">
                    <label>Özellikler (Virgülle ayırın)</label>
                    <input v-model="featuresInput" type="text" class="input-field" placeholder="Örn: Boyasız, Değişensiz, Sunroof" />
                </div>

                <div class="form-group">
                    <label>Konum</label>
                    <input v-model="form.location" type="text" required class="input-field" placeholder="İl / İlçe" />
                </div>

                <div class="form-actions">
                     <button type="submit" :disabled="loading" class="btn-submit">
                        {{ loading ? 'Kaydediliyor...' : 'İlanı Yayınla' }}
                     </button>
                </div>
           </form>
       </div>
    </div>
    
    <div class="footer-simple">
        <div class="footer-content">
             7/24 Müşteri Hizmetleri 0 850 222 44 44 | Yardım Merkezi yardım.sahibinden.com
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAdStore } from '~/stores/ads';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: 'auth'
});

const adStore = useAdStore();
const authStore = useAuthStore();
const router = useRouter();

const step = ref(1);
const selectedCategory = ref('');
const loading = ref(false);
const featuresInput = ref('');

const form = reactive({
  title: '',
  price: null,
  currency: 'TL',
  description: '',
  location: '',
  categoryId: '',
  images: ['https://via.placeholder.com/300']
});

const selectCategory = (cat: string) => {
    selectedCategory.value = cat;
    form.categoryId = cat; 
    step.value = 2;
};

const submitAd = async () => {
    if(!authStore.user) {
        alert("Oturum süreniz dolmuş olabilir. Lütfen tekrar giriş yapın.");
        return;
    }
    
    loading.value = true;
    try {
        const features = featuresInput.value.split(',').map(f => f.trim()).filter(f => f);
        
        await adStore.createAd({
            ...form,
            sellerId: authStore.user.uid,
            sellerName: authStore.user.displayName || authStore.user.email,
            status: 'active',
            date: new Date().toLocaleDateString('tr-TR'),
            features: features
        });
        
        alert("İlanınız başarıyla yayına alındı!");
        router.push('/');
    } catch (error) {
        console.error(error);
        alert("Bir hata oluştu.");
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
.post-ad-page {
    background-color: #fff;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    padding-top: 20px;
}

input, select, textarea {
    background-color: #fff !important;
    color: #333 !important;
}

.container {
    width: 980px;
    margin: 0 auto;
    padding-bottom: 50px;
}

.nav-links-right {
    text-align: right;
    margin-bottom: 20px;
}
.nav-links-right a {
    color: #666;
    font-size: 13px;
    text-decoration: none;
}
.nav-links-right a:hover {
    text-decoration: underline;
    color: #3264c3;
}

.step-container {
    border: 1px solid #eee;
    padding: 30px;
    border-radius: 3px;
    background: #fff; 
}

.step-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 25px;
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    margin-bottom: 30px;
}

.cat-card {
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
    padding: 20px 10px;
    cursor: pointer;
    transition: all 0.2s;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: 4px solid transparent; 
}
.cat-card:hover { 
    box-shadow: 0 0 10px rgba(0,0,0,0.1); 
    border-color: #bbb;
}

.cat-card:nth-child(1) { border-top-color: #ff9800; } 
.cat-card:nth-child(2) { border-top-color: #f44336; } 
.cat-card:nth-child(3) { border-top-color: #009688; } 
.cat-card:nth-child(4) { border-top-color: #2196f3; } 
.cat-card:nth-child(5) { border-top-color: #9c27b0; }
.cat-card:nth-child(6) { border-top-color: #2196f3; }
.cat-card:nth-child(7) { border-top-color: #4caf50; }
.cat-card:nth-child(8) { border-top-color: #8bc34a; }
.cat-card:nth-child(9) { border-top-color: #00bcd4; }
.cat-card:nth-child(10) { border-top-color: #ff5722; }

.cat-icon {
    font-size: 24px;
    margin-bottom: 10px;
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #fff;
}

.cat-icon.orange { background: #ff9800; }
.cat-icon.red { background: #f44336; }
.cat-icon.teal { background: #009688; }
.cat-icon.blue { background: #2196f3; }
.cat-icon.purple { background: #9c27b0; }
.cat-icon.green { background: #4caf50; }
.cat-icon.olive { background: #8bc34a; }

.cat-name {
    font-size: 13px;
    color: #333;
    font-weight: 500;
}

.divider {
    text-align: center;
    border-bottom: 1px solid #eee;
    height: 10px;
    margin: 30px 0;
}
.divider span {
    background: #fff;
    padding: 0 10px;
    color: #999;
    font-size: 12px;
    font-weight: bold;
}

.search-category-section h4 {
    margin: 0 0 10px 0;
    font-size: 14px;
    color: #333;
}

.cat-search-input {
    width: 600px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 14px;
}

.selected-cat-summary {
    background: #e3f2fd;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #333;
    border-radius: 3px;
}
.change-cat {
    color: #d00;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 10px;
    font-size: 12px;
}

.ad-form {
    max-width: 700px;
}

.form-group {
    margin-bottom: 20px;
}
.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 13px;
    color: #333;
}
.input-field {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
}
.input-field:focus {
    border-color: #3264c3;
    outline: none;
}

.h-group { display: flex; gap: 20px; }
.half { flex: 1; }

.price-row {
    display: flex;
    gap: 10px;
}
.currency-select {
    width: 80px;
}

.btn-submit {
    background-color: #3264c3;
    color: #fff;
    border: none;
    padding: 10px 40px;
    font-weight: bold;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
}
.btn-submit:hover {
    background-color: #2854a8;
}

.footer-simple {
    margin-top: 50px;
    padding: 30px 0;
    border-top: 1px solid #eee;
    text-align: center;
    font-size: 12px;
    color: #999;
}
</style>
