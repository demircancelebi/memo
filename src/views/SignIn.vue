<template>
  <div v-if="showLogInMessage" class="alert alert-primary">
    Successfully logged-in. Welcome <b>{{ currentUser }}</b>, you will be redirected soon...
  </div>
  <div class="container-signin mt-5">
      <div class="row">
          <h3><b>Sign In Menu</b></h3>
      </div>
      <div class="row mt-3 justify-content-center">
          <div class="col-8">
              <div class="input-group input-group-lg">
                  <input type="text" class="form-control"
                  placeholder="Username" v-model="username">
              </div>
          </div>
      </div>
      <div class="row mt-3 justify-content-center">
          <div class="col-8">
              <div class="input-group input-group-lg">
                  <input v-if="!showPassword" type="password" class="form-control"
                  placeholder="Password" v-model="password">
                  <button v-if="!showPassword" class="btn btn-outline-primary"
                  @click.prevent="changePasswordVisibility"><i class="far fa-eye-slash"></i>
                  </button>
                  <input v-if="showPassword" type="text" class="form-control"
                  placeholder="Password" v-model="password">
                  <button v-if="showPassword" class="btn btn-outline-primary"
                  @click.prevent="changePasswordVisibility"><i class="far fa-eye"></i>
                  </button>
              </div>
          </div>
      </div>
      <div v-if="error" class="row mt-3 justify-content-center">
          <div class="col-8">
              <div class="error-message">
                  {{ error }}
              </div>
          </div>
      </div>
      <div class="row mt-3 justify-content-center">
          <div class="col-8">
              <div class="d-grid gap-2">
                  <button class="btn btn-primary btn-lg" @click="checkUser">Sign In</button>
              </div>
          </div>
      </div>
      <div class="row mt-3 mb-4 justify-content-center">
          <div class="col-8">
              <div>
                  <router-link class="router" to="/signin">Forgot your password?</router-link>
                  .<router-link class="router" to="/signup"> Sign up to Memo App</router-link>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      users: {},
      errorMessages: {
        usernameErr: 'Username does not exist.',
        passwordErr: 'Invalid password.',
        emptyInputErr: 'Please fill all input areas.',
      },
      error: null,
      username: null,
      password: null,
      currentUser: null,
      showPassword: false,
      showLogInMessage: false,
    };
  },
  created() {
    if (localStorage.getItem('currentUser')) {
      try {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
    if (this.currentUser) {
      this.$router.back();
    }
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
  methods: {
    checkUser() {
      if (!this.username || !this.password) {
        this.showErrorMessage('emptyInputErr');
      } else {
        const usernames = Object.keys(this.users);
        if (usernames.length === 0) {
          this.showErrorMessage('usernameErr');
          return;
        }
        for (let i = 0; i < usernames.length; i += 1) {
          if (usernames[i] === this.username) {
            this.currentUser = usernames[i];
            if (this.users[this.currentUser].password === this.password) {
              this.showLogInMessage = true;
              this.error = '';
              localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
              window.setTimeout(this.pushRouter, 3000);
            } else {
              this.password = '';
              this.currentUser = '';
              this.showErrorMessage('passwordErr');
            }
          } else if (i + 1 === usernames.length && !this.currentUser) {
            this.username = '';
            this.password = '';
            this.showErrorMessage('usernameErr');
          }
        }
      }
    },
    showErrorMessage(errorType) {
      this.error = this.errorMessages[errorType];
    },
    changePasswordVisibility() {
      if (this.showPassword) {
        this.showPassword = false;
      } else {
        this.showPassword = true;
      }
    },
    pushRouter() {
      this.showLogInMessage = false;
      this.$router.push('/');
    },
  },
};
</script>

<style>
.container-signin {
    background: #fff;
    padding: 2em 4em 2em;
    max-width: 50%;
    margin: auto;
    box-shadow: 0 0 1em #222;
    border-radius: 10px;
}
.router {
    font-size: 85%;
    text-decoration: none;
}
.error-message {
    font-size: 85%;
    color:red;
}
</style>
