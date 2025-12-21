<template>
  <div class="product-detail-page" v-if="product">
    <div class="container">
      
      <div class="breadcrumb">
        <ul>
          <li>Vasıta</li>
          <li>Otomobil</li>
          <li>{{ product.brand }}</li>
          <li>{{ product.series }}</li>
          <li>{{ product.model }}</li>
        </ul>
      </div>

      <div class="classified-header-wrapper">
        <div class="classified-header">
          <h1>{{ product.title }}</h1>
        </div>
        <div class="header-actions">
          <a href="#" @click.prevent="toggleFavorite" class="fav-action-link">
            {{ isFavorite ? '★' : '☆' }} Favorilerime Ekle
          </a>
          <a href="#">🖨 Yazdır</a>
          <a href="#">f Facebook</a>
        </div>
      </div>

      <div class="classified-content">
        
        <div class="left-column">
          <div class="gallery-container">
            <div class="main-image">
              <img 
                v-if="product.images && product.images.length > 0" 
                :src="product.images[currentIndex]" 
                alt="Araç Resmi" 
              />
              
              <span class="img-count" v-if="product.images">
                {{ currentIndex + 1 }}/{{ product.images.length }}
              </span>

              <div v-if="product.paramGuvende" class="param-badge-large">
                <span class="badge-check">✓</span> Param Güvende
              </div>
            </div>

            <div class="thumbnails" v-if="product.images && product.images.length > 1">
              <img 
                v-for="(img, index) in product.images" 
                :key="index" 
                :src="img" 
                @click="changeImage(index)" 
                :class="{ active: currentIndex === index }"
              />
            </div>
          </div>
          <div class="gallery-links">
            <a href="#">🔍 Büyük Fotoğraf</a>
          </div>
        </div>

        <div class="center-column">
          <div class="price-section">
            {{ product.price }} {{ product.currency }}
          </div>
          <div class="location-info">
            {{ product.location }}
          </div>
          <ul class="classified-info-list" v-if="product.detailedSpecs && product.detailedSpecs.length > 0">
            <li v-for="(spec, index) in product.detailedSpecs" :key="index">
              <strong>{{ spec.label }}</strong>
              <span :class="{ 'red-text': spec.label === 'İlan No' }">{{ spec.value }}</span>
            </li>
          </ul>
          <ul class="classified-info-list" v-else>
            <li><strong>İlan No</strong> <span class="red-text">{{ product.id }}</span></li>
            <li><strong>İlan Tarihi</strong> <span>{{ product.date }}</span></li>
            <li><strong>Marka</strong> <span>{{ product.brand }}</span></li>
            <li><strong>Seri</strong> <span>{{ product.series }}</span></li>
            <li><strong>Model</strong> <span>{{ product.model }}</span></li>
            <li><strong>Yıl</strong> <span>{{ product.year }}</span></li>
            <li><strong>Yakıt</strong> <span>{{ product.fuelType }}</span></li>
            <li><strong>Vites</strong> <span>{{ product.gear }}</span></li>
            <li><strong>KM</strong> <span>{{ product.km }}</span></li>
            <li><strong>Motor Gücü</strong> <span>{{ product.power }}</span></li>
            <li><strong>Renk</strong> <span>{{ product.color }}</span></li>
            <li><strong>Kimden</strong> <span>{{ product.fromWho }}</span></li>
          </ul>

          <template v-if="product.paramGuvende">
            <ul class="classified-info-list extra-info">
              <li><strong>Durumu</strong> <span>İkinci El</span></li>
              <li><strong>Takas</strong> <span>Hayır</span></li>
            </ul>
            <div class="action-buttons">
              <button class="teklif-btn" @click.prevent="handleTeklifVer">Teklif ver</button>
              <button class="sepete-ekle-btn" @click.prevent="handleAddToCart">Sepete Ekle</button>
              <button class="satin-al-btn" @click.prevent="handleSatinAl">Satın Al</button>
            </div>
            <a href="#" class="complaint-link">⚠ İlan ile İlgili Şikayetim Var</a>
          </template>
        </div>

        <div class="right-column">
          <div class="seller-card">
            <div class="seller-header">
              <h3>{{ product.sellerName }}</h3>
            </div>
            <div class="seller-info">
              <div class="seller-name">Satıcı</div>
              <a href="#">Tüm İlanları</a>
            </div>
            <div class="phone-display">
              <div class="phone-label">Cep</div>
              <div class="phone-number">{{ product.sellerPhone }}</div>
            </div>
            <button class="msg-btn">Mesaj Gönder</button>
          </div>
        </div>

      </div>

      <div class="details-tabs-container">
        <ul class="detail-tabs">
          <li class="active">İlan Detayları</li>
        </ul>
      </div>
      <div class="description-area">
        <div class="description-header">Açıklama</div>
        <div class="description-content">
          <template v-if="product.features && product.features.length">
             <p class="desc-line bold" v-for="(feature, i) in product.features" :key="i">
              {{ feature }}
            </p>
          </template>
          <template v-else>
            <p>Açıklama bulunmamaktadır.</p>
          </template>
        </div>
      </div>

      <SellerProducts
        :currentProductId="product.id"
        :sellerName="product.sellerName"
        :categoryId="product.categoryId"
      />

    </div>
  </div>

  <LoginPopup 
    :isOpen="showLoginPopup" 
    @close="showLoginPopup = false"
    @success="onLoginSuccess"
  />
  
  <TeklifVerModal 
    v-if="product"
    :isOpen="showTeklifModal" 
    :product="product"
    @close="showTeklifModal = false"
    @checkout="goToCheckout"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { useFavoritesStore } from '~/stores/favorites';
