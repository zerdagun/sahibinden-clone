<template>
  <div class="home">
    <div class="container">
      
      <div class="main-content-wrapper">
        
        <SideBar class="sidebar" />

        <div class="content-area">
          <h2 class="section-title">Vitrin İlanları</h2>
          
          <div class="adverts-grid">
            <AdvertCard 
              v-for="ad in adverts" 
              :key="ad.id" 
              :advert="ad" 
            />
          </div>
        </div>

      </div>
    </div>

    <SiteFooter />
  </div>
</template>

<script setup>

import { mockAdverts } from '../data/mockAdverts.js';
import AdvertCard from '../components/AdvertCard.vue';


import SideBar from '../components/SideBar.vue';
import SiteFooter from '../components/SiteFooter.vue';

const adverts = mockAdverts;
</script>

<style scoped>
.home {
  background-color: #f7f7f7;
  min-height: 100vh;
  padding-top: 20px;
  
  overflow-x: hidden; 
}

.container {
  width: 1150px;
  margin: 0 auto;
}


.main-content-wrapper {
  display: flex;
  gap: 20px;
  align-items: flex-start; 
  width: 100%;
}

.sidebar {
  
  width: 240px;
  flex-shrink: 0; 
}

.content-area {
  
  flex-grow: 1;
  
  width: 100%; 
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.adverts-grid {
  display: grid;
  
  grid-template-columns: repeat(4, minmax(180px, 1fr)); 
  gap: 15px;
  width: 100%;
}
</style>