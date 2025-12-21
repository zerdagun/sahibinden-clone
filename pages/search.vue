<template>
  <div class="search-page-layout">
    <div class="container">

        <aside class="search-sidebar">
            <div class="category-tree">
                <div class="cat-header">Vasıta</div>
                <ul class="cat-list">
                    <li class="active">Otomobil</li>
                    <li>Abarth (2)</li>
                    <li>Aion (2)</li>
                    <li>Alfa Romeo (746)</li>
                    <li>Alpine (2)</li>
                    <li>Anadol (4)</li>
                    <li>Arora (23)</li>
                    <li>Aston Martin (43)</li>
                    <li>Audi (15.232)</li>
                    
                </ul>
            </div>

            <div class="filter-section">
                <div class="filter-title">Adres</div>
                <div class="filter-content">
                    <select class="filter-select"><option>Türkiye</option></select>
                    <select class="filter-select"><option>İl</option></select>
                    <select class="filter-select"><option>İlçe</option></select>
                </div>
            </div>

             <div class="filter-section">
                <div class="filter-title">Fiyat</div>
                <div class="filter-content price-inputs">
                    <input type="text" placeholder="min TL">
                    <span>-</span>
                    <input type="text" placeholder="max TL">
                </div>
            </div>
            
            <button class="sidebar-search-btn">Ara</button>
        </aside>

        <main class="search-results-area">

            <div class="result-header-bar">
                <div class="result-summary">
                    "<strong>{{ query }}</strong>" araması için "<strong>Vasıta</strong>" kategorisinde <strong>{{ filteredAds.length }}</strong> sonuç bulundu.
                </div>
                <div class="result-actions">
                    <a href="#">☆ Aramayı Kaydet</a>
                    <a href="#">Seçtiklerimi Gizle ^</a>
                </div>
            </div>

            <div class="active-filters-bar">
                <span>Arama Kelimesi <strong>{{ query }}</strong> <span class="calc-icon">x</span></span>
                <a href="#" class="clear-all">Tümünü Temizle</a>
            </div>

            <div class="result-tabs">
                <button class="tab-btn active">Tümü</button>
                <button class="tab-btn">Sahibinden</button>
                <button class="tab-btn">Galeriden</button>
                <button class="tab-btn">Yetkili Bayiden</button>
                
                <div class="tab-right-tools">
                    <button class="view-btn list-view active">≣</button>
                    <button class="view-btn grid-view">☷</button>
                    <select class="sort-select">
                        <option>Gelişmiş sıralama</option>
                        <option>Fiyata göre (Önce en yüksek)</option>
                    </select>
                </div>
            </div>

            <div class="results-table-wrapper">
                <table class="results-table">
                    <thead>
                        <tr>
                            <th style="width: 120px;"></th> 
                            <th>Marka</th>
                            <th>Seri</th>
                            <th>Model</th>
                            <th style="width: 300px;">İlan Başlığı</th>
                            <th>Yıl</th>
                            <th>KM</th>
                            <th>Fiyat</th>
                            <th>İlan Tarihi</th>
                            <th>İl / İlçe</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr 
                            v-for="ad in filteredAds" 
                            :key="ad.id" 
                            class="result-row"
                            @click="$router.push(`/product/${ad.id}`)"
                        >
                            <td class="img-cell">
                                <img :src="ad.imageUrl || ad.images?.[0] || 'https://via.placeholder.com/120x90'" alt="item" class="result-img">
                            </td>
                            <td>{{ ad.brand || 'Mercedes' }}</td>
                            <td>{{ ad.series || 'C Serisi' }}</td>
                            <td>{{ ad.model || 'C 200' }}</td>
                            <td class="title-cell">
                                {{ ad.title }}
                                <div class="badge-icons" v-if="ad.paramGuvende">🛡️</div>
                            </td>
                            <td>{{ ad.year || 2024 }}</td>
                            <td>{{ ad.km || '6.001' }}</td>
                            <td class="price-cell">{{ ad.price }} {{ ad.currency }}</td>
                            <td>{{ ad.date || '16 Aralık' }}</td>
                            <td>{{ ad.location || 'Muğla Fethiye' }}</td>
                        </tr>
                        
                         <tr v-if="filteredAds.length === 0">
                            <td colspan="10" class="no-results-td">
                                Aradığınız kriterlere uygun ilan bulunamadı.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="pagination-mock">
                 <button disabled>&lt;</button>
                 <button class="active">1</button>
                 <button>2</button>
                 <button>3</button>
                 <button>4</button>
                 <button>5</button>
                 <button>&gt;</button>
            </div>

        </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdStore } from '~/stores/ads';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const adStore = useAdStore();
