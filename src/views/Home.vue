<template>
  <div class="home">
    <div class="container">
      <h4>Welcome to Memo App</h4><br>
      <div v-if="!currUser">
        <router-link to="/signin">
        <button class="btn btn-dark">Sign In</button>
        </router-link>
        <router-link style="padding-left:20px" to="/signup">
        <button class="btn btn-dark">Sign Up</button>
        </router-link>
      </div>
      <div v-if="currUser">
        <router-link to="/signin">
        <button class="btn btn-danger" @click="logOut">Log Out</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
  methods: {
    logOut() {
      console.log(`Username: ${this.currUser}, successfully logged out.`);
      this.currUser = '';
      localStorage.setItem('currUser', JSON.stringify(this.currUser));
    },
  },
};
</script>
