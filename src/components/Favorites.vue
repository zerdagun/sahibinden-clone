<template>
  <div class="favorites-page">
    
    <div class="sub-header-nav">
      <div class="container">
        <span>İlan Yönetimi</span>
        <span>Alışveriş İşlemlerim</span>
        <span class="active">Favoriler</span>
        <span>Mesajlar ve Bilgilendirmeler</span>
        <span>Servisler</span>
        <span>Hesabım</span>
      </div>
    </div>

    <div class="container main-layout">
      
      <div class="sidebar">
        <div class="menu-item active">Favori İlanlar</div>
        <div class="menu-item">Favori Aramalar</div>
        <div class="menu-item">Favori Satıcılar</div>
      </div>

      <div class="content">
        <h2 class="page-title">Favori Listem</h2>
        
        <div class="toolbar">
          <div class="tabs">
            <button class="tab-btn active">Tümü</button>
            <button class="tab-btn">Yayında</button>
          </div>
          <div class="category-select">
            Kategori ▾
          </div>
        </div>

        <div class="info-box">
          ℹ️ Listenizde yayında olan {{ favorites.length }} adet ilan bulunmaktadır.
        </div>

        <div class="table-header">
          <div class="col-title">İlan Başlığı</div>
          <div class="col-price">Fiyat</div>
        </div>

        <div class="fav-list">
          
          <div v-if="favorites.length === 0" class="empty-state">
            Henüz favorilere ilan eklemediniz.
          </div>

          <div v-for="item in favorites" :key="item.id" class="fav-item">
            
            <div class="item-left">
              <div class="item-img">
                <img :src="item.imageUrl || (item.images && item.images[0])" alt="ilan">
              </div>
              
              <div class="item-details">
                <router-link :to="`/product/${item.id}`" class="item-title">
                  {{ item.title }}
                </router-link>
                <div class="breadcrumb-text">
                  Emlak > Konut > Satılık > {{ item.caseType || 'Daire' }}
                </div>
              </div>
            </div>

            <div class="item-right">
              <div class="price-text">{{ item.price }} {{ item.currency }}</div>
              <button class="remove-btn" @click="removeFromFavorites(item.id)">Sil</button>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const favorites = ref([]);


const loadFavorites = () => {
  favorites.value = JSON.parse(localStorage.getItem('myFavorites') || '[]');
};


const removeFromFavorites = (id) => {
  
  favorites.value = favorites.value.filter(item => item.id !== id);
  
  localStorage.setItem('myFavorites', JSON.stringify(favorites.value));
};

onMounted(() => {
  loadFavorites();
});
</script>

<style scoped>

.favorites-page {
  background-color: #fff;
  font-family: 'Roboto', sans-serif;
  color: #333;
  min-height: 100vh;
}

.container {
  width: 1150px;
  margin: 0 auto;
}


.sub-header-nav {
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  font-size: 13px;
  color: #666;
  margin-bottom: 20px;
}
.sub-header-nav span {
  margin-right: 25px;
  cursor: pointer;
}
.sub-header-nav span.active {
  color: #3264c3;
  font-weight: bold;
  border-bottom: 2px solid #3264c3;
  padding-bottom: 14px;
}


.main-layout {
  display: flex;
  gap: 20px;
}


.sidebar {
  width: 200px;
  flex-shrink: 0;
  background-color: #f4f6f9; 
  border: 1px solid #eee;
  height: fit-content;
}
.menu-item {
  padding: 12px 15px;
  font-size: 13px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.menu-item.active {
  background-color: #e3f2fd; 
  color: #3264c3;
  font-weight: bold;
  border-left: 3px solid #3264c3;
}


.content {
  flex: 1;
}

.page-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}


.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.tabs { display: flex; }
.tab-btn {
  padding: 8px 15px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
}
.tab-btn.active {
  background-color: #555;
  color: #fff;
  border-color: #555;
}
.category-select {
  border: 1px solid #ccc;
  padding: 5px 15px;
  font-size: 12px;
  background: #fff;
  color: #666;
}


.info-box {
  background-color: #e9f3fa;
  border: 1px solid #cce4f5;
  color: #3264c3;
  padding: 15px;
  font-size: 12px;
  margin-bottom: 10px;
}


.table-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 11px;
  border-bottom: 2px solid #333;
  padding: 5px 0;
  margin-bottom: 10px;
}

.fav-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.item-left {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.item-img img {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border: 1px solid #eee;
}

.item-title {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #3264c3;
  text-decoration: none;
  margin-bottom: 5px;
}
.item-title:hover { text-decoration: underline; }

.breadcrumb-text {
  font-size: 11px;
  color: #666;
}

.item-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.price-text {
  font-weight: bold;
  color: #3264c3;
  font-size: 14px;
}

.remove-btn {
  background: transparent;
  border: 1px solid #ddd;
  color: #d00;
  font-size: 11px;
  padding: 3px 8px;
  cursor: pointer;
  border-radius: 3px;
}
.remove-btn:hover {
    background: #d00;
    color: #fff;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
}
</style>