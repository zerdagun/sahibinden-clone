<template>
  <div class="component-viewer">
    <div class="header">
      <NuxtLink to="/components" class="back-link">← Back to Components</NuxtLink>
      <h1>{{ componentName }}</h1>
    </div>
    
    <div class="preview-area">
      
      <component :is="componentName" v-if="isValidComponent" v-bind="sampleProps" />
      <div v-else class="error">Component "{{ componentName }}" not found.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const route = useRoute();
const componentName = computed(() => route.params.name as string);

const validComponents = [
  'AdvertCard',
  'Favorites',
  'LoginForm',
  'LoginPopup',
  'ProductDisplay',
  'RegisterForm',
  'SellerProducts',
  'SideBar',
  'SiteFooter',
  'SiteHeader',
  'TeklifVerModal'
];

const isValidComponent = computed(() => validComponents.includes(componentName.value));

const sampleProps = computed(() => {
  if (componentName.value === 'AdvertCard') {
    return {
      advert: {
        id: 1,
        title: 'Sample Advert',
        price: '100.000',
        currency: 'TL',
        location: 'İstanbul',
        imageUrl: 'https://via.placeholder.com/300x200'
      }
    };
  }
  if (componentName.value === 'SellerProducts') {
    return {
      currentProductId: 1,
      sellerName: 'Demo Seller'
    };
  }
  return {};
});
</script>

<style scoped>
.component-viewer {
  padding: 20px;
  min-height: 100vh;
  background: #fafafa;
}

.header {
  max-width: 1200px;
  margin: 0 auto 30px;
}

.back-link {
  color: #3264c3;
  text-decoration: none;
  font-size: 14px;
}

.back-link:hover {
  text-decoration: underline;
}

h1 {
  margin-top: 10px;
  color: #333;
}

.preview-area {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 300px;
}

.error {
  color: #d00;
  padding: 40px;
  text-align: center;
}
</style>
