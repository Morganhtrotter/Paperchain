<template>
  <AppLayout>
    <template #header>Slots are awesome</template>
    <template #default>
      <HelloWorld msg="Dashboard for Paperchain" />
      <AppButton @click="log">
        <Icon />
        add to favorites
      </AppButton>
    </template>
  </AppLayout>
</template>

<script>
import AppLayout from './components/AppLayout.vue';
import HelloWorld from './components/HelloWorld.vue';
import AppButton from './components/AppButton.vue';
import Icon from './components/Icon.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    AppButton,
    Icon,
    AppLayout
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
