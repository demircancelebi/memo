<template>
  <Navbar></Navbar>
  <Bottom> </Bottom>
  <router-view />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Bottom from './components/Bottom.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Bottom,
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
.dropdown-current-user {
  display: inline-block;
}
.dropdown-logout {
  color: red;
}
</style>
