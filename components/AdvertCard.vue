<template>
  <div class="advert-card">
    <div class="image-container">
      <img :src="advert.imageUrl || advert.images?.[0]" :alt="advert.title" class="advert-image" />
    </div>
    
    <p class="card-title">{{ advert.title }}</p>
  </div>
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
  height: 100%;       
  background-color: #fff;   
  border: 1px solid #e6e6e6;
  overflow: hidden;         
  text-decoration: none;    
  color: #333;
  transition: all 0.2s ease;
  
}

.advert-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12); 
  border-color: #ccc;
}

.image-container {
  width: 100%;
  height: 120px; 
  background-color: #f0f0f0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.advert-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  display: block;
}

.card-title {
  padding: 8px;
  font-size: 11px;
  line-height: 1.3;
  color: #333;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  text-align: center;
  height: 38px; 
}

.param-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #1bb3a0, #17a08f);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.badge-icon {
  font-size: 9px;
}
</style>