const { ads, loading } = storeToRefs(adStore);

const query = computed(() => route.query.q as string || '');

onMounted(async () => {
    await adStore.fetchAds();
});

const filteredAds = computed(() => {
    const q = query.value.toLowerCase();

    if (!q) return ads.value;
    return ads.value.filter(ad => 
        ad.title.toLowerCase().includes(q) || 
        (ad.description && ad.description.toLowerCase().includes(q))
    );
});

definePageMeta({
    layout: 'default'
});
</script>

<style scoped>
.search-page-layout {
    background: #f7f7f7;
    min-height: 100vh;
    padding: 20px 0;
    font-family: Arial, sans-serif;
}

input, select, textarea {
    background-color: #fff !important;
    color: #333 !important;
}
.container {
    width: 1150px;
    margin: 0 auto;
    display: flex;
    gap: 15px;
}

.search-sidebar {
    width: 220px;
    flex-shrink: 0;
}
.category-tree {
    background: #fff;
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 20px;
}
.cat-header {
    font-weight: bold;
    color: #3264c3;
    margin-bottom: 10px;
    font-size: 14px;
}
.cat-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.cat-list li {
    font-size: 12px;
    color: #3264c3;
    padding: 3px 0;
    cursor: pointer;
}
.cat-list li.active {
    font-weight: bold;
    color: #000;
}
.cat-list li span { color: #999; }

.filter-section {
    margin-bottom: 15px;
}
.filter-title {
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 5px;
    color: #333;
}
.filter-select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    margin-bottom: 5px;
    font-size: 12px;
}
.price-inputs {
    display: flex;
    align-items: center;
    gap: 5px;
}
.price-inputs input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    font-size: 12px;
}
.sidebar-search-btn {
    width: 100%;
    background: #3264c3;
    color: #fff;
    border: none;
    padding: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
    border-radius: 3px;
}

.search-results-area {
    flex: 1;
    background: #fff;
    border: 1px solid #eee;
    padding: 15px; 
}

.result-header-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 12px;
    color: #666;
}
.result-header-bar strong { color: #d00; }
.result-actions a {
    margin-left: 15px;
    color: #3264c3;
    text-decoration: none;
}

.active-filters-bar {
    background: #f9f9f9;
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}
.calc-icon { color: #d00; cursor: pointer; font-weight: bold; margin-left: 5px; }
.clear-all { color: #3264c3; text-decoration: none; }

.result-tabs {
    display: flex;
    border-bottom: 1px solid #3264c3;
    margin-bottom: 0;
    position: relative;
    height: 30px;
}
.tab-btn {
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-bottom: none;
    padding: 0 15px;
    cursor: pointer;
    font-weight: bold;
    font-size: 12px;
    color: #333;
    margin-right: 2px;
}
.tab-btn.active {
    background: #fff;
    border-color: #3264c3;
    color: #333;
    border-bottom: 1px solid #fff; 
    position: relative;
    top: 1px;
}

.tab-right-tools {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    gap: 5px;
}
.view-btn {
    border: 1px solid #ddd;
    background: #fff;
    cursor: pointer;
    width: 30px;
}
.view-btn.active { background: #eee; }
.sort-select {
    border: 1px solid #ddd;
    font-size: 11px;
}

.results-table-wrapper {
    margin-top: -1px; 
}
.results-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
}
.results-table th {
    background: #f0f0f0;
    text-align: left;
    padding: 8px;
    font-weight: bold;
    color: #666;
    border-bottom: 1px solid #ccc;
     white-space: nowrap;
}
.results-table td {
    padding: 10px 8px;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
}
.result-row:hover {
    background-color: #fcfcfc;
    cursor: pointer;
}

.img-cell img {
    width: 100%;
    height: 80px;
    object-fit: cover;
    border: 1px solid #eee;
}

.title-cell {
    font-weight: bold;
    color: #3264c3;
    font-size: 13px;
}
.price-cell {
    font-weight: bold;
    color: #3264c3;
    font-size: 14px;
}

.no-results-td {
    text-align: center;
    padding: 40px;
    color: #999;
}

.pagination-mock {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 5px;
}
.pagination-mock button {
    border: 1px solid #ddd;
    background: #fff;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 12px;
}
.pagination-mock button.active {
    background: #3264c3;
    color: #fff;
    border-color: #3264c3;
}
</style>
