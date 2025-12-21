<template>
  <div class="checkout-layout">
    <header class="checkout-header">
      <div class="header-inner">
        <NuxtLink to="/">
          <span class="logo-box">sahibinden.com</span>
        </NuxtLink>
        <div class="secure-payment">
          <span class="lock-icon">🔒</span> Güvenli ödeme
        </div>
      </div>
    </header>
    <main class="checkout-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.checkout-layout {
  min-height: 100vh;
  background-color: #f9f9f9;
}

.checkout-header {
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 0;
}

.header-inner {
  width: 1150px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-box {
  background-color: #ffd300;
  color: #000;
  padding: 8px 15px;
  font-weight: bold;
  font-size: 16px;
  display: inline-block;
  font-family: Arial, sans-serif;
}

.secure-payment {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2da85c;
  font-weight: bold;
  font-size: 14px;
}

.lock-icon {
  font-size: 16px;
}

.checkout-main {
  width: 1150px;
  margin: 20px auto;
}
</style>
