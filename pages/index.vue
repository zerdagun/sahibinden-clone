<template>
  <div class="home">
    <div class="container">
      <div class="main-content-wrapper">
        <SideBar class="sidebar" />
        <div class="content-area">

          <div class="reklam-bar">
            <button class="reklam-btn" @click="showAd = !showAd">Reklamı Göster ▼</button>
          </div>
          <div v-if="showAd" class="reklam-image">
            <img src="https://via.placeholder.com/1150x200" alt="Main Banner" style="width: 100%; height: auto; display: block;">
          </div>

          <div class="section-header">
            <h2 class="section-title">Anasayfa Vitrini</h2>
            <a href="#" class="section-link">Tüm vitrin ilanlarını göster</a>
          </div>
          <div v-if="loading" class="loading">Yükleniyor...</div>
          <div v-else class="adverts-grid vitrin-grid">
            <NuxtLink 
              v-for="ad in vitrinAds" 
              :key="ad.id" 
              :to="`/product/${ad.id}`"
              class="vitrin-item-link"
            >
                <AdvertCard :advert="ad" />
            </NuxtLink>
          </div>

          <div class="quick-links-section">
            <h3 class="quick-links-title">Oto360</h3>
            <div class="quick-links-row">
              <a href="#" class="quick-link"><span class="icon blue">🚗</span> Araç Değerleme</a>
              <a href="#" class="quick-link"><span class="icon blue">⇌</span> Araç Karşılaştırma</a>
              <a href="#" class="quick-link"><span class="icon teal">🔧</span> Araç Hasar Sorgulama</a>
              <a href="#" class="quick-link"><span class="icon orange">📋</span> Oto Ekspertiz</a>
              <a href="#" class="quick-link"><span class="icon green">💰</span> Kredi Teklifleri</a>
              <a href="#" class="quick-link"><span class="icon blue">🚙</span> Sıfır Araç Dünyası</a>
              <a href="#" class="quick-link"><span class="icon gray">🏠</span> S-Aracım</a>
            </div>
          </div>

          <div class="quick-links-section">
            <h3 class="quick-links-title">Emlak360</h3>
            <div class="quick-links-row">
              <a href="#" class="quick-link"><span class="icon blue">📊</span> Emlak Endeksi</a>
              <a href="#" class="quick-link"><span class="icon blue">🏘️</span> Gayrimenkul Ekspertiz</a>
              <a href="#" class="quick-link"><span class="icon orange">💳</span> Kredi Teklifleri</a>
              <a href="#" class="quick-link"><span class="icon brown">📖</span> Emlak Alım Rehberi</a>
              <a href="#" class="quick-link"><span class="icon brown">📖</span> Emlak Kiralama Rehberi</a>
              <a href="#" class="quick-link"><span class="icon brown">📖</span> Emlak Satış Rehberi</a>
            </div>
          </div>

          <div class="quick-links-section">
            <h3 class="quick-links-title">Alışveriş Blog</h3>
            <div class="quick-links-row">
              <a href="#" class="quick-link"><span class="icon green-bg">🏠</span> Ev & Yaşam</a>
              <a href="#" class="quick-link"><span class="icon purple-bg">💻</span> Teknoloji</a>
              <a href="#" class="quick-link"><span class="icon pink-bg">👗</span> Moda</a>
              <a href="#" class="quick-link"><span class="icon orange-bg">⚽</span> Spor & Outdoor</a>
              <a href="#" class="quick-link"><span class="icon red-bg">👶</span> Anne & Bebek</a>
            </div>
          </div>

          <div class="section-header">
            <h2 class="section-title blue-title">Konut Projeleri</h2>
            <a href="#" class="section-link">Tüm Projeleri göster</a>
          </div>
          <div class="projects-grid">
            <div class="project-card">
              <div class="project-image">
                <img src="https://via.placeholder.com/300x200" alt="Project">
              </div>
              <div class="project-info">
                <h4>NOVA PİREMİUM</h4>
                <p class="project-location">Kahramanmaraş / Onikişubat</p>
                <span class="project-badge">Aralık 2025 Teslim</span>
              </div>
            </div>
            <div class="project-card">
              <div class="project-image">
                <img src="https://via.placeholder.com/300x200" alt="Project">
              </div>
              <div class="project-info">
                <h4>OSMAN BEY EVLERİ</h4>
                <p class="project-location">Tekirdağ / Saray</p>
                <span class="project-badge green">Hemen Teslim</span>
              </div>
            </div>
          </div>

          <div class="section-header">
            <h2 class="section-title orange-title">İlginç İlanlar</h2>
            <a href="#" class="section-link">Tüm ilginç ilanları göster</a>
          </div>
          <div class="interesting-grid">
            <div class="interesting-item" v-for="item in ilgincIlanlar" :key="item.id">
              <img :src="item.image" :alt="item.title" />
              <p>{{ item.title }}</p>
            </div>
          </div>

          <h3 class="section-subtitle">Popüler Ürünler</h3>
          <div class="popular-products-grid">
            <div class="popular-product" v-for="product in populerUrunler" :key="product.name">
              <img :src="product.image" :alt="product.name" />
              <p>{{ product.name }}</p>
            </div>
          </div>

          <div class="brands-section">
            <h3 class="section-subtitle orange-text">Popüler Alışveriş Markaları</h3>
            <div class="brands-grid">
              <div class="brand-logo" v-for="brand in brandLogos" :key="brand">
                <span class="brand-placeholder">{{ brand }}</span>
              </div>
            </div>
          </div>

          <div class="tags-section">
            <h3 class="section-subtitle">Popüler Aramalar</h3>
            <div class="tags-container">
              <a href="#" class="tag" v-for="tag in populerAramalar" :key="tag">{{ tag }}</a>
            </div>
          </div>

          <div class="tags-section">
            <h3 class="section-subtitle">Sıfır Araçlar Dünyası</h3>
            <div class="tags-container blue-tags">
              <a href="#" class="tag blue" v-for="tag in sifirAraclar" :key="tag">{{ tag }}</a>
            </div>
          </div>

          <div class="tags-section">
            <h3 class="section-subtitle green-text">Popüler Hizmetler</h3>
            <div class="tags-container">
              <a href="#" class="tag" v-for="tag in populerHizmetler" :key="tag">{{ tag }}</a>
            </div>
          </div>

          <div class="tags-section">
            <h3 class="section-subtitle blue-text">Popüler İş İlanları</h3>
            <div class="tags-container blue-tags">
              <a href="#" class="tag blue" v-for="tag in populerIsIlanlari" :key="tag">{{ tag }}</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAdStore } from '~/stores/ads';
