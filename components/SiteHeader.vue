<template>
  <header class="main-header">
    <div class="main-bar">
      <NuxtLink to="/" class="brand-link">
        <span class="logo-box">sahibinden.com</span>
      </NuxtLink>

      <div class="search-box">
        <input
          type="text"
          placeholder="Kelime, ilan no veya mağaza adı ile ara"
          class="search-input"
          v-model="searchQuery"
          @keyup.enter="handleSearch"
        />
        <button class="search-button" @click="handleSearch">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="#9ea7be" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      <a href="#" class="detailed-search">Detaylı Arama</a>

      <div class="spacer"></div>

      <nav class="action-nav">
        <template v-if="!isLoggedIn">
            <NuxtLink to="/login" class="nav-link">Giriş Yap</NuxtLink>
            <span class="divider">|</span>
            <NuxtLink to="/register" class="nav-link">Hesap Aç</NuxtLink>
        </template>
        <template v-else>
            <div class="user-logged-in-area">
                
                <div class="user-dropdown-wrapper">
                    <div class="user-trigger" @click="toggleDropdown">
                        {{ userName }} ▼
                    </div>

                    <div v-if="showDropdown" class="dropdown-menu">
                        <div class="user-info-header">{{ userName }}</div>
                        <ul class="menu-list">
                            <li><NuxtLink to="/my/summary" class="menu-item">Bana Özel Özet</NuxtLink></li>
                            <div class="menu-divider"></div>
                            <li><NuxtLink to="/my/ads" class="menu-item">İlanlarım</NuxtLink></li>
                            <div class="menu-divider"></div>
                            <li><NuxtLink to="/my/favorites" class="menu-item">Favorilerim</NuxtLink></li>
                            <li><NuxtLink to="/cart" class="menu-item">Sepetim</NuxtLink></li>
                            <div class="menu-divider"></div>
                            <li><a href="#" class="menu-item">S-Aracım</a></li>
                            <div class="menu-divider"></div>
                            <li><a href="#" class="menu-item">Alım İşlemlerim</a></li>
                            <li><a href="#" class="menu-item">Satış İşlemlerim</a></li>
                            <div class="menu-divider"></div>
                            <li><a href="#" class="menu-item">Hesabım</a></li>
                             <div class="menu-divider"></div>
                            <li>
                                <button @click="logout" class="menu-item logout-btn">
                                    🚪 Çıkış Yap
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="header-icons">
                        
                    <button class="icon-btn">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                            <span class="badge">1</span>
                    </button>
                    
                    <button class="icon-btn">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
                    </button>
                    
                    <NuxtLink to="/my/favorites" class="icon-btn">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    </NuxtLink>
                </div>
            </div>
        </template>
      </nav>

      <NuxtLink to="/post-ad" class="post-ad-link">
          <button class="btn-advert">Ücretsiz* İlan Ver</button>
      </NuxtLink>
    </div>

  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const showDropdown = ref(false);
const searchQuery = ref('');

const isLoggedIn = computed(() => !!authStore.user);
const userName = computed(() => authStore.user?.displayName || authStore.user?.email || 'Kullanıcı');

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const logout = async () => {
    await authStore.logout();
    showDropdown.value = false;
    router.push('/');
};

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        router.push({ path: '/search', query: { q: searchQuery.value } });
    }
};
</script>

<style scoped>

.main-header {
  width: 100%;
  background-color: #3f475f;
  display: flex;
  align-items: center;
  height: 56px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-bar {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  
  height: 100%;
}

.brand-link { text-decoration: none; display: flex; align-items: center; flex-shrink: 0; margin-right: 20px; }
.logo-box {
  background-color: #FFDD00; color: #000; padding: 8px 12px; font-size: 19px; font-weight: 700;
  border-radius: 2px; line-height: 1.1; display: inline-block;
  font-family: "SHBGroteskLegacy", Roboto, "Helvetica Neue", Arial, sans-serif;
  letter-spacing: -0.5px;
}

.search-box {
  display: flex; flex: 1; max-width: 480px; height: 36px;
  background-color: #2e354a; border-radius: 3px; align-items: center; overflow: hidden;
  margin-right: 15px;
}
.search-input {
  flex: 1; background: transparent; border: none; height: 100%; padding: 0 12px; color: #ddd; font-size: 13px; outline: none;
}
.search-input::placeholder { color: #9ea7be; }
.search-button {
  width: 40px; height: 100%; background-color: transparent; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.detailed-search {
    color: #fff;
    font-size: 13px;
    text-decoration: none;
    white-space: nowrap;
}
.detailed-search:hover { text-decoration: underline; }

.spacer { flex: 1; }

.action-nav {
  display: flex; align-items: center; margin-right: 20px; flex-shrink: 0;
}
.nav-link {
  color: #fff; text-decoration: none; font-size: 13px; white-space: nowrap; padding: 0 5px; font-weight: bold;
  opacity: 0.9;
}
.nav-link:hover { text-decoration: underline; opacity: 1; }

.user-logged-in-area {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 20px;
}

.user-dropdown-wrapper {
  position: relative;
}

.user-trigger {
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.header-icons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #cdd3e6; 
  display: flex;
  align-items: center;
  position: relative;
}
.icon-btn:hover { color: #fff; }

.badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #f00;
    color: #fff;
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 50%;
    line-height: 1;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0; 
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  width: 220px;
  z-index: 1000;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 10px; 
}

.dropdown-menu::before {
    content: "";
    position: absolute;
    top: -6px;
    right: 20px; 
    width: 12px;
    height: 12px;
    background: #fff;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    transform: rotate(45deg);
}

.user-info-header {
    padding: 10px 15px;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #eee;
    font-size: 14px;
}

.menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-item {
    display: block;
    padding: 8px 15px;
    color: #333;
    text-decoration: none;
    font-size: 13px;
}

.menu-item:hover {
    background-color: #f5f5f5;
    color: #3264c3;
}

.menu-divider {
    height: 1px;
    background-color: #eee;
    margin: 5px 0;
}

.logout-btn {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    gap: 5px;
}
.logout-btn:hover { color: #d00; }

.divider {
    color: #777;
    margin: 0 5px;
    font-size: 14px;
}

.post-ad-link { text-decoration: none; }
.btn-advert {
  background-color: #428bca; color: #fff; border: none; padding: 0 16px; height: 36px;
  font-size: 13px;
  border-radius: 3px; cursor: pointer; font-weight: 600; white-space: nowrap; font-family: Arial, sans-serif;
  display: flex; align-items: center;
}
.btn-advert:hover { background-color: #357abd; }
</style>