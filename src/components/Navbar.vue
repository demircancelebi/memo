<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
    <div class="container">
      <a class="navbar-brand" href="#">memo</a>
      <button class="navbar-toggler"
        type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="currentUser && !showLogOutMessage">
          <li class="nav-item" v-for="link in links" :key="link">
            <router-link
              :class="{ active: $route.path === link.to }"
              class="nav-link"
              :to="link.to">{{ link.name }}</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle"
              href="#" id="navbarDropdown" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
                {{ currentUser }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#"
                  @click.prevent="this.$router.push('/profile')">My Profile</a></li>
                <li><a
                class="dropdown-item dropdown-logout"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                href="#">Log out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <div>
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
          <div class="modal-body mt-3">
            Are you sure want to log-out?
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="logOut">
              Yes</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
              No</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showLogOutMessage" class="alert alert-danger" role="alert">
      Successfully logged-out, have a nice day !
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  created() {
    console.log(this.$route.path);
  },
  computed: {
    currentRoute() {
      return this.$router.currentRoute.path;
    },
  },
  data() {
    return {
      currentUser: null,
      // links: ['Play', 'Report a bug', 'Questions'],
      links: [
        {
          to: '/play',
          name: 'Play',
        },
        {
          to: '/questions',
          name: 'Questions',
        },
      ],
      showLogOutMessage: false,
    };
  },
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
  methods: {
    logOut() {
      this.showLogOutMessage = true;
      this.currentUser = '';
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.$router.back();
      window.setTimeout(this.pushRouter, 3000);
    },
    pushRouter() {
      this.showLogOutMessage = false;
      window.location.reload();
    },
  },
};
</script>

<style>

</style>
