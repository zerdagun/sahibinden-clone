<template>
  <div class="checkout-page">
    <h1 class="page-title">Sipariş detay</h1>
    
    <div class="checkout-content">
      <div class="left-column">
        
        <div class="card product-card">
          <h2 class="card-title">Ürün bilgileri</h2>
          <div class="product-info" v-if="product">
            <div class="product-image">
              <img :src="product.view?.imageUrl || product.imageUrl" :alt="product.title">
            </div>
            <div class="product-details">
              <h3 class="product-title">{{ product.title }}</h3>
              <div class="installment-badge">
                💳 12 aya varan taksit seçenekleri >
              </div>
              <div class="product-price">{{ formatPrice(product.price) }} TL</div>
            </div>
          </div>
          
          <div class="delivery-info">
            <span class="truck-icon">🚚</span>
            <span>Ürün, satıcı tarafından 3 iş gününde kargoya verilir.</span>
          </div>
        </div>

        <div class="card benefits-card">
          <div class="benefits-header">
            <span class="s-logo">S</span> - <span class="pg-text">Param Güvende</span> ile alışveriş daha kolay
          </div>
          <div class="benefits-list">
             <div class="benefit-item">
               <span class="check-icon">🛡️</span> Paranız güvende
             </div>
             <div class="benefit-item">
               <span class="check-icon">🚛</span> Ücretsiz kargo
             </div>
             <div class="benefit-item">
               <span class="check-icon">💳</span> Taksit fırsatı
             </div>
             <div class="benefit-item">
               <span class="check-icon">📦</span> Kolay iade
             </div>
             <div class="details-link">Detaylar ▼</div>
          </div>
        </div>
        
        <NuxtLink :to="`/product/${route.query.productId}`" class="back-link">
          < İlana geri dön
        </NuxtLink>
      </div>
      
      <div class="right-column">
        
        <div class="card summary-card">
          <h2 class="card-title">Sipariş özeti</h2>
          
          <div class="summary-line">
            <span>Ürün bedeli</span>
            <span>{{ formatPrice(product?.price || 0) }} TL</span>
          </div>
          
          <div class="summary-line">
            <span>S - Param Güvende hizmet bedeli</span>
            <span>{{ formatPrice(serviceFee) }} TL</span>
          </div>
          
          <div class="summary-line">
            <span>Kargo ücreti</span>
            <span>Ücretsiz</span>
          </div>
          
          <div class="total-line">
            <span>Toplam tutar</span>
            <span class="total-amount">{{ formatPrice(totalAmount) }} TL</span>
          </div>
          
          <button class="checkout-btn" @click="handlePayment">
            Ödemeye geç
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useAuthStore } from '~/stores/auth';
import { useOrderStore } from '~/stores/orders';
import { useAdStore } from '~/stores/ads';
import type { IAd } from '~/types';

definePageMeta({
  layout: 'checkout',
  middleware: 'auth'
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const orderStore = useOrderStore();
const adStore = useAdStore();
const product = ref<IAd | null>(null);

onMounted(async () => {
  const productId = route.query.productId as string;
  if (productId) {
    await adStore.fetchAdById(productId);
    if (adStore.currentAd) {
        product.value = adStore.currentAd;

        if (!product.value.imageUrl && product.value.images && product.value.images.length > 0) {
            
            product.value.imageUrl = product.value.images[0];
        }
    }
  }
});

const serviceFee = computed(() => {
  if (!product.value) return 0;
  
  return Math.round(product.value.price * 0.065);
});

const totalAmount = computed(() => {
  if (!product.value) return 0;
  return product.value.price + serviceFee.value;
});

const formatPrice = (price: number) => {
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const handlePayment = async () => {
  if (!product.value) return;
  
  try {
    await orderStore.createOrder(
      product.value, 
      serviceFee.value, 
      totalAmount.value
    );
    
    alert('Siparişiniz başarıyla oluşturuldu! ("orders" koleksiyonuna kaydedildi)');
    router.push('/');
  } catch (e) {
    alert('Sipariş oluşturulurken bir hata oluştu: ' + e);
  }
};
</script>

<style scoped>
.checkout-page {
  font-family: 'Roboto', Arial, sans-serif;
  color: #333;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.checkout-content {
  display: flex;
  gap: 20px;
}

.left-column {
  flex: 1;
}

.right-column {
  width: 380px;
}

.card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.product-info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.product-image {
  width: 120px;
  height: 90px;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.product-details {
  flex: 1;
}

.product-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 15px;
  font-weight: normal;
}

.installment-badge {
  display: inline-block;
  background: #eef5fb;
  color: #3264c3;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 3px;
  margin-bottom: 15px;
  font-weight: bold;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.delivery-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
  font-size: 13px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.truck-icon {
  color: #2da85c;
  font-size: 16px;
}

.benefits-card {
  padding: 15px 20px;
}

.benefits-header {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.s-logo {
  color: #2da85c;
  font-weight: bold;
}

.pg-text {
  color: #2da85c;
}

.benefits-list {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 12px;
  color: #666;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.check-icon {
  color: #2da85c;
}

.details-link {
  margin-left: auto;
  color: #3264c3;
  cursor: pointer;
  font-weight: bold;
}

.back-link {
  color: #3264c3;
  text-decoration: none;
  font-weight: bold;
  font-size: 13px;
  display: inline-block;
  margin-top: 10px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;
  color: #333;
}

.total-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  font-size: 16px;
  font-weight: bold;
  color: #3264c3;
}

.total-amount {
  font-size: 20px;
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  background-color: #1059b0;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 25px;
}

.checkout-btn:hover {
  background-color: #0d4a94;
}
</style>
