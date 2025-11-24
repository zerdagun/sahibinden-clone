<template>
  <div class="login-form-container">
    <h2 class="form-title">Giriş yap</h2>
    
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input type="email" id="email" placeholder="E-posta adresi" class="form-input" required>
      </div>
      
      <div class="form-group password-group">
        <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Şifre" class="form-input" required>
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
      
      <button type="submit" class="btn-submit">E-posta ile giriş yap</button>
    </form>
    
    <div class="register-link">
  Henüz hesabın yok mu? 
  <router-link to="/register">Hesap aç ▶</router-link>
</div>
    
    <div class="divider">
      <span>VEYA</span>
    </div>
    
    <div class="social-login">
      <button class="btn-social google">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width="20">
        Google ile giriş yap
      </button>
      <button class="btn-social apple">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" width="18">
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
</template>

<script setup>
import { ref } from 'vue';
const showPassword = ref(false);
const handleLogin = () => { alert("Giriş yapılıyor..."); };
</script>

<style scoped>
.login-form-container {
  background: #fff;
  padding: 40px;
  border: 1px solid #e0e0e0;
  width: 480px;
  margin: 20px auto;
  text-align: center;
  font-family: 'Roboto', Arial, sans-serif;
  color: #333;
}

.form-title { font-size: 26px; font-weight: bold; margin-bottom: 30px; color: #333; }
.form-group { margin-bottom: 15px; }
.form-input { width: 100%; padding: 12px 15px; border: 1px solid #ccc; border-radius: 2px; font-size: 14px; outline: none; }
.form-input:focus { border-color: #3264c3; }

.password-group { position: relative; }
.toggle-password { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #999; }

.form-options { display: flex; justify-content: space-between; align-items: center; font-size: 13px; margin-bottom: 20px; }
.remember-me { display: flex; align-items: center; color: #666; }
.remember-me input { margin-right: 8px; }
.forgot-password { color: #3264c3; text-decoration: none; }

.btn-submit { width: 100%; padding: 12px; background-color: #3264c3; color: #fff; border: none; border-radius: 3px; font-size: 16px; font-weight: bold; cursor: pointer; }
.btn-submit:hover { background-color: #2851a3; }

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