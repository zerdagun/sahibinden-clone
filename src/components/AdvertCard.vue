<template>
  <router-link 
    :to="{ name: 'Product', params: { id: advert.id } }" 
    class="advert-card"
  >
    <div class="image-container">
      <img :src="advert.imageUrl" :alt="advert.title" class="advert-image" />
    </div>
    
    <div class="card-details">
      <div class="price">
        {{ advert.price }} <span class="currency">{{ advert.currency || 'TL' }}</span>
      </div>
      
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

const props = defineProps({
  advert: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>

.advert-card {
  display: flex;            
  flex-direction: column;   
  width: 100%;              
  background-color: #fff;   
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  overflow: hidden;         
  text-decoration: none;    
  color: #333;
  transition: all 0.2s ease;
  height: 100%;             
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
}

.advert-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
  transform: translateY(-2px); 
  border-color: #ccc;
}


.image-container {
  width: 100%;
  height: 160px; 
  background-color: #f0f0f0;
  border-bottom: 1px solid #eee;
  position: relative;
}

.advert-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  display: block;
}


.card-details {
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
  justify-content: space-between;
}

.price {
  font-size: 16px;
  font-weight: bold;
  color: #3264c3; 
  margin-bottom: 8px;
}

.currency {
  font-size: 0.8em;
  font-weight: normal;
}

.title {
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  height: 38px; 
  overflow: hidden;
  margin-bottom: 12px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
}

.specs {
  font-size: 11px;
  color: #666;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.specs span:not(:last-child)::after {
  content: " • ";
  color: #ccc;
}

.location {
  font-size: 11px;
  color: #666;
  border-top: 1px solid #f0f0f0;
  padding-top: 8px;
  display: flex;
  align-items: center;
}

.icon-location {
  margin-right: 4px;
}
</style>