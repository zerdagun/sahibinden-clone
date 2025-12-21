<template>
  <aside class="sidebar-menu">

    <div class="section-top-links">
      <a href="#" class="top-link danger">
        <span class="icon">‼️</span> Acil Acil
      </a>
      <a href="#" class="top-link time-filter">
        <span class="icon">🕒</span> Son 48 Saat / 1 Hafta / 1 Ay
      </a>
    </div>

    <hr class="divider-line">

    <div class="service-promo">
        <span class="yepy-logo">yepy</span> ile Yenilenmiş Cihazlar 
        <span class="new-tag">yeni</span>
    </div>

    <hr class="divider-line">

    <div class="category-block" v-if="categories && categories.length > 0">
      <div class="category-header">
          <span class="category-icon green-bg">🔥</span>
          <span class="category-title">Firebase Kategorileri <span class="count">({{ categories.length }})</span></span>
      </div>
      <ul class="sub-categories">
        <li v-for="cat in categories" :key="cat.id">
          <a href="#">{{ cat.name }}</a>
        </li>
      </ul>
    </div>

    <hr class="divider-line" v-if="categories && categories.length > 0">

    <hr class="divider-line">

    <div class="service-blocks">
        <div class="service-item">
            <span class="service-icon yellow-bg">🚕</span>
            <div class="service-details">
                <span class="service-title">Oto360</span>
                <p class="service-subtitle">Oto Ekspertiz</p>
                <a href="#" class="show-more">Tümünü Göster ⌄</a>
            </div>
        </div>
        
        <hr class="divider-line">

        <div class="service-item">
            <span class="service-icon blue-bg">🏡</span>
            <div class="service-details">
                <span class="service-title">Emlak360</span>
            </div>
        </div>
    </div>

    <hr class="divider-line">

    <div class="category-block">
      <div class="category-header">
          <span class="category-icon orange-bg">🏠</span>
          <span class="category-title">Emlak <span class="count">(1.310.480)</span></span>
      </div>
      <ul class="sub-categories">
        <li><a href="#">Konut <span class="count">(858.427)</span></a></li>
        <li><a href="#">İş Yeri <span class="count">(122.168)</span></a></li>
        <li><a href="#">Arsa <span class="count">(315.080)</span></a></li>
        <li><a href="#">Konut Projeleri <span class="count">(1.447)</span></a></li>
        <li><a href="#">Bina <span class="count">(10.777)</span></a></li>
        <li><a href="#">Devre Mülk <span class="count">(2.261)</span></a></li>
        <li><a href="#">Turistik Tesis <span class="count">(1.763)</span></a></li>
      </ul>
    </div>

    <hr class="divider-line">

    <div class="category-block">
      <div class="category-header">
          <span class="category-icon red-bg">🚗</span>
          <span class="category-title">Vasıta <span class="count">(778.446)</span></span>
      </div>
      <ul class="sub-categories">
        <li><a href="#">Otomobil <span class="count">(384.015)</span></a></li>
        <li><a href="#">Arazi, SUV & Pickup <span class="count">(101.159)</span></a></li>
        <li><a href="#">Elektrikli Araçlar <span class="count">(8.820)</span> 🌿</a></li>
        <li><a href="#">Motosiklet <span class="count">(115.665)</span></a></li>
        <li v-if="expandedCategories.includes('vasita')"><a href="#">Minivan & Panelvan <span class="count">(81.707)</span></a></li>
        <li v-if="expandedCategories.includes('vasita')"><a href="#">Ticari Araçlar <span class="count">(52.949)</span></a></li>
        <li v-if="expandedCategories.includes('vasita')"><a href="#">Kiralık Araçlar <span class="count">(10.489)</span></a></li>
        <li v-if="expandedCategories.includes('vasita')"><a href="#">Deniz Araçları <span class="count">(9.089)</span></a></li>
        <li v-if="expandedCategories.includes('vasita')"><a href="#">Hasarlı Araçlar <span class="count">(4.608)</span></a></li>
      </ul>
      <a href="#" class="show-more-link" @click.prevent="toggleCategory('vasita')">
        {{ expandedCategories.includes('vasita') ? 'Gizle ⌃' : 'Tümünü Göster ⌄' }}
      </a>
    </div>

    <hr class="divider-line">

    <div class="category-block">
      <div class="category-header">
          <span class="category-icon teal-bg">🔧</span>
          <span class="category-title">Yedek Parça, Aksesuar, Donanım & Tuning <span class="count">(3.167.745)</span></span>
      </div>
      <ul class="sub-categories">
        <li><a href="#">Otomotiv Ekipmanları <span class="count">(2.996.904)</span></a></li>
        <li><a href="#">Motosiklet Ekipmanları <span class="count">(150.481)</span></a></li>
        <li><a href="#">Deniz Aracı Ekipmanları <span class="count">(20.393)</span></a></li>
      </ul>
    </div>

    <hr class="divider-line">

    <div class="category-block">
      <div class="category-header">
          <span class="category-icon purple-bg">🛒</span>
          <span class="category-title">İkinci El ve Sıfır Alışveriş <span class="count">(3.003.511)</span></span>
      </div>
      <ul class="sub-categories">
        <li><a href="#">Bilgisayar <span class="count">(331.100)</span></a></li>
        <li><a href="#">Cep Telefonu & Aksesuar <span class="count">(358.189)</span></a></li>
        <li><a href="#">Fotoğraf & Kamera <span class="count">(55.775)</span></a></li>
        <li><a href="#">Ev Dekorasyon <span class="count">(349.269)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Ev Elektroniği <span class="count">(110.019)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Elektrikli Ev Aletleri <span class="count">(193.834)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Giyim & Aksesuar <span class="count">(185.903)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Saat <span class="count">(77.248)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Anne & Bebek <span class="count">(88.198)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Kişisel Bakım & Kozmetik <span class="count">(55.827)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Hobi & Oyuncak <span class="count">(155.036)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Oyunculara Özel <span class="count">(111.221)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Kitap, Dergi & Film <span class="count">(38.970)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Müzik <span class="count">(90.364)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Spor <span class="count">(210.512)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Takı & Mücevher <span class="count">(9.973)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Koleksiyon <span class="count">(71.929)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Antika <span class="count">(62.940)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Bahçe & Yapı Market <span class="count">(221.458)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Teknik Elektronik <span class="count">(110.481)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Ofis & Kırtasiye <span class="count">(92.556)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Yiyecek & İçecek <span class="count">(4.666)</span></a></li>
        <li v-if="expandedCategories.includes('ikinciel')"><a href="#">Diğer Her Şey <span class="count">(18.081)</span></a></li>
      </ul>
      <a href="#" class="show-more-link" @click.prevent="toggleCategory('ikinciel')">
        {{ expandedCategories.includes('ikinciel') ? 'Gizle ⌃' : 'Tümünü Göster ⌄' }}
      </a>
    </div>

    <hr class="divider-line">

    <div class="service-item yepy-box">
        <span class="service-icon star-icon">✦</span>
        <div class="service-details">
            <span class="service-title yellow-text">Yepy <span class="new-tag">yeni</span></span>
            <p class="service-subtitle">Yepyenilenmiş teknolojik cihazlar <span class="count">(390)</span></p>
        </div>
    </div>

    <hr class="divider-line">

    <div class="category-block">
      <div class="category-header">
          <span class="category-icon gray-bg">🏭</span>
          <span class="category-title">İş Makineleri & Sanayi <span class="count">(138.582)</span></span>
      </div>
      <ul class="sub-categories">
        <li><a href="#">İş Makineleri <span class="count">(24.769)</span></a></li>
        <li><a href="#">Tarım Makineleri <span class="count">(44.357)</span></a></li>
        <li><a href="#">Sanayi <span class="count">(65.303)</span></a></li>
        <li><a href="#">Elektrik & Enerji <span class="count">(4.153)</span></a></li>
      </ul>
    </div>

    <hr class="divider-line">

    <div class="category-block">
      <div class="category-header">
          <span class="category-icon teal-bg">👷</span>
          <span class="category-title">Ustalar ve Hizmetler <span class="count">(10.000)</span></span>
      </div>
      <ul class="sub-categories">
        <li><a href="#">Ev Tadilat & Dekorasyon</a></li>
        <li><a href="#">Nakliye</a></li>
        <li v-if="expandedCategories.includes('ustalar')"><a href="#">Araç Servis & Bakım</a></li>
      </ul>
      <a href="#" class="show-more-link" @click.prevent="toggleCategory('ustalar')">
        {{ expandedCategories.includes('ustalar') ? 'Gizle ⌃' : 'Tümünü Göster ⌄' }}
      </a>
    </div>

    <hr class="divider-line">

    <div class="category-block">
      <div class="category-header">
          <span class="category-icon yellow-bg">👨‍🏫</span>
          <span class="category-title">Özel Ders Verenler <span class="count">(16.011)</span></span>
      </div>
      <ul class="sub-categories">
        <li><a href="#">Lise & Üniversite <span class="count">(3.148)</span></a></li>
        <li><a href="#">İlkokul & Ortaokul <span class="count">(6.690)</span></a></li>
        <li><a href="#">Yabancı Dil <span class="count">(3.213)</span></a></li>
      </ul>
      <a href="#" class="show-more-link" @click.prevent="toggleCategory('ozelders')">
        {{ expandedCategories.includes('ozelders') ? 'Gizle ⌃' : 'Tümünü Göster ⌄' }}
      </a>
    </div>

    <hr class="divider-line">

    <div class="category-block">
      <div class="category-header">
          <span class="category-icon green-bg">💼</span>
          <span class="category-title">İş İlanları <span class="count">(27.071)</span></span>
      </div>
      <ul class="sub-categories">
        <li><a href="#">Avukatlık & Hukuki Danışmanlık <span class="count">(31)</span></a></li>
        <li><a href="#">Eğitim <span class="count">(416)</span></a></li>
        <li><a href="#">Eğlence & Aktivite <span class="count">(323)</span></a></li>
        <li><a href="#">Güzellik & Bakım <span class="count">(1.875)</span></a></li>
        <li v-if="expandedCategories.includes('isilanlari')"><a href="#">IT & Yazılım Geliştirme <span class="count">(55)</span></a></li>
        <li v-if="expandedCategories.includes('isilanlari')"><a href="#">İnsan Kaynakları <span class="count">(34)</span></a></li>
      </ul>
      <a href="#" class="show-more-link" @click.prevent="toggleCategory('isilanlari')">
        {{ expandedCategories.includes('isilanlari') ? 'Gizle ⌃' : 'Tümünü Göster ⌄' }}
      </a>
    </div>

    <hr class="divider-line">

    <div class="category-block">
      <div class="category-header">
          <span class="category-icon teal-bg">🐾</span>
          <span class="category-title">Hayvanlar Alemi <span class="count">(136.259)</span></span>
      </div>
      <ul class="sub-categories">
        <li><a href="#">Evcil Hayvanlar <span class="count">(5.967)</span></a></li>
        <li><a href="#">Akvaryum Balıkları <span class="count">(8.548)</span></a></li>
        <li><a href="#">Aksesuarlar <span class="count">(20.097)</span></a></li>
        <li v-if="expandedCategories.includes('hayvanlar')"><a href="#">Bakım Ürünleri <span class="count">(532)</span></a></li>
        <li v-if="expandedCategories.includes('hayvanlar')"><a href="#">Yem & Mama <span class="count">(1.238)</span></a></li>
        <li v-if="expandedCategories.includes('hayvanlar')"><a href="#">Kümes Hayvanları <span class="count">(79.718)</span></a></li>
        <li v-if="expandedCategories.includes('hayvanlar')"><a href="#">Büyükbaş Hayvanlar <span class="count">(2.145)</span></a></li>
        <li v-if="expandedCategories.includes('hayvanlar')"><a href="#">Küçükbaş Hayvanlar <span class="count">(17.482)</span></a></li>
      </ul>
      <a href="#" class="show-more-link" @click.prevent="toggleCategory('hayvanlar')">
        {{ expandedCategories.includes('hayvanlar') ? 'Gizle ⌃' : 'Tümünü Göster ⌄' }}
      </a>
    </div>

    <hr class="divider-line">

    <div class="category-block">
      <div class="category-header">
          <span class="category-icon pink-bg">👨‍👩‍👧</span>
          <span class="category-title">Yardımcı Arayanlar <span class="count">(1.205)</span></span>
      </div>
      <ul class="sub-categories">
        <li><a href="#">Bebek & Çocuk Bakıcısı <span class="count">(422)</span></a></li>
        <li><a href="#">Yaşlı & Hasta Bakıcısı <span class="count">(149)</span></a></li>
        <li><a href="#">Temizlikçi & Ev İşlerine Yardımcı <span class="count">(634)</span></a></li>
      </ul>
    </div>

    <hr class="divider-line">

    <div class="category-block sectiklerimiz">
      <div class="category-header">
          <span class="category-title bold">Seçtiklerimiz</span>
      </div>
      <ul class="sub-categories special-links">
        <li>
          <a href="#">
            <span class="emoji-icon green-emoji">😊</span> Hikayeni Paylaş
          </a>
        </li>
        <li>
          <a href="#">
            <span class="emoji-icon teal-emoji">😎</span> Efsane İlanlar
          </a>
        </li>
        <li>
          <a href="#">
            <span class="emoji-icon orange-emoji">🤩</span> İlginç İlanlar
          </a>
        </li>
      </ul>
    </div>
    
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoryStore } from '~/stores/categories';

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

