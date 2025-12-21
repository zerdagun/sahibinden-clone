<template>
  <div class="auth-layout">
    
    <header class="auth-header">
      <NuxtLink to="/">
        <span class="logo-box">sahibinden.com</span>
      </NuxtLink>
    </header>

    <main class="auth-main">
      <slot />
    </main>

    <footer class="auth-footer">
      <p class="footer-text">
        Tarafınızca sağlanmış olan kişisel verileriniz hesap açma esnasında kimlik doğrulama tercihinize bağlı olarak Google veya Apple vasıtasıyla işlenebilecektir. Kişisel verilerin korunması hakkında detaylı bilgiye <a href="#">buradan</a> ulaşabilirsiniz.
      </p>
      
      <div class="footer-bottom">
        <div class="footer-item">
          <span class="icon red">📞</span>
          <div>
            <strong>7/24 Müşteri Hizmetleri</strong>
            <span>0 850 222 44 44</span>
          </div>
        </div>
        <div class="footer-item">
          <span class="icon orange">❓</span>
          <div>
            <strong>Yardım Merkezi</strong>
            <span>yardim.sahibinden.com</span>
          </div>
        </div>
        <div class="footer-item lang">
          <span class="lang-label">Dil Seçimi (Language)</span>
          <select class="lang-select">
            <option>🇹🇷 Türkçe (Turkish)</option>
          </select>
        </div>
        <div class="qr-code">[QR]</div>
      </div>
      
      <p class="legal-text">
        sahibinden.com'da yer alan kullanıcıların oluşturduğu tüm içerik, görüş ve bilgilerin doğruluğu, eksiksiz ve değişmez olduğu, yayınlanması ile ilgili yasal yükümlülükler içeriği oluşturan kullanıcıya aittir. Bu içeriğin, görüş ve bilgilerin yanlışlık, eksiklik veya yasalarla düzenlemiş kurallara aykırılığından sahibinden.com hiçbir şekilde sorumlu değildir. Sorunlarınız için ilan sahibi ile irtibata geçebilirsiniz.
      </p>
      <p class="copyright">Copyright © 2000-2025 sahibinden.com</p>
    </footer>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.auth-header {
  padding: 30px 0 10px;
  text-align: center;
  background-color: transparent;
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

.auth-main {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 50px 20px 30px;
}

.auth-footer {
  padding: 20px 40px;
  text-align: center;
  font-size: 11px;
  color: #666;
  line-height: 1.6;
}

.footer-text {
  max-width: 600px;
  margin: 0 auto 20px;
}

.footer-text a {
  color: #3264c3;
  text-decoration: none;
}

.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 15px 0;
  border-top: 1px solid #e0e0e0;
  margin-top: 15px;
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.footer-item div {
  text-align: left;
}

.footer-item strong {
  display: block;
  color: #333;
}

.footer-item span {
  color: #666;
}

.icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.icon.red { background: #e74c3c; }
.icon.orange { background: #f39c12; }

.lang {
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}

.lang-label {
  font-size: 10px;
  color: #999;
}

.lang-select {
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 11px;
}

.qr-code {
  width: 45px;
  height: 45px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  color: #999;
}

.legal-text {
  max-width: 900px;
  margin: 15px auto 0;
  font-size: 10px;
  color: #999;
}

.copyright {
  margin-top: 10px;
  color: #666;
}
</style>
