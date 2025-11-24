<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue';
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px); 
  background-color: #f7f7f7;
  padding: 40px 0;
}
</style>