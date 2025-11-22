// dosya: src/views/HomeView.vue
<template>
  <div class="home-view">
    
    <main class="main-content-wrapper">
      
      <Sidebar />

      <section class="advert-listing-section">
        
        <header class="listing-header">
          <h2>Vitrin İlanları</h2>
          <a href="#" class="view-all">Tüm vitrin ilanlarını göster ></a>
        </header>

        <div class="advert-grid">
          <AdvertCard v-for="advert in featuredAdverts" :key="advert.id" :advert="advert" />
        </div>
      </section>

    </main>
    
    <SiteFooter />
  </div>
</template>

<script setup>
// Header importu kaldırıldı.
import SiteFooter from '../components/SiteFooter.vue';
import Sidebar from '../components/SideBar.vue';
import AdvertCard from '../components/AdvertCard.vue';
import { computed } from 'vue';
import { mockAdverts } from '../data/mockAdverts';

const featuredAdverts = computed(() => mockAdverts.slice(0, 4));
</script>

<style scoped>
.main-content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 15px;
  gap: 20px;
  /* KRİTİK DÜZELTME: Header'ın arkasına kaymayı engellemek için boşluk */
  padding-top: 55px; 
}
.advert-listing-section {
  flex-grow: 1;
}
.listing-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 15px;
}
.listing-header h2 {
  font-size: 1.5em;
  color: #333;
}
.view-all {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9em;
}
.advert-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 15px;
}
</style>