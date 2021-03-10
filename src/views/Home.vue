<template>
<div class="home">
    <div v-if="!currentUser"><br><br><br></div>
    <div v-if="currentUser">
        <div>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-3">
                   <div class="d-grid gap-2 col-9">
                      <button v-if="!isProfileShown" style="font-size:80%;"
                      class="btn btn-dark" @click="showProfile">
                        Show Profile
                      </button>
                   </div>
                  <p id="myImg" class="text-start"></p>
                </div>
                <div class="col-4"></div>
                <div class="col-2"></div>
            </div><br>
            <div id="profileRow" class="row"></div>
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
      isProfileShown: false,
    };
  },
  methods: {
    showProfile() {
      this.isProfileShown = true;
      if (this.users[this.currentUser].img) {
        document.getElementById('myImg').innerHTML = `<img src="${this.users[this.currentUser].img}" class="profileImg">`;
      } else {
        document.getElementById('myImg').innerHTML = '<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" class="profileImg">';
      }
      document.getElementById('profileRow').innerHTML = `
                <div class="col-1"></div>
                <div class="col-3">
                    <p class="text-start fname-lname">${this.users[this.currentUser].fName} 
                      ${this.users[this.currentUser].lName}</p>
                    <p class="text-start username">
                      ${this.currentUser}</p>
                      <div class="d-grid gap-2 col-9">
                        <button id="myButton" style="font-size:80%;" class="btn btn-dark">
                          Edit Profile
                        </button>
                      </div>
                </div>
                <div class="col-4"></div>
                <div class="col-2"></div>`;
      document.getElementById('myButton').onclick = this.editProfile;
    },
    editProfile() {
      this.isProfileShown = false;
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
