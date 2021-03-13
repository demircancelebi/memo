<template>
  <div><Topbar /></div>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/categories">Categories</router-link> |
    <router-link to="/questions">Questions</router-link>
  </div>  -->
  <router-view id="app" class="text-center" />
  <Bottom />
</template>
<script>
import Topbar from './components/Topbar.vue';
import Bottom from './components/Bottom.vue';

export default {
  name: 'App',
  components: {
    Topbar,
    Bottom,
  },
};
</script>
<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
