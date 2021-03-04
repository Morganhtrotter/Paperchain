<template>
  <div id="app">
    <HelloWorld msg="Dashboard for Paperchain" />
    <AppButton>press me</AppButton>
    <AppButton>like me</AppButton>
    <AppButton>click me</AppButton>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AppButton from './components/AppButton.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AppButton
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
