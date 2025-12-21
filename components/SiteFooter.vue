<template>
    <footer class="site-footer">
      
      <div class="footer-top">
        <div class="footer-columns">

          <div class="column">
            <h4>Kurumsal</h4>
            <ul>
              <li><a href="#">Hakkımızda</a></li>
              <li><a href="#">Sürdürülebilirlik</a></li>
              <li><a href="#">İnsan Kaynakları</a></li>
              <li><a href="#">Haberler</a></li>
              <li><a href="#">Site Haritası</a></li>
              <li><a href="#">İletişim</a></li>
            </ul>
          </div>

          <div class="column">
            <h4>Hizmetlerimiz</h4>
            <ul>
              <li><a href="#">Doping</a></li>
              <li><a href="#">S - Param Güvende</a></li>
              <li><a href="#">Güvenli E-Ticaret (Get!)</a></li>
              <li><a href="#">Toplu Ürün Girişi</a></li>
              <li><a href="#">Reklam</a></li>
              <li><a href="#">Mobil</a></li>
              <li><a href="#">Auto King</a></li>
            </ul>
          </div>

          <div class="column">
            <h4>Mağazalar</h4>
            <ul>
              <li><a href="#">Neden Mağaza?</a></li>
              <li><a href="#">Mağaza Açmak İstiyorum</a></li>
            </ul>
          </div>

          <div class="column">
            <h4>Gizlilik ve Kullanım</h4>
            <ul>
              <li><a href="#">Güvenli Alışveriş İpuçları</a></li>
              <li><a href="#">Sözleşmeler ve Kurallar</a></li>
              <li><a href="#">Hesap Sözleşmesi</a></li>
              <li><a href="#">Kullanım Koşulları</a></li>
              <li><a href="#">Kişisel Verilerin Korunması</a></li>
              <li><a href="#">Çerez Yönetimi</a></li>
              <li><a href="#">Yardım ve İşlem Rehberi</a></li>
            </ul>
          </div>

          <div class="column social">
            <h4>Bizi Takip Edin</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">X</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Youtube</a></li>
            </ul>
          </div>
  
        </div>
      </div>
      
      <div class="footer-bottom">
        
        <div class="contact-area">
          
          <div class="service-item">
            <span class="icon red-circle">📞</span> 
            7/24 Müşteri Hizmetleri
            <p class="service-number">0 850 222 44 44</p>
          </div>
          
          <div class="service-item">
            <span class="icon red-circle">❓</span> 
            Yardım Merkezi
            <p class="service-link">yardim.sahibinden.com</p>
          </div>

          <div class="language-selector">
            <label for="lang-select">Dil Seçimi (Language)</label>
            <div class="select-box">
              <span class="flag-icon">🇹🇷</span>
              <select id="lang-select" class="lang-select">
                <option>Türkçe (Turkish)</option>
              </select>
              <span class="arrow-down">⌄</span>
            </div>
          </div>
        </div>

        <div class="copyright-section">
          <p class="legal-text">
            sahibinden.com'da yer alan kullanıcıların oluşturduğu tüm içerik, görüş ve bilgilerin doğruluğu, eksiksiz ve değişmez olduğu, yayınlanması ile ilgili yasal yükümlülükler içeriği oluşturan kullanıcıya aittir. Bu içeriğin, görüş ve bilgilerin yanlışlık, eksiklik veya yasalarla düzenlenmiş kurallara aykırılığından sahibinden.com hiçbir şekilde sorumlu değildir. Sorunlarınız için İlan sahibi ile irtibata geçebilirsiniz.
          </p>
          
          <div class="footer-meta">
              <p class="copyright">Copyright © 2000-2025 sahibinden.com</p>
              <p class="disclaimer">(*) Bireysel hesap sahipleri için, limitli adetlerde, belirli kategorilerde ve belirli tekliflerde</p>
              <div class="qr-etbis-icons">
                [QR KOD] [ETBIS]
              </div>
          </div>
        </div>
  
      </div>
    </footer>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>
  
  .site-footer {
    background-color: white;
    color: #333;
    font-size: 0.9em;
    border-top: 1px solid #e0e0e0;
  }

  .footer-top {
    padding: 30px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-columns {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .column {
    flex-basis: 20%; 
    min-width: 120px;
  }
  
  .column h4 {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
  }
  
  .column ul {
    list-style: none;
    padding: 0;
  }
  
  .column li {
    margin-bottom: 5px;
  }
  
  .column a {
    text-decoration: none;
    color: #666;
    font-size: 0.95em;
    transition: color 0.2s;
  }
  
  .column a:hover {
    color: #d9534f; 
  }

  .footer-bottom {
    border-top: 1px solid #e0e0e0;
    padding: 20px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .contact-area {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 20px;
  }
  
  .service-item {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #333;
  }
  
  .service-number, .service-link {
      font-weight: normal;
      font-size: 0.9em;
      color: #666;
      margin-left: 5px;
  }
  
  .red-circle {
      background-color: #d9534f; 
      color: white;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.9em;
      margin-right: 8px;
      flex-shrink: 0;
  }

  .language-selector label {
      display: block;
      font-size: 0.8em;
      color: #999;
      margin-bottom: 5px;
  }
  .select-box {
      position: relative;
      border: 1px solid #ccc;
      border-radius: 4px;
      display: flex;
      align-items: center;
      width: 180px;
      padding: 5px;
  }
  .select-box .flag-icon {
      margin-right: 8px;
  }
  .lang-select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      border: none;
      background: transparent;
      width: 100%;
      cursor: pointer;
      padding-right: 20px; 
      color: #333;
  }
  .arrow-down {
      position: absolute;
      right: 10px;
      color: #666;
      pointer-events: none;
  }

  .legal-text {
      background-color: #f7f7f7;
      border: 1px solid #eee;
      padding: 10px;
      font-size: 0.8em;
      color: #666;
      margin-bottom: 15px;
      text-align: left;
  }
  
  .footer-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8em;
      color: #888;
  }
  
  .disclaimer {
      max-width: 400px;
  }
  
  .qr-etbis-icons {
      
      font-size: 1.5em;
      color: #4a90e2;
  }
  </style>
  