onMounted(() => {
  categoryStore.fetchCategories();
});

const expandedCategories = ref<string[]>([]);

function toggleCategory(category: string) {
  if (expandedCategories.value.includes(category)) {
    expandedCategories.value = expandedCategories.value.filter(c => c !== category);
  } else {
    expandedCategories.value.push(category);
  }
}
</script>

<style scoped>
.sidebar-menu {
  width: 100%;
  background-color: #fff !important; 
  color: #333 !important;
  padding-bottom: 20px;
  border-right: 1px solid #eee;
  font-family: Arial, sans-serif;
}

.section-top-links {
    padding: 10px 15px;
}
.top-link {
    display: flex;
    align-items: center;
    padding: 5px 0;
    font-size: 13px;
    color: #444;
    text-decoration: none;
}
.top-link .icon {
    margin-right: 8px;
    font-size: 14px;
}
.top-link.danger {
    color: #c9302c; 
    font-weight: 600;
}
.top-link.time-filter {
    font-size: 12px;
    color: #666;
}

.divider-line {
    border: 0;
    height: 1px;
    background-color: #eee;
    margin: 8px 0;
}

.service-promo {
    padding: 8px 15px;
    font-size: 13px;
    color: #333;
    font-weight: 600;
}
.yepy-logo {
    color: #ffc107; 
    font-style: italic;
    font-weight: bold;
}
.new-tag {
    background-color: #c9302c;
    color: white;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 3px;
    margin-left: 5px;
    vertical-align: middle;
}

