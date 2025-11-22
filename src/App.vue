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
body {
  margin: 0;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  background-color: #ffffff;
  color: #213547;
}

#app {
  width: 100%;
  margin: 0;
}
</style>
