<template>
    <div class="product-page-view">
      <!-- İlan detay içeriğini gösteren component -->
      <!-- URL'den gelen ID'yi ProductDisplay'e iletiyoruz -->
      <ProductDisplay :id="productId" />

      <SellerProducts :product-id="productId" />

      <SiteFooter />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  // Yolların doğru olduğundan emin olun!
  import SiteFooter from '../components/SiteFooter.vue';
  import ProductDisplay from '../components/ProductDisplay.vue'; // Sizin ProductDisplay componentiniz
  import SellerProducts from '../components/SellerProducts.vue';
  
  const route = useRoute();
  
  // URL'den (router'dan) gelen product ID'yi alır. Örn: /product/123 ise, 123'ü alır.
  const productId = computed(() => route.params.id);
  </script>
  
  <style scoped>
  .product-page-view {
    /* Sayfa düzeni stilleri */
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  </style>
  