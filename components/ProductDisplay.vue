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
      </div>

      <div class="classified-content">
        <div class="left-column">
          <div class="gallery-container">
            <div class="main-image">
              <img :src="currentImage" alt="Araç Resmi" />
              <span class="img-count" v-if="product.images">1/{{ product.images.length }}</span>
            </div>
            <div class="thumbnails" v-if="product.images && product.images.length > 1">
              <img 
                v-for="(img, index) in product.images" 
                :key="index" 
                :src="img" 
                @click="currentImage = img"
                :class="{ active: currentImage === img }"
              />
            </div>
          </div>
        </div>

        <div class="center-column">
          <div class="price-section">
            {{ product.price }} {{ product.currency }}
          </div>
          <ul class="classified-info-list" v-if="!product.detailedSpecs">
            <li><strong>İlan No</strong> <span class="red-text">{{ product.id }}</span></li>
            <li><strong>Marka</strong> <span>{{ product.brand }}</span></li>
            <li><strong>Model</strong> <span>{{ product.model }}</span></li>
            <li><strong>Yıl</strong> <span>{{ product.year }}</span></li>
            <li><strong>KM</strong> <span>{{ product.km }}</span></li>
          </ul>

          <ul class="classified-info-list" v-else>
             <li v-for="(spec, idx) in product.detailedSpecs" :key="idx">
                <strong>{{ spec.label }}</strong>
                <span :class="{ 'red-text': spec.label === 'İlan No' }">{{ spec.value }}</span>
             </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
  <div v-else style="padding:20px; text-align:center; color:#999;">
    Ürün görüntülenemiyor. (Component sunumu için örnek veri seçilmedi)
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { mockAdverts } from '../data/mockAdverts.ts'; 
import SellerProducts from '../components/SellerProducts.vue';

const route = useRoute();
const product = ref(null);
const currentImage = ref('');

const loadProduct = () => {
  let foundProduct = null;
  const routeId = parseInt(route.params.id);

  if (!isNaN(routeId)) {
    foundProduct = mockAdverts.find(p => p.id === routeId);
  } 
  
  else {
    
    foundProduct = mockAdverts[0];
  }
  
  if (foundProduct) {
  
    const productData = { ...foundProduct };

    if (!productData.images || productData.images.length === 0) {
      productData.images = productData.imageUrl ? [productData.imageUrl] : [];
    }
    
    currentImage.value = productData.images[0] || '';
    product.value = productData;
  }
};

onMounted(loadProduct);
watch(() => route.params.id, loadProduct);
</script>

<style scoped>

* { box-sizing: border-box; }
.breadcrumb ul { display: flex; gap: 5px; list-style: none; padding: 0; margin: 0; }
.breadcrumb li { font-size: 12px; color: #333; display: flex; align-items: center; }
.breadcrumb li:not(:last-child)::after {
  content: ">";
  display: inline-block;
  margin-left: 5px;
  color: #999;
  font-size: 10px;
}
.container { width: 100%; max-width: 1000px; margin: 0 auto; }
.classified-header h1 { font-size: 18px; color: #333; margin-bottom: 10px; }
.classified-content { display: flex; gap: 20px; }
.left-column { width: 50%; }
.center-column { width: 50%; }
.main-image img { width: 100%; height: 300px; object-fit: contain; background: #eee; }
.thumbnails { display: flex; gap: 5px; margin-top: 5px; }
.thumbnails img { width: 60px; height: 45px; object-fit: cover; cursor: pointer; border: 2px solid transparent; }
.thumbnails img.active { border-color: #ffd300; }
.price-section { color: #3264c3; font-size: 20px; font-weight: bold; margin-bottom: 15px; }
.classified-info-list { list-style: none; padding: 0; }
.classified-info-list li { display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 5px 0; font-size: 13px; }
.red-text { color: #d00; font-weight: bold; }
</style>