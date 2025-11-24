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
          <a href="#">☆ Favorilerime Ekle</a>
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
          <ul class="classified-info-list">
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
      />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { mockAdverts } from '../data/mockAdverts.js'; 
import SellerProducts from '../components/SellerProducts.vue';

const route = useRoute();
const product = ref(null);


const currentIndex = ref(0);


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

const loadProduct = () => {
  const routeId = parseInt(route.params.id);
  const foundProduct = mockAdverts.find(p => p.id === routeId);
  
  if (foundProduct) {
    const productData = { ...foundProduct };
    
    if (!productData.images || productData.images.length === 0) {
      productData.images = productData.imageUrl ? [productData.imageUrl] : [];
    }
    
    product.value = productData;
    
    currentIndex.value = 0; 
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
</style>