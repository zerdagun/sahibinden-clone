<template>
  <aside class="sidebar-menu">
    
    
    <div class="section-top-links">
      <a href="#" class="top-link danger">
        <span class="icon">‼️</span> Acil Acil
      </a>
      <a href="#" class="top-link">
        <span class="icon">🕒</span> Son 48 Saat / 1 Hafta / 1 Ay
      </a>
    </div>

    <hr class="divider-line">
    
    
    <div class="service-promo">
        <span class="yepy-logo">yepy</span> ile Yenilenmiş Cihazlar 
        <span class="new-tag">yeni</span>
    </div>

    <hr class="divider-line">
    
    
    <div class="service-blocks">
        
        <div class="service-item">
            <span class="service-icon yellow-icon">🚕</span>
            <div class="service-details">
                <span class="service-title">Oto360</span>
                <p class="service-subtitle">Oto Ekspertiz</p>
                <a href="#" class="show-more">Tümünü Göster ⌄</a>
            </div>
        </div>
        
        <hr class="divider-line">

       
        <div class="service-item">
            <span class="service-icon blue-icon">🏡</span>
            <div class="service-details">
                <span class="service-title">Emlak360</span>
            </div>
        </div>
    </div>

    <hr class="divider-line">
    
    
    <div class="category-block">
      <div class="category-header">
          <span class="category-icon orange-icon">🏠</span>
          <span class="category-title">Emlak ({{ mockCounts.emlakCount }})</span>
      </div>
      <ul class="sub-categories">
        <li v-for="item in mockEmlak" :key="item.name">
          <a href="#" @click.prevent="selectCategory(item)">
            {{ item.name }} ({{ item.count }})
          </a>
        </li>
      </ul>
    </div>
    
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const mockCounts = ref({
    emlakCount: '1.272.968', 
});

const mockEmlak = ref([
    { name: 'Konut', count: '828.700' },
    { name: 'İş Yeri', count: '116.862' },
    { name: 'Arsa', count: '313.117' },
    { name: 'Konut Projeleri', count: '1.423' },
    { name: 'Bina', count: '10.495' },
    { name: 'Devre Mülk', count: '2.162' },
    { name: 'Turistik Tesis', count: '1.625' },
]);

function selectCategory(category) {
    console.log(`Kategori seçildi (Mock): ${category.name}`);
}
</script>

<style scoped>
.sidebar-menu {
  width: 250px;
  background-color: white; 
  padding-bottom: 20px;
  border-right: 1px solid #eee;
}

.section-top-links {
    padding: 10px 15px;
}
.top-link {
    display: flex;
    align-items: center;
    padding: 5px 0;
    font-size: 0.9em;
    color: #444;
    text-decoration: none;
}
.top-link .icon {
    margin-right: 8px;
    font-size: 1.1em;
}
.top-link.danger {
    color: #c9302c; 
    font-weight: 600;
}

.divider-line {
    border: 0;
    height: 1px;
    background-color: #eee;
    margin: 10px 0;
}


.service-promo {
    padding: 5px 15px;
    font-size: 0.9em;
    color: #333;
    font-weight: 600;
}
.yepy-logo {
    color: #ffc107; 
    font-style: italic;
    font-weight: bold;
    margin-right: 5px;
}
.new-tag {
    background-color: #c9302c;
    color: white;
    font-size: 0.6em;
    padding: 2px 4px;
    border-radius: 3px;
    margin-left: 5px;
}


.service-blocks {
    padding: 0 0;
}
.service-item {
    display: flex;
    align-items: flex-start;
    padding: 10px 15px;
}
.service-icon {
    font-size: 1.5em;
    margin-right: 10px;
    padding: 5px;
    border-radius: 50%;
}
.yellow-icon { background-color: #ffeb3b; }
.blue-icon { background-color: #2196f3; }
.orange-icon { background-color: #ff9800; }

.service-details {
    display: flex;
    flex-direction: column;
}
.service-title {
    font-weight: 600;
    color: #007bff;
}
.service-subtitle {
    font-size: 0.8em;
    color: #666;
    margin: 0;
}
.show-more {
    font-size: 0.8em;
    color: #007bff;
    text-decoration: none;
    margin-top: 5px;
}

.category-block {
    padding: 0 15px;
}
.category-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.category-icon {
    margin-right: 10px;
    font-size: 1.1em;
}
.category-title {
    font-weight: 600;
    color: #000;
}
.sub-categories {
    list-style: none;
    padding-left: 0;
}
.sub-categories li a {
    display: block;
    padding: 3px 0;
    color: #007bff;
    text-decoration: none;
    font-size: 0.9em;
}
.sub-categories li a:hover {
    text-decoration: underline;
}
</style>
