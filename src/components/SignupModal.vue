<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        
        <button class="close-button" @click="$emit('close')">X</button>
  
        <div class="tab-navigation">
          <button 
            :class="{ active: currentTab === 'login' }" 
            @click="currentTab = 'login'"
          >
            Giriş Yap
          </button>
          <button 
            :class="{ active: currentTab === 'register' }" 
            @click="currentTab = 'register'"
          >
            Hesap Aç
          </button>
        </div>
  
        <div class="modal-content">
          <LoginForm v-if="currentTab === 'login'" />
          <RegisterForm v-else />
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import LoginForm from './LoginForm.vue'; // Göreceli yol
  import RegisterForm from './RegisterForm.vue'; // Göreceli yol
  
  // Modalın görünürlüğünü dışarıdan kontrol etmek için prop tanımlıyoruz.
  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false,
    },
    initialTab: {
      type: String,
      default: 'login', // Varsayılan olarak giriş sekmesi açık
    }
  });
  
  // Modalın kapandığını ana componente bildirmek için event tanımlıyoruz.
  const emits = defineEmits(['close']);
  
  // Hangi sekmenin aktif olduğunu tutuyoruz
  const currentTab = ref(props.initialTab);
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Arka plan karartması */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Diğer her şeyin üstünde olması için */
  }
  
  .modal-container {
    background: white;
    border-radius: 8px;
    padding: 30px;
    position: relative;
    max-width: 450px;
    width: 90%;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
  }
  
  .tab-navigation {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  
  .tab-navigation button {
    flex-grow: 1;
    padding: 10px 0;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-weight: 500;
    color: #888;
    transition: all 0.2s;
  }
  
  .tab-navigation button.active {
    color: #007bff; /* Aktif sekme rengi */
    border-bottom-color: #007bff;
    font-weight: bold;
  }
  </style>