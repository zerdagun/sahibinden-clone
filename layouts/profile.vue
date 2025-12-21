<template>
  <div class="profile-layout">
    <SiteHeader />

    <div class="profile-nav-container">
      <div class="profile-nav">
        <NuxtLink to="/my/ads" class="p-nav-link" active-class="active">İlan Yönetimi</NuxtLink>
        <NuxtLink to="/my/orders" class="p-nav-link" active-class="active">Alışveriş İşlemlerim</NuxtLink>
        <NuxtLink to="/my/favorites" class="p-nav-link" active-class="active">Favoriler</NuxtLink>
        <NuxtLink to="/my/messages" class="p-nav-link" active-class="active">
            Mesajlar ve Bilgilendirmeler
            <span class="badgex">1</span>
        </NuxtLink>
        <NuxtLink to="/my/services" class="p-nav-link" active-class="active">Servisler</NuxtLink>
        <NuxtLink to="/my/account" class="p-nav-link" active-class="active">Hesabım</NuxtLink>
      </div>
    </div>

    <div class="profile-content-wrapper">
      <slot />
    </div>

    <div class="simple-footer">

    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.profile-layout {
  background-color: #f6f7f9; 
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.profile-nav-container {
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.profile-nav {
    width: 1150px;
    margin: 0 auto;
    display: flex;
    height: 50px;
}

.p-nav-link {
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: #333;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    border-bottom: 3px solid transparent; 
}

.p-nav-link:hover {
    color: #438ed8;
}

.p-nav-link.active {
    color: #438ed8;
    border-bottom-color: #438ed8;
}

.badgex {
    background-color: #d00;
    color: #fff;
    font-size: 10px;
    padding: 1px 5px;
    border-radius: 4px;
    margin-left: 5px;
}

.profile-content-wrapper {
    width: 1150px;
    margin: 20px auto;
}
</style>
