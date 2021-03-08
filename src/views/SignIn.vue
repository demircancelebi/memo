<template>
    <div class="container">
        <div class="row">
            <h3>Sign in to Memo App</h3>
        </div><br>
        <div class="row justify-content-center">
            <div class="col-4">
                <div class="input-group input-group-lg">
                    <input type="text" class="form-control"
                    placeholder="Username" v-model="username">
                </div>
            </div>
        </div><br>
        <div class="row justify-content-center">
            <div class="col-4">
                <div class="input-group input-group-lg">
                    <input type="text" class="form-control"
                    placeholder="Password" v-model="password">
                </div>
            </div>
        </div><br>
        <div class="row justify-content-center">
            <div class="col-4">
                <div class="d-grid gap-2">
                    <button class="btn btn-primary btn-lg" @click="checkUser">Sign in</button>
                </div>
            </div>
        </div><br>
        <div class="row justify-content-center">
            <div class="col-4">
                <div>
                    <router-link class="routerL" to="/signup">Forgot your password?</router-link>
                    .<router-link class="routerL" to="/signup">Sign up to Memo App</router-link>
                </div>
            </div>
        </div><br>
    </div>
</template>

<script>
export default {
  name: 'SignIn',
  created() {
  },
  mounted() {
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch (e) {
        localStorage.removeItem('users');
      }
    }
  },
  data() {
    return {
      users: {
        username: {
          fName: '',
          lName: '',
          password: '',
          categories: [],
          questions: {},
        },
      },
      username: null,
      password: null,
    };
  },
  methods: {
    checkUser() {
      console.log('sign-in');
    },
  },
};
</script>

<style>
.routerB, .routerB:hover{
    color: currentColor;
    text-decoration: none;
}
.routerL {
    text-decoration: none;
}
</style>
