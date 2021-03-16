<template>
<div class="home">
    <div v-if="currentUser">
      <div class="row mt-5 ms-5">
        <div class="col-sm-3">
          <p id="myImg" class="text-start">
            <img :src="profileImg" class="profileImg">
          </p>
        </div>
      </div>
      <div class="row ms-5">
        <div class="col-sm-3">
          <p class="text-start fname-lname">{{ users[currentUser].fName }}
            {{ users[currentUser].lName }}</p>
          <p class="text-start username">
            {{ currentUser }}</p>
          <div class="d-grid gap-2 col-8">
            <button id="myButton" @click="editProfile"
            class="btn btn-dark edit-profile-btn">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5" v-if="!currentUser">
      <h4>Welcome to Memo App</h4>
      <div class="mt-4">
        <router-link to="/signin">
            <button class="btn btn-dark">Sign In</button>
        </router-link>
        <router-link class="router-signup" to="/signup">
            <button class="btn btn-dark">Sign Up</button>
        </router-link>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      users: {},
      currentUser: null,
    };
  },
  computed: {
    profileImg() {
      if (this.currentUser && this.users[this.currentUser] && this.users[this.currentUser].img) {
        return this.users[this.currentUser].img;
      }
      return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    },
  },
  mounted() {
    if (localStorage.getItem('currentUser')) {
      try {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch (e) {
        localStorage.removeItem('users');
      }
    }
  },
  methods: {
    editProfile() {
      this.$router.push('/profile');
    },
  },
};
</script>

<style>
.router-signup {
  padding-left: 20px;
}
.profileImg {
  height: 75%;
  width: 75%;
  max-height: 100%;
  max-width: 100%;
  border-radius: 100%;
}
.edit-profile-btn {
  font-size: 80%;
}
.fname-lname {
    font-size: 120%;
}
.username {
    font-size: 90%;
    color:gray;
}
</style>
