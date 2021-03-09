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
</style>