import { useAdStore } from '~/stores/ads';
import { useCartStore } from '~/stores/cart';
import type { IAd } from '~/types';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const favStore = useFavoritesStore();
const adStore = useAdStore();

const isLoggedIn = computed(() => !!authStore.user);

const product = ref<IAd | null>(null);
const currentIndex = ref(0);

const showLoginPopup = ref(false);
const showTeklifModal = ref(false);
const pendingAction = ref(null);

const changeImage = (index) => {
  currentIndex.value = index;
};

const addToFavorites = () => {
  if (!product.value) return;
  let favorites = JSON.parse(localStorage.getItem('myFavorites') || '[]');
  const exists = favorites.find(f => f.id === product.value.id);
  if (exists) {
    alert('Bu ilan zaten favorilerinizde ekli!');
  } else {
    favorites.push(product.value);
    localStorage.setItem('myFavorites', JSON.stringify(favorites));
    alert('İlan favorilere eklendi!');
  }
};

const handleTeklifVer = () => {
  if (!isLoggedIn.value) {
    
    router.push('/login');
  } else {
    showTeklifModal.value = true;
  }
};

const handleAddToCart = () => {
  if (!isLoggedIn.value) {
    showLoginPopup.value = true;
    return;
  }
  
  if (product.value) {
      const cartStore = useCartStore();
      cartStore.addToCart(product.value);
      
      router.push('/cart');
  }
};

const handleSatinAl = () => {

  if (!isLoggedIn.value) {
    showLoginPopup.value = true;
    return;
  }
  
  router.push({ path: '/checkout', query: { productId: product.value?.id } });
};

const onLoginSuccess = () => {
  showLoginPopup.value = false;
};

const goToCheckout = () => {
  router.push({ path: '/checkout', query: { productId: product.value?.id } });
};

const loadProduct = async () => {
  const routeId = route.params.id as string;
  await authStore.initAuth(); 

  await adStore.fetchAdById(routeId);
  
  if (adStore.currentAd) {
    const productData = { ...adStore.currentAd };

    if (!productData.images || productData.images.length === 0) {
        
      productData.images = productData.imageUrl ? [productData.imageUrl] : [];
    }
    
    product.value = productData;
    
    currentIndex.value = 0; 

    if (isLoggedIn.value) {
      favStore.fetchFavorites();
    }
  }
};

const isFavorite = computed(() => {
  if (!product.value || !favStore.items) return false;
  return favStore.items.some(f => f.adId === product.value.id);
});

const toggleFavorite = async () => {
  if (!isLoggedIn.value) {
    showLoginPopup.value = true;
    return;
  }
  if (isFavorite.value) {
    await favStore.removeFavorite(product.value.id);
  } else {
    await favStore.addFavorite(product.value);
  }
};

onMounted(loadProduct);
watch(() => route.params.id, loadProduct);
</script>

<style scoped>

* { box-sizing: border-box; }

.product-detail-page {
  background-color: #f7f7f7;
  min-height: 100vh;
  padding-bottom: 50px;
  font-family: Arial, sans-serif;
  color: #333;
}

.container {
  width: 1150px;
  margin: 0 auto;
  padding-top: 15px;
}

