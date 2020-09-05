<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      tab: '课程'
    }
  }
}
</script>

<style>
#app {
  font-family: Arial,sans-serif, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  max-width: 640px;
}
.notiy-data {
  line-height: 60px;
  text-align: center;
  color: rgba(0,0,0,0.5)
}
</style>
