<template>
  <div>
    <div class="container-signup">
      <div class="row">
        <h2>Sign Up Menu</h2>
      </div>
      <p class="mt-4">
        <label for="firstname" class="floatLabel">First Name</label>
        <input id="firstname" name="firstname" type="text" v-model="fName" />
      </p>
      <p>
        <label for="lastname" class="floatLabel">Last Name</label>
        <input id="lastname" name="lastname" type="text" v-model="lName" />
      </p>
      <p>
        <label for="username" class="floatLabel">Username</label>
        <input id="username" name="username" type="text" v-model="username" />
        <span v-if="checkUsername">This username already exist!</span>
      </p>
      <p>
        <label for="password" class="floatLabel">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="password"
        />
      </p>
      <p>
        <label for="confirm_password" class="floatLabel"
          >Confirm Password</label
        >
        <input
          id="confirm_password"
          name="confirm_password"
          type="password"
          v-model="confirm_password"
        />
        <span v-if="checkPassword">Your password do not match!</span>
      </p>
      <p>
        <span v-if="checkEmpty">Not allowed to empty inputs!</span>
        <input
          type="submit"
          value="Sign Me Up"
          id="submit"
          @click="registerUser"
        />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
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
    registerUser() {
      this.checkPassword = false;
      this.checkUsername = false;
      this.checkEmpty = false;
      if (
        !this.fName
        || !this.lName
        || !this.password
        || !this.confirm_password
        || !this.username
      ) {
        this.checkEmpty = true;
        return;
      }

      const tempUsers = Object.keys(this.users);
      for (let i = 0; i < tempUsers.length; i += 1) {
        if (tempUsers[i] === this.username) {
          this.checkUsername = true;
          return;
        }
      }

      if (this.password !== this.confirm_password) {
        this.checkPassword = true;
        return;
      }
      this.users[this.username] = {};
      this.users[this.username].username = this.username;
      this.users[this.username].fName = this.fName;
      this.users[this.username].lName = this.lName;
      this.users[this.username].password = this.password;
      this.users[this.username].img = null;

      localStorage.setItem('users', JSON.stringify(this.users));
      this.$router.push('/');
    },
  },

  data() {
    return {
      users: {},
      fName: null,
      lName: null,
      username: null,
      password: null,
      confirm_password: null,
      checkPassword: false,
      checkUsername: false,
      checkEmpty: false,
    };
  },
};
</script>

<style lang="scss">
$button: rgba(34, 201, 201, 0.781);

.container-signup {
  background: #fff;
  padding: 2em 4em 2em;
  max-width: 500px;
  margin: 50px auto 50px;
  box-shadow: 0 0 1em #222;
  border-radius: 10px;

  h2 {
    margin: 0 0 20px 0;
    padding: 10px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    padding-left: 10px;
  }

  p {
    margin: 0 0 2em 0;
    height: 80%;
    position: relative;
  }

  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 1%;
    outline: none;
    margin: 0px;
  }

  input[type='text'],
  input[type='password'] {
    background: #fff;
    border: 1px solid #dbdbdb;
    font-size: 1.6em;
    padding: 0.8em 0.5em;
    border-radius: 2px;
  }

  input[type='text']:focus,
  input[type='password']:focus {
    background: #fff;
  }

  span {
    display: block;
    background: #f9a5a5;
    padding: 2px 5px;
    color: #666;
  }

  input[type='submit'] {
    background: $button;
    box-shadow: 0 3px 0 0 darken($button, 10%);
    border-radius: 50px;
    border: none;
    color: #fff;
    cursor: pointer;
    display: block;
    font-size: 2em;
    line-height: 1.6em;
    margin: 1em 0 0;
    outline: none;
    padding: 0.1em 0;
    text-shadow: 0 1px #24c1cc;
  }

  label {
    position: absolute;
    left: 8px;
    top: 12px;
    color: #999;
    font-size: 16px;
    display: inline-block;
    padding: 4px 10px;
    font-weight: 400;
    background-color: rgba(255, 255, 255, 0);

    &.floatLabel {
      top: -11px;
      background-color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
    }
  }
}
</style>
