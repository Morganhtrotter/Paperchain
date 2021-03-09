<template>
  <div>
    <HelloWorld msg="Dashboard for Paperchain" />
    <Table>
      <template #userlist="{list, count}">
        <pre>
          {{ count }}
          {{ list }}
        </pre>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from './components/Table.vue';
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Table
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
