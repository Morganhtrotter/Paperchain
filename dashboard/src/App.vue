<template>
  <div id="app">
    <HelloWorld msg="Dashboard for Paperchain" />
    <AppButton @click="log">
      <Icon />
      add to favorites
    </AppButton>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AppButton from './components/AppButton.vue'
import Icon from './components/Icon.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AppButton,
    Icon
  },
  methods: {
    log() {
      console.log("works");
    }
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
