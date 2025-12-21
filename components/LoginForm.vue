<template>
  <div class="login-container">
    <h2 class="title">Giriş yap</h2>
    
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <input v-model="email" type="email" placeholder="E-posta adresi" required>
      </div>
      
      <div class="input-group password-group">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Şifre" required>
        <button type="button" class="eye-btn" @click="showPassword = !showPassword">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>
      
      <div class="options-row">
        <label class="checkbox-label">
          <input type="checkbox"> Oturumun açık kalsın
        </label>
        <a href="#" class="link">Şifremi unuttum</a>
      </div>
      
      <button type="submit" class="submit-btn" :disabled="isLoading">
        {{ isLoading ? 'Giriş yapılıyor...' : 'E-posta ile giriş yap' }}
      </button>
    </form>
    
    <p class="switch-text">
      Henüz hesabın yok mu? <NuxtLink to="/register" class="link">Hesap aç »</NuxtLink>
    </p>
    
    <div class="divider"><span>VEYA</span></div>
    
    <div class="social-buttons">
      <button type="button" class="social-btn">
        <span class="g-icon">G</span> Google ile giriş yap
      </button>
      <button type="button" class="social-btn">
        <span class="apple-icon"></span> Apple ile giriş yap
      </button>
    </div>
    
    <p class="terms">
      Google veya Apple kimliğinizle bir sonraki adıma geçmeniz halinde 
      <a href="#" class="link">Bireysel Hesap Sözleşmesi ve Ekleri</a>'ni kabul etmiş sayılırsınız.
    </p>
    
    <p class="qr-text">
      QR kod ile mobil uygulamadan <a href="#" class="link">giriş yap »</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const showPassword = ref(false);
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  isLoading.value = true;
  try {
    await authStore.login(email.value, password.value);
    router.push('/');
  } catch (e) {
    alert("Login Error: " + e);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 100%;
  padding: 35px 40px;
  border: 1px dashed #ccc;
  background: #fff;
  text-align: center;
}

.title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin: 0 0 25px;
}

.input-group {
  margin-bottom: 10px;
}

.input-group input {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-size: 13px;
  outline: none;
  box-sizing: border-box;
  background: #fff;
  color: #333; 
}

.input-group input:focus {
  border-color: #3264c3;
}

.input-group input::placeholder {
  color: #999;
}

.password-group {
  position: relative;
}

.eye-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
}

.options-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 15px;
  font-size: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #3264c3;
  cursor: pointer;
}

.checkbox-label input {
  margin: 0;
}

.link {
  color: #3264c3;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 11px;
  background: #3264c3;
  color: #fff;
  border: none;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.submit-btn:hover {
  background: #2854a8;
}

.submit-btn:disabled {
  background: #ccc;
}

.switch-text {
  margin: 18px 0;
  font-size: 13px;
  color: #333;
}

.divider {
  position: relative;
  margin: 15px 0;
  text-align: center;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e0e0e0;
}

.divider span {
  position: relative;
  background: #fff;
  padding: 0 10px;
  color: #999;
  font-size: 11px;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.social-btn {
  width: 100%;
  padding: 10px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.social-btn:hover {
  background: #f9f9f9;
}

.g-icon {
  color: #4285f4;
  font-weight: bold;
  font-size: 14px;
}

.apple-icon::before {
  content: '';
  font-size: 16px;
}

.terms {
  margin-top: 15px;
  font-size: 10px;
  color: #999;
  line-height: 1.5;
}

.qr-text {
  margin-top: 15px;
  font-size: 12px;
  color: #333;
}
</style>