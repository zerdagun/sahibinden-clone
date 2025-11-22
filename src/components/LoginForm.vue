<template>
  <div class="login-form-container">
    [cite_start]<h2>Giriş yap [cite: 38]</h2>

    <form @submit.prevent="loginWithEmail">
      <div class="input-group">
        [cite_start]<label for="email">E-posta adresi [cite: 34]</label>
        <input id="email" type="email" v-model="email" placeholder="E-posta adresi" required />
      </div>

      <div class="input-group">
        [cite_start]<label for="password">Şifre [cite: 36]</label>
        <input id="password" type="password" v-model="password" placeholder="Şifre" required />
        [cite_start]<a href="#" class="forgot-password">Şifremi unuttum [cite: 42]</a>
      </div>

      <div class="checkbox-group">
        <input id="stay-signed-in" type="checkbox" v-model="staySignedIn" />
        [cite_start]<label for="stay-signed-in">Oturumum açık kalsın [cite: 37]</label>
      </div>
      
      [cite_start]<button type="submit" class="btn-primary">E-posta ile giriş yap [cite: 39]</button>
    </form>

    <p class="signup-prompt">
      [cite_start]Henüz hesabın yok mu? [cite: 40]
      [cite_start]<router-link to="/register" class="link-secondary">Hesap aç ></router-link> [cite: 40]
    </p>

    [cite_start]<div class="divider"><span>VEYA [cite: 41]</span></div>

    <button class="btn-social google">
      [cite_start]<span class="icon">G</span> Google ile giriş yap [cite: 43]
    </button>
    <button class="btn-social apple">
      [cite_start]<span class="icon"></span> Apple ile giriş yap [cite: 44]
    </button>

    <p class="qr-code-prompt">
      [cite_start]QR kod ile mobil uygulamadan <a href="#">giriş yap ></a> [cite: 46]
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const staySignedIn = ref(false);

function loginWithEmail() {
  console.log('Giriş denemesi, sadece frontend mock:', { email: email.value });
  // Gerçek backend yok, bu yüzden sadece konsola yazdırıyoruz.
}
</script>

<style scoped>
.login-form-container { /* Stil kodları ... */ }
.btn-primary { /* Stil kodları ... */ }
/* ... (Buraya PDF'deki tasarıma uygun stilleri ekleyin) */
</style>