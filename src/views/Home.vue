<template>
  <div class="home">
    <div v-if="!currentUser"><br><br><br></div>
    <div class="container">
      <h4>Welcome to Memo App</h4><br>
      <div v-if="!currentUser">
        <router-link to="/signin">
        <button class="btn btn-dark">Sign In</button>
        </router-link>
        <router-link style="padding-left:20px" to="/signup">
        <button class="btn btn-dark">Sign Up</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    if (localStorage.getItem('currentUser')) {
      try {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  },
  data() {
    return {
      currentUser: null,
    };
  },
  methods: {
    logOut() {
      console.log(`Username: ${this.currentUser}, successfully logged out.`);
      this.currentUser = '';
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    },
  },
};
</script>
