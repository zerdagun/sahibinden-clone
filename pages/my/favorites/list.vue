<template>
  <div class="my-favorites-list-page">
    <div class="sidebar-layout">
        <aside class="left-sidebar">
            <div class="sidebar-menu">
                <div class="menu-group">
                    <div class="menu-title active">Favori İlanlar</div>
                </div>
            </div>
        </aside>

        <main class="main-content">
            <div class="content-header">
                <h2>Favori Listem</h2>
                <div class="header-actions">
                    <div class="filter-dropdown">
                        Tümü
                    </div>
                    <div class="filter-dropdown">
                        Yayında
                    </div>
                </div>
            </div>

            <div class="favorite-items-list">
                <div v-if="favorites.length === 0" class="empty-state">
                    Henüz favorilerine eklediğin bir ilan yok.
                </div>
                
                <div v-else class="fav-item" v-for="item in favorites" :key="item.firestoreId">
                    <div class="item-image" @click="navigateToProduct(item.adId)" style="cursor: pointer;">
                       <img :src="item.image || 'https://via.placeholder.com/120x90'" alt="Product Image">
                    </div>
                    <div class="item-details" @click="navigateToProduct(item.adId)" style="cursor: pointer;">
                        <div class="item-title">
                            {{ item.title }}
                        </div>
                        <div class="item-info">
                            <span class="item-price-inline">{{ item.price }} TL</span>
                        </div>
                    </div>
                    <div class="item-actions">
                        <button @click="handleDelete(item.adId)" class="delete-btn" title="Favorilerden Çıkar">
                            <span class="delete-icon">×</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="footer-note">
                * Son 1 yıl içerisinde favoriye eklediğiniz ilanlar listelenmektedir.
            </div>
        </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useFavoritesStore } from '~/stores/favorites';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'profile',
  middleware: 'auth'
});

const favStore = useFavoritesStore();
const router = useRouter();

onMounted(() => {
    favStore.fetchFavorites();
});

const favorites = computed(() => favStore.items);

const navigateToProduct = (adId) => {
  router.push(`/product/${adId}`);
};

const handleDelete = async (adId) => {
  if (confirm('Bu ilanı favorilerinizden çıkarmak istediğinize emin misiniz?')) {
    await favStore.removeFavorite(adId);
  }
};
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
}
.menu-title.active {
    font-weight: bold;
    color: #333;
    background: #eef5fb;
    border-left-color: #438ed8;
    border-left-style: solid;
    border-width: 0 0 0 3px;
}

.main-content {
    flex: 1;
    background: #fff;
    border: 1px solid #eee;
    min-height: 400px;
    padding: 20px;
}

.content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #333;
    padding-bottom: 10px;
    margin-bottom: 0;
}

.content-header h2 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 0;
}

.header-actions {
    display: flex;
    gap: 5px;
}

.filter-dropdown {
    background: #444;
    color: #fff;
    padding: 5px 15px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 2px;
}
.filter-dropdown:last-child {
    background: #fff;
    color: #666;
    border: 1px solid #ddd;
}

.favorite-items-list {
    border: 1px solid #eee;
    border-top: none;
}

.fav-item {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #eee;
    gap: 15px;
}
.fav-item:last-child { border-bottom: none; }

.item-image {
    width: 120px;
    height: 90px;
    flex-shrink: 0;
    border: 1px solid #eee;
}
.item-image img {
    width: 100%; height: 100%; object-fit: cover;
}

.item-details {
    flex: 1;
    cursor: pointer;
}

.item-title {
    font-size: 15px;
    font-weight: bold;
    color: #3264c3;
    display: block;
    margin-bottom: 5px;
}
.item-title:hover { text-decoration: underline; }

.item-info {
    font-size: 12px;
    color: #666;
}

.item-price-inline {
    font-weight: bold;
    color: #333;
}

.item-actions {
    display: flex;
    align-items: flex-start;
    padding-top: 5px;
}

.delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    color: #999;
    font-size: 24px;
    line-height: 1;
    transition: color 0.2s;
}

.delete-btn:hover {
    color: #d00;
}

.delete-icon {
    display: block;
    font-weight: 300;
}

.footer-note {
    font-size: 11px;
    color: #666;
    margin-top: 15px;
}

.no-underline { text-decoration: none; }
</style>