import { useRouter } from 'vue-router';

const router = useRouter();
const adStore = useAdStore();
const { ads, loading } = storeToRefs(adStore);

const showAd = ref(false);

const vitrinAds = computed(() => {
  const base = ads.value || [];
  
  const expanded = [...base, ...base, ...base, ...base, ...base, ...base, ...base];
  return expanded.slice(0, 28); 
});

const ilgincIlanlar = ref([
  { id: 1, title: 'LA CASA DE PAPE...', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Keyiften değil KE...', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'DOĞUM GÜNÜ G...', image: 'https://via.placeholder.com/150' },
  { id: 4, title: '2022 KIDEMLİ SİLİ...', image: 'https://via.placeholder.com/150' },
  { id: 5, title: 'Şampiyonluk Gar...', image: 'https://via.placeholder.com/150' },
  { id: 6, title: 'WALTER WHITE M...', image: 'https://via.placeholder.com/150' },
  { id: 7, title: 'TÜRKİYE DE TEK X...', image: 'https://via.placeholder.com/150' },
]);

const populerUrunler = ref([
  { name: 'Fritöz & Airfryer', image: 'https://via.placeholder.com/100' },
  { name: 'Gelinlik Modelleri', image: 'https://via.placeholder.com/100' },
  { name: 'Blender', image: 'https://via.placeholder.com/100' },
  { name: 'Klima', image: 'https://via.placeholder.com/100' },
  { name: 'Nişan Elbisesi', image: 'https://via.placeholder.com/100' },
]);

const brandLogos = ref([
  'adidas', 'istikbal', 'nike', 'xiaomi', 'dyson', 'IKEA', 'ROLEX', 'Hot Wheels', 'RKS', 'SEIKO', 'Carraro', 'Renzo'
]);

const populerAramalar = ref([
  'iphone 14', 'Togg', 'Yenilenmiş Telefonlar', 'Yenilenmiş iPhone 14', 'Elektrikli Bisiklet', 
  'iphone 15 pro', 'Bisiklet', 'Yenilenmiş Apple iPhone', 'Yenilenmiş iPhone 11', '14 Pro Max',
  'Yenilenmiş iPhone 12', 'Yenilenmiş iPhone 13', 'Laptop', 'Oyuncu Koltuğu'
]);

const sifirAraclar = ref([
  'Renault Fiyat Listesi', 'Honda Fiyat Listesi', 'BMW Fiyat Listesi', 'Opel Fiyat Listesi',
  'Mercedes-Benz Fiyat Listesi', 'Fiat Fiyat Listesi', 'Audi Fiyat Listesi', 'Dacia Fiyat Listesi',
  'Volkswagen Fiyat Listesi', 'Toyota Fiyat Listesi'
]);

const populerHizmetler = ref([
  'Boyacı', 'Evden Eve Nakliye', 'Mantolama', 'Su Tesisatı', 'Doğal Gaz Tesisatı',
  'Periyodik Bakım', 'Oto Ekspertiz', 'Elektrikçi', 'Çilingir', 'Plaka', 'Parke', 'Mutfak Yenileme'
]);

const populerIsIlanlari = ref([
  'Restoran ve Konaklama', 'Mağaza ve Perakendecilik', 'Tekstil ve Konfeksiyon', 'Ofis Elemanı',
  'Satış', 'Müşteri Hizmetleri', 'İstanbul İş İlanları', 'Ankara İş İlanları', 'İzmir İş İlanları',
  'Adana İş İlanları', 'Bursa İş İlanları', 'Antalya İş İlanları'
]);

const goToProduct = (id: string) => {
  router.push(`/product/${id}`);
};

onMounted(async () => {
  await adStore.fetchAds();
});
</script>

<style scoped>
.home {
  background-color: #f7f7f7;
  min-height: 100vh;
  padding-top: 20px;
  overflow-x: hidden; 
}

.container {
  width: 1150px;
  margin: 0 auto;
}

.main-content-wrapper {
  display: flex;
  gap: 20px;
  align-items: flex-start; 
  width: 100%;
}

.sidebar {
  width: 250px;
  flex-shrink: 0; 
}

.content-area {
  flex-grow: 1;
  width: 100%; 
}

.reklam-bar {
  text-align: right;
  margin-bottom: 10px;
}
.reklam-btn {
  background: none;
  border: none;
  color: #c00;
  font-size: 12px;
  cursor: pointer;
}
.reklam-image {
  margin-bottom: 15px;
  text-align: center;
}
.reklam-image img {
  max-width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 25px;
}
.section-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #333;
}
.section-title.blue-title { color: #3264c3; }
.section-title.orange-title { color: #ff8c00; }
.section-link {
  font-size: 13px;
  color: #3264c3;
  text-decoration: none;
}
.section-link:hover { text-decoration: underline; }

.adverts-grid.vitrin-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr); 
  gap: 15px; 
  width: 100%;
}
.vitrin-item-link {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s;
    cursor: pointer;
}
.vitrin-item-link:hover {
    transform: translateY(-2px);
    z-index: 2;
}

