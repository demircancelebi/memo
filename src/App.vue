<template>
  <div v-if="currUser" id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/play">Play</router-link> |
    <router-link to="/categories">Categories</router-link> |
    <router-link to="/questions">Questions</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (localStorage.getItem('currUser')) {
      try {
        this.currUser = JSON.parse(localStorage.getItem('currUser'));
      } catch (e) {
        localStorage.removeItem('currUser');
      }
    }
  },
  data() {
    return {
      currUser: null,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
