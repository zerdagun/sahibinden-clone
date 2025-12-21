<template>
  <div class="seller-products-container" v-if="otherProducts.length > 0">
    <div class="section-header">
      {{ headerTitle }}
    </div>
    
    <div class="products-grid">
      <NuxtLink 
        v-for="ad in otherProducts" 
        :key="ad.id" 
        :to="`/product/${ad.id}`"
        class="product-link"
      >
        <AdvertCard :advert="ad" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { mockAdverts } from '../data/mockAdverts.ts';
import AdvertCard from './AdvertCard.vue';

const props = defineProps({
  currentProductId: {
    type: Number,
    required: true
  },
  sellerName: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: false,
    default: 'vasita'
  }
});

const headerTitle = computed(() => {
  if (props.categoryId === 'emlak') {
    return 'Emlakçının Diğer İlanları';
  }
  return 'Galerinin Diğer İlanları';
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

.product-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.product-link:hover {
  transform: translateY(-2px);
}
</style>