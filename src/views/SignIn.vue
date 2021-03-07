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
                    <button class="btn btn-primary btn-lg" type="button">
                        <router-link class="routerB" to="/signup">Sign in</router-link>
                    </button>
                </div>
            </div>
        </div><br>
        <div class="row justify-content-center">
            <div class="col-4">
                <div>
                    <router-link class="routerL" to="/signup">Forgot your password? </router-link>
                    .<router-link class="routerL" to="/signup"> Sign up to Memo App </router-link>
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
    };
  },
  methods: {
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
