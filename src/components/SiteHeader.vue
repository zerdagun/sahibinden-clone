<template>
  <header class="main-header">
    <div class="main-bar">
      <router-link to="/" class="brand-link">
        <span class="logo-box">sahibinden.com</span>
      </router-link>

      <div class="search-box">
        <input
          type="text"
          placeholder="Kelime, ilan no veya mağaza adı ile ara"
          class="search-input"
        />
        <button class="search-button">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="#9ea7be" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      <nav class="action-nav">
        <a href="#" class="nav-link">Detaylı Arama</a>
        <router-link to="/login" class="nav-link">Giriş Yap</router-link>
        <router-link to="/register" class="nav-link">Hesap Aç</router-link>
        
        <button class="btn-advert" @click="isModalOpen = true">Ücretsiz* İlan Ver</button>
      </nav>
    </div>

    <SignupModal v-if="isModalOpen" @close="isModalOpen = false" />

  </header>
</template>

<script setup>
import { ref } from 'vue';

import SignupModal from './SignupModal.vue';


const isModalOpen = ref(false);
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
  gap: 20px;
  height: 100%;
}

.brand-link { text-decoration: none; display: flex; align-items: center; flex-shrink: 0; }
.logo-box {
  background-color: #FFDD00; color: #000; padding: 8px 12px; font-size: 19px; font-weight: 700;
  border-radius: 2px; line-height: 1.1; display: inline-block;
  font-family: "SHBGroteskLegacy", Roboto, "Helvetica Neue", Arial, sans-serif;
  letter-spacing: -0.5px;
}

.search-box {
  display: flex; flex: 1; max-width: 600px; height: 36px;
  background-color: #2e354a; border-radius: 3px; align-items: center; overflow: hidden;
}
.search-input {
  flex: 1; background: transparent; border: none; height: 100%; padding: 0 12px; color: #ddd; font-size: 13px; outline: none;
}
.search-input::placeholder { color: #9ea7be; }
.search-button {
  width: 40px; height: 100%; background-color: transparent; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.action-nav {
  display: flex; align-items: center; gap: 20px; margin-left: auto; flex-shrink: 0;
}
.nav-link {
  color: #e0e0e0; text-decoration: none; font-size: 13px; white-space: nowrap; padding: 0 5px;
}
.nav-link:hover { text-decoration: underline; }

.btn-advert {
  background-color: #428bca; color: #fff; border: none; padding: 8px 16px; font-size: 13px;
  border-radius: 3px; cursor: pointer; font-weight: 600; white-space: nowrap; font-family: Arial, sans-serif;
}
.btn-advert:hover { background-color: #357abd; }
</style>