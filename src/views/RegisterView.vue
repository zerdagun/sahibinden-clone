<template>
    <div class="register-page">
      <SiteHeader /> 
      <RegisterForm />
      <SiteFooter />
    </div>
  </template>
  
  <script setup>
  import RegisterForm from '../components/RegisterForm.vue';
  import SiteHeader from '../components/SiteHeader.vue'; 
  import SiteFooter from '../components/SiteFooter.vue';
  </script>
  
  <style scoped>
  /* Stiller (CSS) buraya gelecek. */
  </style>