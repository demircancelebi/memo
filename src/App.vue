<template>
  <div v-if="currentUser && !showLogOutMessage" id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/play">Play</router-link> |
    <router-link to="/categories">Categories</router-link> |
    <router-link to="/questions">Questions</router-link> |

    <div class="dropdown" style="display: inline-block">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenu"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ currentUser }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <li>
          <button class="dropdown-item" type="button" href="#">
            My Profile
          </button>
        </li>
        <li>
          <button
            class="dropdown-item"
            type="button"
            href="#"
            style="color: red"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Log-Out
          </button>
        </li>
      </ul>
    </div>
  </div>

  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <br />
          Are you sure want to log-out?
        </div>
        <div class="modal-footer justify-content-center">
          <button
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
            @click="logOut"
          >
            Yes
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            No
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    style="font-size: 150%; color: black"
    v-if="showLogOutMessage"
    class="alert alert-danger"
    role="alert"
  >
    Successfully logged-out, you will be redirected soon...
  </div>

  <router-view />
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
      window.setTimeout(this.pushRouter, 3000);
    },
    pushRouter() {
      console.log('push router');
      this.showLogOutMessage = false;
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
