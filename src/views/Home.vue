<template>
<div class="home">
    <div v-if="!currentUser"><br><br><br></div>
    <div v-if="currentUser">
        <div>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-3">
                  <p class="text-start">
                    <img id="myImg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" class="profileImg">
                  </p>
                </div>
                <div class="col-4"></div>
                <div class="col-2"></div>
            </div><br>
            <div class="row">
                <div class="col-1">
                </div>
                <div class="col-3">
                    <p class="text-start fname-lname">{{ users[currentUser].fName}}
                      {{users[currentUser].lName}}</p>
                    <p class="text-start username">
                      {{ currentUser }}</p>
                      <div class="d-grid gap-2 col-9">
                        <button style="font-size:80%;" class="btn btn-dark" @click="editProfile">
                          Get Profile Picture
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
      if (this.users[this.currentUser].img) {
        document.getElementById('myImg').src = this.users[this.currentUser].img;
      } else {
        console.log('no image');
      }
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
