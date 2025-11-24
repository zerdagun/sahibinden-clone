<template>
    <div class="favorites-page">
      
      <SiteHeader /> 
      
      
      <Favorites />
  
      <SiteFooter />
    </div>
  </template>
  
  <script setup>
  
  import SiteHeader from '../components/SiteHeader.vue'; 
  import SiteFooter from '../components/SiteFooter.vue';
  import Favorites from '../components/Favorites.vue'; 
  
  
  </script>
  
  <style scoped>
  .favorites-page {
   
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
  }
  </style>
  
      
  