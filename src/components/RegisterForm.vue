<template>
    <div class="register-form-container">
      [cite_start]<h2>Hesap aç [cite: 49]</h2>
  
      <form @submit.prevent="registerWithEmail">
        <div class="input-group">
          [cite_start]<label for="email">E-posta adresi [cite: 50]</label>
          <input id="email" type="email" v-model="email" placeholder="E-posta adresi" required />
          <span class="info-icon">i</span> 
        </div>
        
        [cite_start]<button type="submit" class="btn-primary">E-posta ile hesap aç [cite: 51]</button>
      </form>
  
      <p class="login-prompt">
        [cite_start]Zaten hesabın var mı? [cite: 52] 
        [cite_start]<router-link to="/login" class="link-secondary">Giriş yap ></router-link> [cite: 52]
      </p>
  
      [cite_start]<div class="divider"><span>VEYA [cite: 53]</span></div>
  
      <button class="btn-social google">
        [cite_start]<span class="icon">G</span> Google ile hesap aç [cite: 54]
      </button>
      <button class="btn-social apple">
        [cite_start]<span class="icon"></span> Apple ile hesap aç [cite: 55]
      </button>
  
      <p class="corporate-account-prompt">
        [cite_start]Mağaza açmak için, <a href="#">Kurumsal Hesap aç ></a> [cite: 57]
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  
  function registerWithEmail() {
    console.log('Kayıt denemesi, sadece frontend mock:', email.value);
  }
  </script>
  
  <style scoped>
  /* Stil kodları LoginForm ile benzerdir. */
  </style>