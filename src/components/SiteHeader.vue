<template>
  <header class="main-header">
    <div class="main-bar">
      <router-link to="/" class="brand-link">
        <span class="logo-box">sahibinden.com</span>
      </router-link>

      <div class="search-container">
        <input
          type="text"
          placeholder="Kelime, ilan no veya mağaza adı ile ara"
          class="search-input"
        />
        <button class="search-icon">🔍</button>
      </div>

      <nav class="action-nav">
        <a href="#" class="nav-link">Detaylı Arama</a>
        <a href="#" class="nav-link">Giriş Yap</a>
        <a href="#" class="nav-link">Hesap Aç</a>
        <button class="btn-advert">Ücretsiz* İlan Ver</button>
      </nav>
    </div>
  </header>
</template>

<script setup>
// script yok
</script>

<style scoped>
.main-header {
  width: 100%;
  background-color: #394055;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.35);
  z-index: 100;
}

.main-bar {
  width: 100%;
  padding: 12px 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  box-sizing: border-box;
}

/* Logo */
.brand-link {
  text-decoration: none;
  font-weight: bold;
  height: 35px;
  display: flex;
  align-items: center;
}

.logo-box {
  background-color: #ffd400;
  color: #000;
  padding: 8px 12px;
  font-size: 1.05em;
  border-radius: 3px;
  letter-spacing: 0.5px;
}

/* Search */
.search-container {
  display: flex;
  align-items: center;
  background-color: #2b3145;
  border-radius: 4px;
  flex-grow: 1;
  height: 36px;
  border: 1px solid #1f2433;
}

.search-input {
  flex-grow: 1;
  border: none;
  background: transparent;
  padding: 0 12px;
  color: #d5d9e4;
  font-size: 0.92em;
}

.search-input::placeholder {
  color: #aaa;
}

.search-icon {
  background-color: transparent;
  border: none;
  color: #9ea7be;
  padding: 0 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
}

/* Nav & Buttons */
.action-nav {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-left: auto;
  white-space: nowrap;
  font-size: 0.92em;
}

.nav-link {
  color: #f5f5f5;
  text-decoration: none;
  font-size: 0.92em;
}

.btn-advert {
  background-color: #2f9df4;
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 0.92em;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
</style>

