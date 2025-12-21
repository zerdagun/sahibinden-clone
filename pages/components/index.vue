<template>
    <div class="showcase-layout">
      
      <div class="sidebar-menu">
        <div class="menu-header">
          <h3>Proje Sunumu</h3>
          <p>Debug Modu</p>
        </div>
  
        <div class="debug-box">
          Aktif Tab: <strong>{{ activeTab }}</strong>
        </div>
  
        <div class="menu-group">
          <span class="group-title">SAYFALAR</span>
          <button 
            v-for="item in pageItems" 
            :key="item.id" 
            :class="{ active: activeTab === item.id }"
            @click="activeTab = item.id"
          >
            📄 {{ item.label }}
          </button>
        </div>
  
        <div class="menu-group">
          <span class="group-title">COMPONENTS</span>
          <button 
            v-for="item in componentItems" 
            :key="item.id" 
            :class="{ active: activeTab === item.id }"
            @click="activeTab = item.id"
          >
            🧩 {{ item.label }}
          </button>
        </div>
  
        <div class="back-link">
          <router-link to="/">🌐 Ana Sayfa</router-link>
        </div>
      </div>
  
      <div class="preview-area">
        <div class="preview-card">
          <div class="preview-header">
            <h2>{{ getActiveLabel }}</h2>
            <span class="status-badge">Aktif</span>
          </div>
          
          <div class="component-renderer">
            
            <div v-if="activeTab === 'home'" class="full-width">
              <HomeView />
            </div>
            
            <div v-else-if="activeTab === 'cart'" class="full-width">
              <CartPage />
            </div>
            
            <div v-else-if="activeTab === 'myads'" class="full-width">
              <MyAdsPage />
            </div>
  
            <div v-else-if="activeTab === 'card'" class="card-wrapper">
               <div style="width: 200px; height: 300px;">
                 <AdvertCard :advert="dummyAdvert" v-if="dummyAdvert" />
                 <div v-else>Veri Yüklenemedi</div>
               </div>
            </div>
  
            <div v-else-if="activeTab === 'favorites'" class="full-width">
               <Favorites />
            </div>
  
            <div v-else-if="activeTab === 'login'" class="form-wrapper">
               <h3>Giriş Formu</h3>
               <LoginForm />
            </div>
  
            <div v-else-if="activeTab === 'register'" class="form-wrapper">
               <h3>Kayıt Formu</h3>
               <RegisterForm />
            </div>
  
            <div v-else-if="activeTab === 'product'" class="full-width">
               <p class="note">(Demo Modu: İlk ürün gösteriliyor)</p>
               <ProductDetail /> 
            </div>
  
            <div v-else-if="activeTab === 'seller'" class="full-width">
               <SellerProducts :currentProductId="0" sellerName="Balkan Motors" :categoryId="'vasita'" />
            </div>
  
            <div v-else-if="activeTab === 'sidebar'" class="sidebar-wrapper">
              <SideBar />
            </div>
  
            <div v-if="activeTab === 'modal'" class="form-wrapper">
             <h3>Üye Ol Modalı</h3>
             
             <button 
               v-if="!showModalDemo" 
               @click="showModalDemo = true"
               style="padding: 10px 20px; background: #3264c3; color: #fff; border: none; cursor: pointer; border-radius: 4px;"
             >
               Modalı Tekrar Aç
             </button>

             <SignupModal 
               :isOpen="showModalDemo"
               :product="dummyAdvert" 
               @close="showModalDemo = false" 
               @checkout="showModalDemo = false"
             />
          </div>
  
            <div v-else-if="activeTab === 'footer'" class="full-width">
              <SiteFooter />
            </div>
  
            <div v-else-if="activeTab === 'header'" class="full-width">
              <SiteHeader />
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Use absolute paths with ~ alias to ensure correct resolution from anywhere
  import { mockAdverts } from '~/data/mockAdverts.ts';

  // Import Page Components
  import HomeView from '~/pages/index.vue'; 
  import CartPage from '~/pages/cart.vue';
  import MyAdsPage from '~/pages/my/ads/index.vue';

  // Import Components
  import AdvertCard from '~/components/AdvertCard.vue';
  import Favorites from '~/components/Favorites.vue';
  import LoginForm from '~/components/LoginForm.vue';
  import ProductDetail from '~/components/ProductDisplay.vue';
  import RegisterForm from '~/components/RegisterForm.vue';
  import SellerProducts from '~/components/SellerProducts.vue';
  import SideBar from '~/components/SideBar.vue';
  import SignupModal from '~/components/TeklifVerModal.vue';
  import SiteFooter from '~/components/SiteFooter.vue';
  import SiteHeader from '~/components/SiteHeader.vue';

  definePageMeta({
    layout: false 
  });
  
  const activeTab = ref('home'); 
  
  const pageItems = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'cart', label: 'Sepetim' },
    { id: 'myads', label: 'İlanlarım' },
  ];
  
  const componentItems = [
    { id: 'sidebar', label: 'SideBar' }, 
    { id: 'card', label: 'AdvertCard' },
    { id: 'login', label: 'Login Form' },
    { id: 'register', label: 'Register Form' },
    { id: 'product', label: 'Product Display' },
    { id: 'seller', label: 'Seller Products' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'modal', label: 'Teklif Ver Modalı' },
    { id: 'footer', label: 'Site Footer' },
    { id: 'header', label: 'Site Header' },
  ];
  
  const getActiveLabel = computed(() => {
    const allItems = [...pageItems, ...componentItems];
    return allItems.find(i => i.id === activeTab.value)?.label || 'Bilinmiyor';
  });
  
  const dummyAdvert = mockAdverts[0];

