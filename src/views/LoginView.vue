<template>
    <div class="login-page">
      <SiteHeader /> 
      <LoginForm />
      <SiteFooter />
    </div>
  </template>
  
  <script setup>
  import LoginForm from '../components/LoginForm.vue';
  import SiteHeader from '../components/SiteHeader.vue'; 
  import SiteFooter from '../components/SiteFooter.vue';
  </script>
  
  <style scoped>
  /* Stiller (CSS) buraya gelecek. */
  </style>