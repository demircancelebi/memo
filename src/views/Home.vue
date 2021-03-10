<template>
<div class="home">
    <div v-if="!currentUser"><br><br><br></div>
    <div v-if="currentUser">
        <div>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-3">
                  <p id="myImg" class="text-start">
                    <img :src="profileImg" class="profileImg">
                  </p>
                </div>
                <div class="col-4"></div>
                <div class="col-2"></div>
            </div><br>
            <div id="profileRow" class="row">
              <div class="col-1"></div>
              <div class="col-3">
                <p class="text-start fname-lname">{{ users[currentUser].fName }}
                  {{ users[currentUser].lName }}</p>
                <p class="text-start username">
                  {{ currentUser }}</p>
                  <div class="d-grid gap-2 col-9">
                    <button id="myButton" @click="editProfile"
                    style="font-size:80%;" class="btn btn-dark">
                      Edit Profile
                    </button>
                  </div>
              </div>
              <div class="col-4"></div>
              <div class="col-2"></div>
            </div>
        </div>
    </div>
    <div v-if="!currentUser">
        <h4>Welcome to Memo App</h4><br>
        <router-link to="/signin">
            <button class="btn btn-dark">Sign In</button>
        </router-link>
        <router-link style="padding-left:20px" to="/signup">
            <button class="btn btn-dark">Sign Up</button>
        </router-link>
    </div>
</div>
</template>

<script>
export default {
  name: 'Home',
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
  data() {
    return {
      users: {},
      currentUser: null,
    };
  },
  methods: {
    editProfile() {
      this.$router.push('/profile');
    },
  },
};
</script>

<style>
.profileImg {
    width: 250px;
    height: 250px;
    border-radius: 125px;
}
.fname-lname {
    font-size: 120%;
}
.username {
    font-size: 90%;
    color:gray;
}
</style>
