<template>
    <div class="product-display-container">
      
      <!-- İlan Başlığı ve Fiyat -->
      <header class="advert-header">
        <div class="title-section">
          <h1>{{ advert.title }}</h1> 
          <p class="location-text">📍 {{ advert.location }}</p> 
        </div>
        <div class="price-section">
          <span class="price-value">{{ advert.price }} TL</span> 
        </div>
      </header>
  
      <!-- Ana İçerik: Fotoğraflar ve Özellikler Yan Yana -->
      <main class="main-advert-content">
        
        <!-- 1. Fotoğraf ve Galeri Bölümü -->
        <section class="photo-gallery">
          <div class="main-photo">
            <img src="https://placehold.co/400x450/eeeeee/333333?text=ANA+FOTOĞRAF" alt="Ana İlan Fotoğrafı" style="object-fit: contain; max-width: 100%; max-height: 100%;"/>
          </div>
          <div class="thumbnail-list">
            <button class="thumb-button">1/ Fotoğraf</button>
            <button class="thumb-button">Büyük Fotoğraf 🔍</button>
          </div>
        </section>
  
        <!-- 2. Özellikler ve Satıcı Bilgileri -->
        <aside class="details-sidebar">
          <!-- Temel Özellikler Tablosu -->
          <table class="specs-table">
            <tr v-for="(value, key) in advert.specs" :key="key">
              <td class="spec-key">{{ key }}</td>
              <td class="spec-value">{{ value }}</td>
            </tr>
          </table>
  
          <hr>
  
          <!-- Satıcı/Mağaza Bilgisi -->
          <div class="seller-info">
            <div class="seller-name">{{ advert.seller.name }}</div>
            <p class="seller-type">{{ advert.seller.type }}</p>
            
            <!-- Telefon Butonları -->
            <button class="btn-contact">📞 {{ advert.seller.phone1 }}</button>
            <button class="btn-contact">📞 {{ advert.seller.phone2 }}</button>
            
            <!-- Satıcının Diğer İlanları -->
            <a href="#" class="other-adverts">→ Tüm İlanlarına Git</a>
          </div>
          
          <!-- Aksiyon Butonları -->
          <div class="action-buttons">
              <button class="btn-action btn-fav">⭐ Favorilere Ekle</button>
          </div>
        </aside>
      </main>
  
      <!-- İlan Detayları ve Teknik Özellikler Alt Bölümü -->
      <section class="bottom-details">
          <h2>İlan Detayları</h2>
          <p>{{ advert.description }}</p>
          <h2>Teknik Özellikler</h2>
      </section>
  
    </div>
  </template>
  
<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';
import { mockAdverts } from '../data/mockAdverts';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
});

const emptyAdvert = {
  id: props.id,
  title: 'İlan bulunamadı',
  location: '-',
  price: '-',
  seller: {
    name: '-',
    type: '-',
    phone1: '-',
    phone2: '-'
  },
  specs: {},
  description: 'Bu ID için ilan kaydı bulunamadı.'
};

const advert = computed(() => {
  const numericId = Number(props.id);
  const found = mockAdverts.find((item) =>
    Number.isNaN(numericId) ? item.id === props.id : item.id === numericId
  );
  return found ?? emptyAdvert;
});
</script>
  
  <style scoped>
  .product-display-container {
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 15px;
  }
  .advert-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .advert-header h1 {
    font-size: 1.6em;
    margin: 0;
  }
  .location-text {
    font-size: 0.9em;
    color: #666;
  }
  .price-value {
    font-size: 2em;
    font-weight: bold;
    color: #d9534f;
  }
  .main-advert-content {
    display: flex;
    gap: 30px;
  }
  .photo-gallery {
    flex: 2;
  }
  .details-sidebar {
    flex: 1;
  }
  .main-photo {
    height: 450px;
    background-color: #f5f5f5;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .thumbnail-list {
      display: flex;
      gap: 10px;
  }
  .thumb-button {
      padding: 8px 15px;
      border: 1px solid #ddd;
      background: #fff;
      border-radius: 4px;
      cursor: pointer;
  }
  .specs-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  .specs-table td {
    padding: 8px 0;
    border-bottom: 1px dashed #eee;
  }
  .spec-key {
    font-weight: 500;
    color: #777;
  }
  .seller-info {
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
  }
  .btn-contact {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
  }
  .action-buttons {
      margin-top: 20px;
  }
  .btn-action {
      width: 100%;
      padding: 10px;
      background-color: #fff;
      border: 1px solid #007bff;
      color: #007bff;
      border-radius: 4px;
      font-weight: bold;
  }
  .bottom-details {
      margin-top: 40px;
  }
  .bottom-details h2 {
      font-size: 1.4em;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      margin-bottom: 15px;
  }
  </style>
  