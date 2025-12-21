<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="login-form-container">
        <button class="close-btn" @click="close">×</button>
        
        <h2 class="form-title">Giriş yap</h2>
        
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <input v-model="email" type="email" id="email" placeholder="E-posta adresi" class="form-input" required>
          </div>
          
          <div class="form-group password-group">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" placeholder="Şifre" class="form-input" required>
            <span class="toggle-password" @click="showPassword = !showPassword">
              <span v-if="showPassword">👁️</span>
              <span v-else>🔒</span>
            </span>
          </div>
          
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox"> Oturumun açık kalsın
            </label>
            <a href="#" class="forgot-password">Şifremi unuttum</a>
          </div>
          
          <button type="submit" class="btn-submit" :disabled="isLoading">
            {{ isLoading ? 'Giriş yapılıyor...' : 'E-posta ile giriş yap' }}
          </button>
        </form>
        
        <div class="register-link">
          Henüz hesabın yok mu? 
          <NuxtLink to="/register" @click="close">Hesap aç ▶</NuxtLink>
        </div>
        
        <div class="divider">
          <span>VEYA</span>
        </div>
        
        <div class="social-login">
          <button class="btn-social google" type="button">
            <img src="https://via.placeholder.com/20" alt="Google">
            Google ile giriş yap
          </button>
          <button class="btn-social apple" type="button">
            <img src="https://via.placeholder.com/20" alt="Apple">
            Apple ile giriş yap
          </button>
        </div>
        
        <p class="terms-text">
          Google veya Apple kimliğinizle bir sonraki adıma geçmeniz halinde <a href="#">Bireysel Hesap Sözleşmesi ve Ekleri</a>'ni kabul etmiş sayılırsınız.
        </p>
        
        <div class="qr-login">
          <a href="#">QR kod ile mobil uygulamadan <strong>giriş yap ▶</strong></a>
        </div>

        <p class="footer-text">
          Tarafınızca sağlanmış olan kişisel verileriniz hesap açma esnasında kimlik doğrulama tercihinize bağlı olarak Google veya Apple vasıtasıyla işlenebilecektir. Kişisel verilerin korunması hakkında detaylı bilgiye <strong>buradan</strong> ulaşabilirsiniz.
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success'): void;
}>();

const authStore = useAuthStore();

const showPassword = ref(false);
const email = ref('');
const password = ref('');
const isLoading = ref(false);

const close = () => {
  email.value = '';
  password.value = '';
  emit('close');
};

const handleLogin = async () => {
  isLoading.value = true;
  try {
    await authStore.login(email.value, password.value);
    emit('success');
    close();
  } catch (e) {
    alert("Login Error: " + e);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.login-form-container {
  background: #fff;
  padding: 40px;
  border: 1px solid #e0e0e0;
  width: 480px;
  max-width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  text-align: center;
  font-family: 'Roboto', Arial, sans-serif;
  color: #333;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.form-title { font-size: 26px; font-weight: bold; margin-bottom: 30px; color: #333; }
.form-group { margin-bottom: 15px; }
.form-input { width: 100%; padding: 12px 15px; border: 1px solid #ccc; border-radius: 2px; font-size: 14px; outline: none; box-sizing: border-box; }
.form-input:focus { border-color: #3264c3; }

.password-group { position: relative; }
.toggle-password { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #999; }

.form-options { display: flex; justify-content: space-between; align-items: center; font-size: 13px; margin-bottom: 20px; }
.remember-me { display: flex; align-items: center; color: #666; }
.remember-me input { margin-right: 8px; }
.forgot-password { color: #3264c3; text-decoration: none; }

.btn-submit { width: 100%; padding: 12px; background-color: #3264c3; color: #fff; border: none; border-radius: 3px; font-size: 16px; font-weight: bold; cursor: pointer; }
.btn-submit:hover { background-color: #2851a3; }
.btn-submit:disabled { background-color: #ccc; cursor: not-allowed; }

.register-link { margin-top: 20px; font-size: 14px; color: #666; }
.register-link a { color: #3264c3; text-decoration: none; font-weight: bold; }

.divider { margin: 25px 0; position: relative; text-align: center; }
.divider::before { content: ''; position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background-color: #e0e0e0; z-index: 1; }
.divider span { position: relative; z-index: 2; background-color: #fff; padding: 0 15px; color: #999; font-size: 13px; }

.social-login { display: flex; flex-direction: column; gap: 10px; }
.btn-social { width: 100%; padding: 10px; border: 1px solid #ccc; background-color: #fff; font-size: 14px; font-weight: bold; color: #333; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 3px; }
.btn-social img { margin-right: 10px; }

.terms-text, .footer-text { font-size: 11px; color: #999; margin-top: 20px; line-height: 1.4; }
.terms-text a, .footer-text strong { color: #3264c3; text-decoration: none; }

.qr-login { margin-top: 20px; font-size: 14px; }
.qr-login a { color: #333; text-decoration: none; }
.qr-login a strong { color: #3264c3; }
</style>