.service-blocks {
    padding: 0;
}
.service-item {
    display: flex;
    align-items: flex-start;
    padding: 10px 15px;
}
.service-icon {
    font-size: 20px;
    margin-right: 10px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex-shrink: 0;
}

.yellow-bg { background-color: #ffd300; }
.blue-bg { background-color: #2196f3; color: white; }
.orange-bg { background-color: #ff9800; }
.red-bg { background-color: #e53935; }
.teal-bg { background-color: #00897b; color: white; }
.purple-bg { background-color: #7b1fa2; color: white; }
.gray-bg { background-color: #757575; color: white; }
.green-bg { background-color: #43a047; color: white; }
.pink-bg { background-color: #e91e63; color: white; }

.star-icon {
    background: linear-gradient(135deg, #ffd300, #ff9800);
    color: white;
    font-size: 16px;
}

.service-details {
    display: flex;
    flex-direction: column;
}
.service-title {
    font-weight: 600;
    color: #007bff;
    font-size: 14px;
}
.service-title.yellow-text {
    color: #e6a700;
}
.service-subtitle {
    font-size: 12px;
    color: #666;
    margin: 2px 0 0 0;
}
.show-more {
    font-size: 12px;
    color: #007bff;
    text-decoration: none;
    margin-top: 5px;
}

.category-block {
    padding: 8px 15px;
}
.category-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}
.category-icon {
    margin-right: 10px;
    font-size: 16px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex-shrink: 0;
}
.category-title {
    font-weight: 600;
    color: #000;
    font-size: 13px;
    line-height: 1.3;
}
.category-title .count {
    font-weight: normal;
    color: #999;
}

.sub-categories {
    list-style: none;
    padding-left: 38px;
    margin: 0;
}
.sub-categories li {
    margin-bottom: 2px;
}
.sub-categories li a {
    display: block;
    padding: 3px 0;
    color: #007bff;
    text-decoration: none;
    font-size: 13px;
}
.sub-categories li a:hover {
    text-decoration: underline;
}
.sub-categories li a .count {
    color: #999;
    font-size: 12px;
}

.show-more-link {
    display: block;
    padding-left: 38px;
    margin-top: 5px;
    font-size: 12px;
    color: #007bff;
    text-decoration: none;
}
.show-more-link:hover {
    text-decoration: underline;
}

.yepy-box {
    background: #fffef5;
}

.sectiklerimiz .category-title.bold {
    font-weight: 700;
    font-size: 14px;
}
.special-links {
    padding-left: 0 !important;
}
.special-links li a {
    display: flex;
    align-items: center;
    padding: 6px 0;
}
.emoji-icon {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    font-size: 16px;
}
.green-emoji { background-color: #4caf50; }
.teal-emoji { background-color: #00bcd4; }
.orange-emoji { background-color: #ff9800; }
</style>
