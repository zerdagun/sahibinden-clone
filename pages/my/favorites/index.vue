<template>
  <div class="my-favorites-page">
    <div class="sidebar-layout">
        <aside class="left-sidebar">
            <div class="sidebar-menu">
                <div class="menu-group">
                    <div class="menu-title active">Favori İlanlar</div>
                </div>
                <div class="menu-group">
                    <div class="menu-title">Favori Aramalar</div>
                </div>
                 <div class="menu-group">
                    <div class="menu-title">Favori Satıcılar</div>
                </div>
            </div>
        </aside>

        <main class="main-content">
            <div class="content-header">
                <h2>Favori İlanlar</h2>
            </div>

            <div class="favorites-grid">
                
                <div class="fav-list-card">
                    <div class="list-cover">
                        
                    </div>
                    <div class="list-info">
                        <div class="list-title">Favori Listem</div>
                        <div class="list-count">({{ favorites.length }} ilan)</div>
                    </div>
                    <NuxtLink to="/my/favorites/list" class="card-link"></NuxtLink>
                </div>

                <div class="fav-list-card new-list">
                    <div class="plus-icon-circle">+</div>
                    <div class="new-list-text">Yeni Liste Oluştur</div>
                </div>
            </div>
            
        </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '~/stores/favorites';

definePageMeta({
  layout: 'profile',
  middleware: 'auth'
});

const favStore = useFavoritesStore();

import { onMounted } from 'vue';

onMounted(() => {
    favStore.fetchFavorites();
});

const favorites = computed(() => favStore.items);
</script>

<style scoped>
.sidebar-layout {
    display: flex;
    gap: 20px;
}

.left-sidebar {
    width: 240px;
    background: #fff;
    border: 1px solid #eee;
    padding: 10px 0;
}

.menu-title {
    padding: 10px 15px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    border-left: 3px solid transparent;
}
.menu-title.active {
    font-weight: bold;
    color: #333;
    background: #eef5fb;
    border-left-color: #438ed8;
}

.main-content {
    flex: 1;
    background: #fff;
    border: 1px solid #eee;
    min-height: 400px;
    padding: 20px;
}

.content-header h2 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

.favorites-grid {
    display: flex;
    gap: 20px;
}

.fav-list-card {
    width: 300px;
    height: 180px;
    border: 1px solid #eee;
    position: relative;
    cursor: pointer;
    transition: box-shadow 0.2s;
    background: #fff;
}
.fav-list-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }

.list-cover {
    height: 120px;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    
    display: flex;
    align-items: center;
    justify-content: center;
}

.list-info {
    padding: 15px;
    text-align: center;
}

.list-title {
    font-weight: bold;
    color: #fff; 
    font-size: 16px;
    
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.list-count {
    color: #fff;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 13px;
}

.card-link {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
}

.new-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px dashed #ccc;
}

.plus-icon-circle {
    width: 40px; height: 40px;
    background-color: #007bff;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 10px;
}

.new-list-text {
    color: #007bff;
    font-size: 14px;
}
</style>