const showModalDemo = ref(true);
  </script>
  
  <style scoped>
  .showcase-layout {
    display: flex;
    height: 100vh;
    font-family: 'Segoe UI', sans-serif;
    overflow: hidden;
  }

  .sidebar-menu {
    width: 260px;
    background-color: #1e293b;
    color: #fff;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border-right: 1px solid #334155;
    overflow-y: auto;
  }
  
  .menu-header { padding: 20px; background-color: #0f172a; border-bottom: 1px solid #334155; }
  .menu-header h3 { margin: 0; font-size: 18px; color: #ffd300; }
  .menu-header p { margin: 5px 0 0; font-size: 11px; color: #94a3b8; }
  .menu-header { 
    padding: 0 20px;
    font-size: 16px;
    margin-bottom: 20px;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .menu-header h3 { margin: 0; font-size: 18px; color: #333; }
  .menu-header p { margin: 5px 0 0; font-size: 11px; color: #555; }
  
  .debug-box {
    background: #b91c1c; color: white; padding: 5px 20px; font-size: 11px; text-align: center;
  }
  
  .menu-group { 
    padding: 0; 
    display: flex; 
    flex-direction: column; 
    gap: 0; 
    border-bottom: 1px solid #f9f9f9; 
    list-style: none;
    margin: 0;
  }
  .group-title { 
    font-size: 10px; 
    font-weight: bold; 
    color: #64748b; 
    margin-bottom: 5px; 
    padding: 15px 20px 5px;
  }
  
  button {
    background: transparent; 
    border: none; 
    color: #555; 
    text-align: left; 
    padding: 12px 20px;
    cursor: pointer; 
    border-radius: 0; 
    font-size: 14px; 
    transition: all 0.2s;
    border-left: 3px solid transparent;
    border-bottom: 1px solid #f9f9f9;
  }
  button:hover { background-color: #f0f0f0; color: #000; }
  button.active { 
    background: #e6f7ff;
    border-left-color: #1890ff;
    color: #1890ff;
    font-weight: 600; 
  }
  
  .back-link { margin-top: auto; padding: 15px; background-color: #f0f0f0; text-align: center; border-top: 1px solid #eee; }
  .back-link a { color: #1890ff; text-decoration: none; font-weight: bold; font-size: 14px; }

  .preview-area { flex: 1; background-color: #e2e8f0; padding: 20px; overflow-y: auto; }
  
  .preview-card {
    background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    min-height: 85vh; display: flex; flex-direction: column;
  }
  
  .preview-header {
    padding: 15px 25px; border-bottom: 1px solid #e2e8f0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .preview-header h2 { margin: 0; font-size: 18px; color: #334155; }
  .status-badge { background: #dbeafe; color: #1e40af; font-size: 11px; padding: 3px 8px; border-radius: 12px; font-weight: bold; }
  
  .component-renderer {
    padding: 30px;
    flex: 1;
    display: block; 
    position: relative;
  }
  
  .note { text-align: center; color: #999; margin-bottom: 10px; font-size: 12px; }

  .full-width { width: 100%; display: block; }
  .card-wrapper { width: 300px; margin: 0 auto; }
  .sidebar-wrapper { 
    width: 250px; 
    background: #fff; 
    border: 1px solid #ddd; 
    margin: 0 auto; 
    
    position: relative; 
    display: block;
  }
  .form-wrapper { 
    width: 450px; 
    background: transparent; 
    padding: 0; 
    border: none; 
    border-radius: 0; 
    text-align: center;
    margin: 0 auto; 
  }
  </style>
