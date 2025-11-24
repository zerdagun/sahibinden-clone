<template>
  <div id="app">
    <SiteHeader />
    <router-view />
  </div>
</template>

<script setup>
import SiteHeader from './components/SiteHeader.vue';
</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif; 
  background-color: #f7f7f7;
}

a {
  text-decoration: none; 
}
</style>
