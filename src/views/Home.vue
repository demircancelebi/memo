<template>
<div class="home">
    <div class="mt-5" v-if="!currentUser"></div>
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
            </div>
            <div id="profileRow" class="row mt-2">
              <div class="col-1"></div>
              <div class="col-3">
                <p class="text-start fname-lname">{{ users[currentUser].fName }}
                  {{ users[currentUser].lName }}</p>
                <p class="text-start username">
                  {{ currentUser }}</p>
                  <div class="d-grid gap-2 col-9">
                    <button id="myButton" @click="editProfile"
                    class="btn btn-dark edit-profile-btn">
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
    width: 250px;
    height: 250px;
    border-radius: 125px;
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
