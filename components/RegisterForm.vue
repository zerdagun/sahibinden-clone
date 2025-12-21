<template>
  <div class="register-form-container">
    <h2 class="form-title">Hesap aç</h2>
    
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <input v-model="email" type="email" placeholder="E-posta adresi" class="form-input" required>
        <span class="info-icon">ⓘ</span>
      </div>
      
      <button type="submit" class="btn-submit" :disabled="isLoading">
        {{ isLoading ? 'Hesap açılıyor...' : 'E-posta ile hesap aç' }}
      </button>
    </form>
    
    <div class="login-link">
      Zaten hesabın var mı? <NuxtLink to="/login">Giriş yap »</NuxtLink>
    </div>
    
    <div class="divider">
      <span>VEYA</span>
    </div>
    
    <div class="social-login">
      <button class="btn-social" type="button">
        <img src="https://via.placeholder.com/20" alt="Google">
        Google ile hesap aç
      </button>
      <button class="btn-social" type="button">
        <img src="https://via.placeholder.com/20" alt="Apple">
        Apple ile hesap aç
      </button>
    </div>
    
    <p class="terms-text">
      Google veya Apple kimliğinizle bir sonraki adıma geçmeniz halinde <a href="#">Bireysel Hesap Sözleşmesi ve Ekleri</a>'ni kabul etmiş sayılırsınız.
    </p>
    
    <div class="corporate-link">
      Mağaza açmak için, <a href="#">Kurumsal Hesap aç »</a>
    </div>

    <p class="footer-text">
      Bu sayfadaki bilgiler sahibinden.com hesabı ve fatura gönderimi dahil olmak üzere tüm bilgilendirmelerimiz için alınmaktadır. Tarafınızca sağlanmış olan kişisel verileriniz hesap açma esnasında kimlik doğrulama tercihinize bağlı olarak Google veya Apple vasıtasıyla işlenebilecektir. Kişisel verilerin korunması hakkında detaylı bilgiye <a href="#">buradan</a> ulaşabilirsiniz.
    </p>
    
    <p class="recaptcha-text">
      Bu site reCAPTCHA ile korunmaktadır. <a href="#">Google Gizlilik Politikası</a> ve <a href="#">Kullanım Koşulları</a> geçerlidir.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const email = ref('');
const isLoading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  isLoading.value = true;
  try {
    
    await authStore.register(email.value, 'demo123', email.value.split('@')[0]);
    router.push('/');
  } catch (e) {
    alert("Register Error: " + e);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.register-form-container {
  background: #fff;
  padding: 40px 50px;
  border: 1px solid #e0e0e0;
  width: 100%;
  max-width: 100%;
  text-align: center;
}

.form-title { 
  font-size: 28px; 
  font-weight: bold; 
  margin-bottom: 30px; 
  color: #333; 
}

.form-group { 
  margin-bottom: 20px; 
  position: relative; 
}

.form-input { 
  width: 100%; 
  padding: 14px 15px; 
  border: 1px solid #ccc; 
  border-radius: 3px; 
  font-size: 14px; 
  outline: none;
  box-sizing: border-box;
}

.form-input:focus { 
  border-color: #3264c3; 
}

.info-icon { 
  position: absolute; 
  right: 15px; 
  top: 50%; 
  transform: translateY(-50%); 
  color: #3264c3; 
  font-size: 16px; 
}

.btn-submit { 
  width: 100%; 
  padding: 14px; 
  background-color: #3264c3; 
  color: #fff; 
  border: none; 
  border-radius: 3px; 
  font-size: 16px; 
  font-weight: bold; 
  cursor: pointer; 
}

.btn-submit:hover { 
  background-color: #2851a3; 
}

.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.login-link { 
  margin-top: 25px; 
  font-size: 14px; 
  color: #333; 
}

.login-link a { 
  color: #3264c3; 
  text-decoration: none; 
  font-weight: bold; 
}

.divider { 
  margin: 25px 0; 
  position: relative; 
  text-align: center; 
}

.divider::before { 
  content: ''; 
  position: absolute; 
  top: 50%; 
  left: 0; 
  width: 100%; 
  height: 1px; 
  background-color: #e0e0e0; 
  z-index: 1; 
}

.divider span { 
  position: relative; 
  z-index: 2; 
  background-color: #fff; 
  padding: 0 15px; 
  color: #999; 
  font-size: 13px; 
}

.social-login { 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
}

.btn-social { 
  width: 100%; 
  padding: 12px; 
  border: 1px solid #ccc; 
  background-color: #fff; 
  font-size: 14px; 
  color: #333; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  border-radius: 3px; 
}

.btn-social img { 
  margin-right: 10px; 
}

.btn-social:hover {
  background-color: #f9f9f9;
}

.terms-text { 
  font-size: 11px; 
  color: #999; 
  margin-top: 20px; 
  line-height: 1.5; 
}

.terms-text a { 
  color: #3264c3; 
  text-decoration: none; 
}

.corporate-link { 
  margin-top: 20px; 
  font-size: 14px; 
  color: #333;
}

.corporate-link a { 
  color: #3264c3; 
  text-decoration: none;
}

.footer-text { 
  font-size: 11px; 
  color: #999; 
  margin-top: 25px; 
  line-height: 1.5; 
  text-align: left;
}

.footer-text a {
  color: #3264c3;
  text-decoration: none;
}

.recaptcha-text {
  font-size: 11px;
  color: #999;
  margin-top: 15px;
  text-align: left;
}

.recaptcha-text a {
  color: #3264c3;
  text-decoration: none;
}
</style>