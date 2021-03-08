<template>
  <div v-if="currentUser" id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/play">Play</router-link> |
    <router-link to="/categories">Categories</router-link> |
    <router-link to="/questions">Questions</router-link> |
    <a href="#" style="color:red;" @click.prevent="logOut">Log-Out</a>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route() {
      if (localStorage.getItem('currentUser')) {
        try {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        } catch (e) {
          localStorage.removeItem('currentUser');
        }
      }
    },
  },
  data() {
    return {
      currentUser: null,
      showLogOutMessage: false,
    };
  },
  methods: {
    logOut() {
      this.showLogOutMessage = true;
      this.currentUser = '';
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.$router.push('/signin');
    },
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