.quick-links-section {
  margin: 25px 0 15px;
  padding: 15px 0;
  border-top: 1px solid #eee;
}
.quick-links-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}
.quick-links-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.quick-link {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #3264c3;
  text-decoration: none;
}
.quick-link:hover { text-decoration: underline; }
.quick-link .icon {
  margin-right: 5px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
}
.quick-link .icon.blue { background: #e3f2fd; }
.quick-link .icon.teal { background: #e0f2f1; }
.quick-link .icon.orange { background: #fff3e0; }
.quick-link .icon.green { background: #e8f5e9; }
.quick-link .icon.gray { background: #f5f5f5; }
.quick-link .icon.brown { background: #efebe9; }
.quick-link .icon.green-bg { background: #4caf50; color: white; }
.quick-link .icon.purple-bg { background: #9c27b0; color: white; }
.quick-link .icon.pink-bg { background: #e91e63; color: white; }
.quick-link .icon.orange-bg { background: #ff9800; color: white; }
.quick-link .icon.red-bg { background: #f44336; color: white; }

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 25px;
}
.project-card {
  background: white;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}
.project-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.project-info {
  padding: 15px;
}
.project-info h4 {
  font-size: 16px;
  font-weight: bold;
  color: #3264c3;
  margin: 0 0 8px;
}
.project-location {
  font-size: 13px;
  color: #666;
  margin: 0;
  display: inline;
}
.project-badge {
  display: inline-block;
  background: #3264c3;
  color: white;
  font-size: 11px;
  padding: 3px 8px;
  margin-left: 10px;
  border-radius: 2px;
}
.project-badge.green {
  background: #4caf50;
}

.interesting-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-bottom: 25px;
}
.interesting-item {
  text-align: center;
}
.interesting-item img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid #eee;
}
.interesting-item p {
  font-size: 11px;
  color: #333;
  margin: 5px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.section-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 20px 0 10px;
}
.section-subtitle.orange-text { color: #ff8c00; }
.section-subtitle.green-text { color: #4caf50; }
.section-subtitle.blue-text { color: #3264c3; }

.popular-products-grid {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}
.popular-product {
  text-align: center;
}
.popular-product img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border: 1px solid #eee;
  background: white;
}
.popular-product p {
  font-size: 12px;
  color: #333;
  margin: 8px 0 0;
}

.brands-section {
  margin: 20px 0;
  padding: 15px 0;
  border-top: 1px solid #eee;
}
.brands-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.brand-logo {
  width: 80px;
  height: 50px;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}
.brand-placeholder {
  font-size: 10px;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
}

.tags-section {
  margin: 20px 0;
  padding-bottom: 15px;
}
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 12px;
  color: #333;
  text-decoration: none;
  background: white;
}
.tag:hover {
  border-color: #3264c3;
  color: #3264c3;
}
.tags-container.blue-tags .tag,
.tag.blue {
  color: #3264c3;
  border-color: #3264c3;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}
</style>
