<template>
  <div class="seller-products-container" v-if="otherProducts.length > 0">
    <div class="section-header">
      Galerinin Diğer İlanları
    </div>
    
    <div class="products-grid">
      <AdvertCard 
        v-for="ad in otherProducts" 
        :key="ad.id" 
        :advert="ad" 
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { mockAdverts } from '../data/mockAdverts.js';
import AdvertCard from './AdvertCard.vue';


const props = defineProps({
  currentProductId: {
    type: Number,
    required: true
  },
  sellerName: {
    type: String,
    required: true
  }
});


const otherProducts = computed(() => {
  return mockAdverts.filter(ad => 
    ad.sellerName === props.sellerName && 
    ad.id !== props.currentProductId
  );
});
</script>

<style scoped>
.seller-products-container {
  margin-top: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
}

.section-header {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.products-grid {
  display: grid;
  
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
}
</style>