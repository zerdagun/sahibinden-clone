<template>
    <router-link :to="`/product/${advert.id}`" class="advert-card">
      <div class="image-container">
        <img :src="advert.imageUrl" :alt="advert.title" class="advert-image" />
      </div>
      <div class="card-details">
        
        <div class="price">{{ advert.price }} TL</div>
        
        <h3 class="title">{{ advert.title }}</h3>
        
        <div class="specs">
          <span>{{ advert.year }}</span>
          <span>{{ advert.km }} KM</span>
          <span>{{ advert.fuelType }}</span>
        </div>
  
        <div class="location">
          <span class="icon-location">📍</span> {{ advert.location }}
        </div>
      </div>
    </router-link>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Componentin dışarıdan (HomeView.vue'dan) alacağı veri yapısı.
  const props = defineProps({
    advert: {
      type: Object,
      required: true,
      // Component tasarladığımız için, bir örnek mock data (sahte veri) verelim.
      default: () => ({
        id: 1,
        imageUrl: 'https://via.placeholder.com/300x200?text=Araba+Foto',
        price: '3.445.000',
        title: 'AKÇİNLER OTO DAN 2023 MODEL BMW X1 SDRIVE20I M SPORT',
        year: 2023,
        km: '42.500',
        fuelType: 'Hybrid',
        location: 'Manisa Yunusemre / Evrenos Mh',
      })
    }
  });
  </script>
  
  <style scoped>
  /* Sahibinden.com kart stili için temel CSS */
  .advert-card {
    display: block;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    text-decoration: none; /* Link stilini kaldırma */
    color: #333;
    transition: box-shadow 0.2s;
  }
  
  .advert-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .image-container {
    overflow: hidden;
    height: 180px; /* Görsel yüksekliği */
  }
  
  .advert-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card-details {
    padding: 10px;
  }
  
  .price {
    font-size: 1.1em;
    font-weight: bold;
    color: #007bff; /* Mavi fiyat tonu */
    margin-bottom: 5px;
  }
  
  .title {
    font-size: 0.85em;
    font-weight: 500;
    height: 32px; /* Başlık için sabit yükseklik */
    overflow: hidden;
    margin: 0 0 8px 0;
  }
  
  .specs, .location {
    font-size: 0.75em;
    color: #666;
    margin-top: 5px;
  }
  
  .specs span:not(:last-child)::after {
    content: " | ";
  }
  </style>