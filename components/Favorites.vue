<template>
  <div class="favorites-component">
    <div class="content-header">
        <h2>Favori İlanlar</h2>
    </div>

    <div class="favorites-grid">
        
        <div class="fav-list-card">
            <div class="list-cover">
                <!-- Cover Image -->
            </div>
            <div class="list-info">
                <div class="list-title">Favori Listem</div>
                <div class="list-count">({{ favorites.length }} ilan)</div>
            </div>
            <!-- In component mode, we might not want to navigate away, or maybe we do -->
            <NuxtLink to="/my/favorites" class="card-link"></NuxtLink>
        </div>

        <div class="fav-list-card new-list">
            <div class="plus-icon-circle">+</div>
            <div class="new-list-text">Yeni Liste Oluştur</div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useFavoritesStore } from '~/stores/favorites';

// No page meta or layout since this is a component
const favStore = useFavoritesStore();

onMounted(() => {
    favStore.fetchFavorites();
});

const favorites = computed(() => favStore.items);
</script>

<style scoped>
.favorites-component {
    padding: 20px;
    background: #fff;
    border: 1px solid #eee;
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
    flex-wrap: wrap; /* Allowing wrap for component view */
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