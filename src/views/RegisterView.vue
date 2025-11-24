<template>
  <div class="register-page">
    <RegisterForm />
  </div>
</template>

<script setup>
import RegisterForm from '../components/RegisterForm.vue';
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  background-color: #f7f7f7;
  padding: 40px 0;
}
</style>