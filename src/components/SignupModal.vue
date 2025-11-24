<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    
    <div class="modal-box">
      
      <button class="close-btn" @click="$emit('close')">×</button>

      <h2 class="modal-title">İlan vermek için giriş yapın</h2>

      <form @submit.prevent>
        <div class="form-group">
          <input type="email" placeholder="E-posta adresi" class="form-input">
        </div>
        
        <div class="form-group password-group">
          <input type="password" placeholder="Şifre" class="form-input">
          <span class="toggle-icon">👁️</span> </div>
        
        <div class="forgot-pass">
          <a href="#">Şifremi unuttum</a>
        </div>

        <button class="btn-submit">E-posta ile giriş yap</button>
      </form>

      <div class="register-text">
  Henüz hesabın yok mu? 
  <router-link to="/register" @click="$emit('close')">Hesap aç ▶</router-link>
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

      <p class="footer-text">
        Google veya Apple kimliğinizle bir sonraki adıma geçmeniz halinde <a href="#">Bireysel Hesap Sözleşmesi ve Ekleri</a>'ni kabul etmiş sayılırsınız.
      </p>

    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}


.modal-box {
  background: #fff;
  padding: 40px;
  width: 440px;
  border-radius: 4px;
  position: relative;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  text-align: center;
  font-family: 'Roboto', sans-serif;
}


.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 28px;
  color: #999;
  cursor: pointer;
  font-weight: bold;
}
.close-btn:hover { color: #666; }


.modal-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
  text-align: left; 
}

.form-group { margin-bottom: 15px; position: relative; }
.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-size: 14px;
  outline: none;
}
.form-input:focus { border-color: #428bca; }

.toggle-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
}

.forgot-pass {
  text-align: right;
  margin-bottom: 20px;
  font-size: 13px;
}
.forgot-pass a { color: #428bca; text-decoration: none; }

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #428bca;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.btn-submit:hover { background-color: #357abd; }

.register-text { margin-top: 20px; font-size: 14px; color: #666; }
.register-text a { color: #428bca; text-decoration: none; font-weight: bold; }

.divider { margin: 20px 0; position: relative; }
.divider::before {
  content: ''; position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background: #eee; z-index: 1;
}
.divider span {
  position: relative; z-index: 2; background: #fff; padding: 0 15px; color: #999; font-size: 12px;
}

.social-login { display: flex; flex-direction: column; gap: 10px; }
.btn-social {
  width: 100%; padding: 10px; border: 1px solid #ccc; background: #fff;
  font-size: 14px; color: #333; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.btn-social img { margin-right: 10px; }

.footer-text {
  font-size: 11px; color: #999; margin-top: 20px; line-height: 1.4; text-align: left;
}
.footer-text a { color: #428bca; text-decoration: none; }
</style>