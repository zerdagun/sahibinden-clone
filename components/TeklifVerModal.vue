<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Teklif Ver <span class="help-icon">?</span></h3>
          <button class="close-btn" @click="close">×</button>
        </div>
        
        <div class="modal-body">
          
          <div class="quick-buy-section">
            <div class="price-info">
              <span>Ürün Fiyatı: </span>
              <strong>{{ product.price }} {{ product.currency || 'TL' }}</strong>
            </div>
            <button class="hemen-al-btn" @click="goToCheckout">Hemen al</button>
          </div>
          <p class="param-note">
            <span class="param-link">S-Param Güvende</span> ile hemen alabilirsiniz.
          </p>
          
          <div class="divider">
            <span>veya</span>
          </div>

          <div class="offer-section">
            <label>Teklifiniz</label>
            <div class="offer-input-wrapper">
              <input 
                type="text" 
                v-model="offerAmount" 
                placeholder="Teklifinizi girin."
                class="offer-input"
              />
              <span class="currency-label">TL</span>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="cancel-btn" @click="close">Vazgeç</button>
          <button class="submit-btn" @click="submitOffer" :disabled="!offerAmount">Gönder</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  product: any;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'checkout'): void;
}>();

const offerAmount = ref('');

const close = () => {
  offerAmount.value = '';
  emit('close');
};

const goToCheckout = () => {
  emit('checkout');
};

const submitOffer = () => {
  if (offerAmount.value) {
    alert(`Teklifiniz gönderildi: ${offerAmount.value} TL`);
    close();
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

.modal-container {
  background: white;
  border-radius: 8px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.help-icon {
  width: 18px;
  height: 18px;
  border: 1px solid #999;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.modal-body {
  padding: 20px;
}

.quick-buy-section {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-info {
  font-size: 14px;
  color: #333;
}

.price-info strong {
  font-size: 16px;
}

.hemen-al-btn {
  padding: 8px 20px;
  background: white;
  border: 1px solid #1bb3a0;
  color: #1bb3a0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.hemen-al-btn:hover {
  background: #1bb3a0;
  color: white;
}

.param-note {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
}

.param-link {
  color: #1bb3a0;
}

.divider {
  text-align: center;
  margin: 20px 0;
  color: #999;
  font-size: 13px;
}

.offer-section label {
  display: block;
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.offer-input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.offer-input {
  flex: 1;
  padding: 12px;
  border: none;
  font-size: 14px;
  outline: none;
}

.offer-input::placeholder {
  color: #f99;
}

.currency-label {
  padding: 12px;
  background: #f5f5f5;
  color: #666;
  font-size: 14px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid #eee;
}

.cancel-btn {
  padding: 10px 24px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.cancel-btn:hover {
  background: #f5f5f5;
}

.submit-btn {
  padding: 10px 24px;
  background: #1bb3a0;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #159a89;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
