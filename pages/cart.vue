<template>
  <div class="cart-page">
    <div class="container">
        
        <div v-if="isEmpty" class="empty-cart-container">
            <div class="empty-cart-box">
                 <div class="cart-icon-circle">
                    
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#333">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                 </div>
                 
                 <h2 class="empty-title">Sepetinizde ürün bulunamadı</h2>
                 <p class="empty-desc">Dilerseniz ilan verebilir veya doping satın alabilirsiniz</p>
                 
                 <button class="bana-ozel-link-btn" @click="$router.push('/my/summary')">Bana Özel'e git</button>
            </div>
        </div>

        <div v-else class="cart-content">
            <h2 class="cart-title">Sepetim ({{ cartStore.itemCount }} Ürün)</h2>
            
            <div class="cart-items-list">
              <div v-for="item in cartStore.items" :key="item.id" class="cart-item-row">
                <div class="item-image">
                  <img :src="item.imageUrl || item.images?.[0] || 'https://via.placeholder.com/100'" :alt="item.title">
                </div>
                <div class="item-info">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <div class="item-details">
                    <span class="item-location">{{ item.location }}</span>
                  </div>
                </div>
                <div class="item-price">
                  <div class="price-amount">{{ item.price }} {{ item.currency }}</div>
                </div>
                <div class="item-actions">
                  <button @click="cartStore.removeFromCart(item.id)" class="remove-btn">Sil</button>
                </div>
              </div>
            </div>
            
            <div class="cart-summary">
              <div class="summary-row">
                <span>Toplam:</span>
                <strong class="total-price">{{ cartStore.totalAmount }} TL</strong>
              </div>
              <button class="checkout-btn" @click="$router.push('/checkout')">Ödeme Yap</button>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';
import SiteHeader from '~/components/SiteHeader.vue'; 

definePageMeta({
  layout: 'checkout', 

});

const cartStore = useCartStore();
const isEmpty = computed(() => cartStore.itemCount === 0);
</script>

<style scoped>
.cart-page {
    background-color: #fafafa; 
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding-top: 40px;
    font-family: Arial, sans-serif;
}

.empty-cart-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.empty-cart-box {
    background: #fff;
    width: 800px; 
    padding: 60px 20px;
    text-align: center;
    border: 1px solid #ededed;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}

.cart-icon-circle {
    background: #f5f5f5;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.empty-title {
    font-size: 20px;
    color: #333;
    margin: 0 0 10px 0;
    font-weight: 500;
}

.empty-desc {
    font-size: 13px;
    color: #666;
    margin: 0 0 25px 0;
}

.bana-ozel-link-btn {
    background: #fff;
    color: #3264c3;
    border: 1px solid #3264c3;
    padding: 10px 25px;
    border-radius: 3px;
    font-weight: bold;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s;
}
.bana-ozel-link-btn:hover {
    background: #eef5fb;
}

.cart-content {
    width: 900px;
    margin: 0 auto;
}

.cart-title {
    font-size: 22px;
    margin: 0 0 20px 0;
    color: #333;
    font-weight: 600;
}

.cart-items-list {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 20px;
}

.cart-item-row {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #f0f0f0;
}

.cart-item-row:last-child {
    border-bottom: none;
}

.item-image {
    width: 100px;
    height: 75px;
    flex-shrink: 0;
    margin-right: 20px;
}

.item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid #eee;
}

.item-info {
    flex: 1;
}

.item-title {
    font-size: 15px;
    color: #3264c3;
    margin: 0 0 8px 0;
    font-weight: 600;
}

.item-details {
    font-size: 13px;
    color: #666;
}

.item-location {
    margin-right: 15px;
}

.item-price {
    margin-right: 30px;
    text-align: right;
}

.price-amount {
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.item-actions {
    flex-shrink: 0;
}

.remove-btn {
    background: #fff;
    border: 1px solid #d00;
    color: #d00;
    padding: 8px 20px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.2s;
}

.remove-btn:hover {
    background: #d00;
    color: #fff;
}

.cart-summary {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.summary-row {
    font-size: 16px;
    color: #333;
}

.total-price {
    font-size: 20px;
    color: #3264c3;
    margin-left: 10px;
}

.checkout-btn {
    background: #3264c3;
    color: #fff;
    border: none;
    padding: 12px 40px;
    border-radius: 3px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
}

.checkout-btn:hover {
    background: #2854a8;
}
</style>