.breadcrumb ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
  font-size: 12px;
}
.breadcrumb li { color: #000; }
.breadcrumb li::after { content: '>'; margin: 0 8px; color: #999; }
.breadcrumb li:last-child { color: #999; }
.breadcrumb li:last-child::after { content: ''; }

.classified-header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid #f1f1f1;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.classified-header h1 {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #333;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 700px;
}
.header-actions a {
  font-size: 13px;
  text-decoration: none;
  color: #3264c3;
  margin-left: 20px;
}
.header-actions a:hover { text-decoration: underline; }

.classified-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.left-column { width: 480px; flex-shrink: 0; }
.center-column { flex: 1; min-width: 300px; }
.right-column { width: 280px; flex-shrink: 0; }

.gallery-container { border: 1px solid #eee; background: #fff; padding: 5px; }
.main-image { width: 100%; height: 360px; background: #eee; position: relative; margin-bottom: 5px; }
.main-image img { width: 100%; height: 100%; object-fit: contain; background: #f0f0f0; }
.img-count { position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.6); color: #fff; font-size: 11px; padding: 2px 6px; border-radius: 2px; }

.thumbnails { 
  display: flex; 
  gap: 10px; 
  overflow-x: auto; 
  margin-top: 10px; 

  padding-bottom: 10px; 
  padding-right: 20px; 
  
  scroll-behavior: smooth;
  width: 100%; 
}

.thumbnails::-webkit-scrollbar {
  height: 6px;
}
.thumbnails::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}

.thumbnails img { 
  width: 80px; 
  height: 60px; 
  object-fit: cover; 
  cursor: pointer; 

  border: 2px solid transparent; 
  opacity: 0.6; 
  
  flex-shrink: 0; 
  transition: all 0.2s ease; 
}

.thumbnails img.active { 
  border-color: #ffd300; 
  opacity: 1; 
}

.thumbnails img:hover { 
  opacity: 1; 
  border-color: #ddd; 
}

.gallery-links { margin-top: 8px; font-size: 12px; }
.gallery-links a { text-decoration: none; color: #3264c3; }

.price-section { font-size: 24px; color: #3264c3; font-weight: bold; margin-bottom: 5px; }
.location-info { font-size: 13px; color: #333; margin-bottom: 20px; }
.classified-info-list { list-style: none; padding: 0; margin: 0; font-size: 13px; border-top: 1px solid #f1f1f1; }
.classified-info-list li { display: flex; justify-content: space-between; border-bottom: 1px solid #f1f1f1; padding: 8px 0; }
.classified-info-list li strong { font-weight: 600; color: #333; }
.classified-info-list li span.red-text { color: #d00; font-weight: bold; }

.seller-card { background: #fff; border: 1px solid #e0e0e0; padding: 15px; position: sticky; top: 20px; }
.seller-header h3 { font-size: 15px; color: #3264c3; margin: 0 0 10px 0; font-weight: bold; }
.seller-info { margin-bottom: 15px; }
.seller-name { font-weight: bold; font-size: 13px; }
.seller-info a { font-size: 12px; color: #3264c3; text-decoration: none; }
.phone-display { background: #f9f9f9; padding: 10px; border: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.phone-number { font-weight: bold; font-size: 15px; color: #333; }
.msg-btn { width: 100%; background: #3264c3; color: #fff; border: none; padding: 10px; font-weight: bold; cursor: pointer; border-radius: 3px; }
.msg-btn:hover { background: #2851a3; }

.details-tabs-container { margin-top: 30px; border-bottom: 2px solid #ffd300; }
.detail-tabs { display: flex; list-style: none; padding: 0; margin: 0; }
.detail-tabs li { padding: 10px 20px; background: #fff; font-size: 13px; font-weight: bold; color: #000; border: 1px solid #e0e0e0; border-bottom: none; margin-right: 5px; }
.detail-tabs li.active { background: #ffd300; border-color: #ffd300; }
.description-area { background: #fff; border: 1px solid #e0e0e0; border-top: none; padding: 20px; }
.description-header { font-weight: bold; background: #f9f9f9; padding: 8px 15px; margin: -20px -20px 20px -20px; border-bottom: 1px solid #e0e0e0; }
.description-content { text-align: center; }
.desc-line { margin: 8px 0; font-size: 14px; }
.bold { font-weight: 700; }

.param-badge-large {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #1bb3a0, #17a08f);
  color: white;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
}

.badge-check {
  font-size: 12px;
}

.param-guvende-actions {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.action-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.info-row {
  font-size: 13px;
}

.info-row strong {
  color: #333;
  margin-right: 10px;
}

.info-row span {
  color: #666;
}

.classified-info-list.extra-info {
  margin-top: 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin: 15px 0 12px;
}

.teklif-btn {
  flex: 1;
  padding: 12px 20px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.teklif-btn:hover {
  border-color: #999;
  background: #f5f5f5;
}

.satin-al-btn {
  flex: 1;
  padding: 12px 20px;
  background: #1bb3a0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.satin-al-btn:hover {
  background: #159a89;
}

.complaint-link {
  display: block;
  font-size: 12px;
  color: #999;
  text-decoration: none;
  margin-top: 5px;
}

.complaint-link:hover {
  color: #666;
  text-decoration: underline;
}

.fav-btn {
  padding: 0 15px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.fav-btn:hover {
  background: #e0e0e0;
}

.sepete-ekle-btn {
  flex: 1;
  padding: 12px 10px;
  background-color: #f38e23; 
  color: white;
  border: 1px solid #e07d10;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.sepete-ekle-btn:hover {
    background-color: #e07d10;
}
</style>