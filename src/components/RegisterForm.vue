<template>
  <div class="register-form-container">
    <h2 class="form-title">Hesap aç</h2>
    
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <input type="email" id="reg-email" placeholder="E-posta adresi" class="form-input" required>
        <span class="info-icon">ℹ️</span>
      </div>
      
      <button type="submit" class="btn-submit">E-posta ile hesap aç</button>
    </form>
    
    <div class="login-link">
  Zaten hesabın var mı? 
  <router-link to="/login">Giriş yap ▶</router-link>
</div>
    
    <div class="divider">
      <span>VEYA</span>
    </div>
    
    <div class="social-login">
      <button class="btn-social google">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" width="20">
        Google ile hesap aç
      </button>
      <button class="btn-social apple">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" width="18">
        Apple ile hesap aç
      </button>
    </div>
    
    <p class="terms-text">
      Google veya Apple kimliğinizle bir sonraki adıma geçmeniz halinde <a href="#">Bireysel Hesap Sözleşmesi ve Ekleri</a>'ni kabul etmiş sayılırsınız.
    </p>
    
    <div class="corporate-link">
      Mağaza açmak için, <a href="#">Kurumsal Hesap aç ▶</a>
    </div>

    <div class="footer-info">
        <p>
            Bu sayfadaki bilgiler sahibinden.com hesabı ve fatura gönderimi dahil olmak üzere tüm bilgilendirmelerimiz için alınmaktadır. Tarafınızca sağlanmış olan kişisel verileriniz hesap açma esnasında kimlik doğrulama tercihinize bağlı olarak Google veya Apple vasıtasıyla işlenebilecektir. Kişisel verilerin korunması hakkında detaylı bilgiye <strong>buradan</strong> ulaşabilirsiniz.
        </p>
        <p class="recaptcha-text">
            Bu site reCAPTCHA ile korunmaktadır. <strong>Google Gizlilik Politikası</strong> ve <strong>Kullanım Koşulları</strong> geçerlidir.
        </p>
    </div>
  </div>
</template>

<script setup>
const handleRegister = () => { alert("Hesap açılıyor..."); };
</script>

<style scoped>
.register-form-container {
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
.form-group { margin-bottom: 20px; position: relative; }
.form-input { width: 100%; padding: 12px 15px; border: 1px solid #ccc; border-radius: 2px; font-size: 14px; outline: none; }
.form-input:focus { border-color: #3264c3; }
.info-icon { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: #3264c3; font-size: 18px; }

.btn-submit { width: 100%; padding: 12px; background-color: #3264c3; color: #fff; border: none; border-radius: 3px; font-size: 16px; font-weight: bold; cursor: pointer; }
.btn-submit:hover { background-color: #2851a3; }

.login-link { margin-top: 20px; font-size: 14px; color: #666; }
.login-link a { color: #3264c3; text-decoration: none; font-weight: bold; }

.divider { margin: 25px 0; position: relative; text-align: center; }
.divider::before { content: ''; position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background-color: #e0e0e0; z-index: 1; }
.divider span { position: relative; z-index: 2; background-color: #fff; padding: 0 15px; color: #999; font-size: 13px; }

.social-login { display: flex; flex-direction: column; gap: 10px; }
.btn-social { width: 100%; padding: 10px; border: 1px solid #ccc; background-color: #fff; font-size: 14px; font-weight: bold; color: #333; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 3px; }
.btn-social img { margin-right: 10px; }

.terms-text { font-size: 11px; color: #999; margin-top: 20px; line-height: 1.4; }
.terms-text a { color: #3264c3; text-decoration: none; }

.corporate-link { margin-top: 20px; font-size: 14px; color: #333; }
.corporate-link a { color: #3264c3; text-decoration: none; font-weight: bold; }

.footer-info { margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px; font-size: 11px; color: #999; text-align: left; line-height: 1.4; }
.footer-info strong { color: #333; }
.recaptcha-text { margin-top: 10px; }
</style>