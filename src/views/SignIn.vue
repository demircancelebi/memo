<template>
    <div class="container-signin">
        <div class="row">
            <h3>Sign in to Memo App</h3>
        </div><br>
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="input-group input-group-lg">
                    <input type="text" class="form-control"
                    placeholder="Username" v-model="username">
                </div>
            </div>
        </div><br v-if="!showUsernameError">
        <div v-if="showUsernameError" class="row justify-content-center">
            <div class="col-8">
                <div class="error-message">
                    Username does not exist.
                </div>
            </div>
        </div><br v-if="showUsernameError">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="input-group input-group-lg">
                    <input v-if="!showPassword" type="password" class="form-control"
                    placeholder="Password" v-model="password">
                    <input v-if="showPassword" type="text" class="form-control"
                    placeholder="Password" v-model="password">
                    <button v-if="showPassword" class="btn btn-outline-primary"
                    @click.prevent="changePasswordVisibility"><i class="far fa-eye"></i>
                    </button>
                    <button v-if="!showPassword" class="btn btn-outline-primary"
                    @click.prevent="changePasswordVisibility"><i class="far fa-eye-slash"></i>
                    </button>
                </div>
            </div>
        </div><br v-if="!showPasswordError && dontShowEmptyInputError">
        <div v-if="showPasswordError" class="row justify-content-center">
            <div class="col-8">
                <div class="error-message">
                    Invalid password.
                </div>
            </div>
        </div><br v-if="showPasswordError">
        <div v-if="!dontShowEmptyInputError" class="row justify-content-center">
            <div class="col-8">
                <div class="error-message">
                    Please fill all input areas.
                </div>
            </div>
        </div><br v-if="!dontShowEmptyInputError">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="d-grid gap-2">
                    <button class="btn btn-primary btn-lg" @click="checkUser">Sign In</button>
                </div>
            </div>
        </div><br>
        <div class="row justify-content-center">
            <div class="col-8">
                <div>
                    <router-link class="router" to="/signin">Forgot your password?</router-link>
                    .<router-link class="router" to="/signup"> Sign up to Memo App</router-link>
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
        atillakaantanyeri: {
          fName: 'Atilla Kaan',
          lName: 'Tanyeri',
          password: '123456789',
          categories: [],
          questions: {},
        },
      },
      username: null,
      password: null,
      currUser: null,
      showPassword: false,
      showUsernameError: false,
      showPasswordError: false,
      dontShowEmptyInputError: true,
      showSuccessfullyLogin: false,
    };
  },
  methods: {
    checkUser() {
      console.log('sign-in');
      if (!this.username || !this.password) {
        this.showUsernameError = false;
        this.showPasswordError = false;
        this.dontShowEmptyInputError = false;
      } else {
        this.dontShowEmptyInputError = true;
        const usernames = Object.keys(this.users);
        for (let i = 0; i < usernames.length; i += 1) {
          if (usernames[i] === this.username) {
            this.showUsernameError = false;
            this.currUser = usernames[i];
            if (this.users[this.currUser].password === this.password) {
              this.showPasswordError = false;
              this.showSuccessfullyLogin = true;
              localStorage.setItem('currUser', JSON.stringify(this.currUser));
              this.$router.push('/');
            } else {
              this.password = '';
              this.showPasswordError = true;
            }
          } else if (i + 1 === usernames.length) {
            this.username = '';
            this.password = '';
            this.showUsernameError = true;
          }
        }
      }
    },
    changePasswordVisibility() {
      if (this.showPassword) {
        this.showPassword = false;
      } else {
        this.showPassword = true;
      }
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
