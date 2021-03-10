<template>
<div class="profile">
    <div>
        <h4>My Profile</h4><br>
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
                <div class="col-5">
                    <div class="row">
                        <div class="col-3 text-start">
                            <b>First name:</b>
                        </div>
                        <div id="newfName" class="col text-start">
                            {{this.users[this.currentUser].fName}}
                        </div>
                        <div class="col text-start">
                            <button @click="showClicked('newfName')" class="btn btn-outline-dark">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </div><br>
                    <div class="row">
                        <div class="col-3 text-start">
                            <b>Last name:</b>
                        </div>
                        <div id="newlName" class="col text-start">
                            {{this.users[this.currentUser].lName}}
                        </div>
                        <div class="col text-start">
                            <button @click="showClicked('newlName')" class="btn btn-outline-dark">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </div><br>
                    <div class="row">
                        <div class="col-3 text-start">
                           <b>Username:</b>
                        </div>
                        <div id="newUsername" class="col text-start">
                            {{this.currentUser}}
                        </div>
                        <div class="col text-start">
                            <button @click="showClicked('newUsername')"
                            class="btn btn-outline-dark">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </div><br>
                    <div class="row">
                        <div class="col-3 text-start">
                            <b>Password:</b>
                        </div>
                        <div id="newPassword" class="col text-start">
                            {{this.users[this.currentUser].password}}
                        </div>
                        <div class="col text-start">
                            <button @click="showClicked('newPassword')"
                            class="btn btn-outline-dark">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </div><br>
                    <div class="row">
                         <div class="d-grid gap-2 col-9">
                            <button class="btn btn-outline-dark">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-2"></div>
            </div>
        <div id="profileRow" class="row"></div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Profile',
  created() {
    if (localStorage.getItem('currentUser')) {
      try {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
    if (!this.currentUser) {
      this.$router.back();
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
      clickCounter: {},
      newfName: '',
      newlName: '',
      newUsername: '',
      newPassword: '',
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
                          Go back to Homepage
                        </button>
                      </div>
                </div>
                <div class="col-4"></div>
                <div class="col-2"></div>`;
      document.getElementById('myButton').onclick = this.backToHome;
    },
    backToHome() {
      this.isProfileShown = false;
      this.$router.push('/');
    },
    showClicked(id) {
      if (!this.clickCounter[id]) {
        this.clickCounter[id] = 1;
      }
      this.clickCounter[id] += 1;
      if (this.clickCounter[id] % 2 === 0) {
        switch (id) {
          case 'newfName':
            document.getElementById(id).innerHTML = `<input type="text" class="form-control"
                    placeholder="${this.users[this.currentUser].fName}"> `;
            break;
          case 'newlName':
            document.getElementById(id).innerHTML = `<input type="text" class="form-control"
                    placeholder="${this.users[this.currentUser].lName}"> `;
            break;
          case 'newUsername':
            document.getElementById(id).innerHTML = `<input type="text" class="form-control"
                    placeholder="${this.currentUser}"> `;
            break;
          case 'newPassword':
            document.getElementById(id).innerHTML = `<input type="text" class="form-control"
                    placeholder="${this.users[this.currentUser].password}"> `;
            break;
          default:
            break;
        }
      } else {
        switch (id) {
          case 'newfName':
            document.getElementById(id).innerHTML = `${this.users[this.currentUser].fName}`;
            break;
          case 'newlName':
            document.getElementById(id).innerHTML = `${this.users[this.currentUser].lName}`;
            break;
          case 'newUsername':
            document.getElementById(id).innerHTML = `${this.currentUser}`;
            break;
          case 'newPassword':
            document.getElementById(id).innerHTML = `${this.users[this.currentUser].password}`;
            break;
          default:
            break;
        }
      }
    },
    saveChanges() {
      this.newfName = document.getElementById('newfName').value;
      this.newlName = document.getElementById('newlName').value;
      this.newUsername = document.getElementById('newUsername').value;
      this.newPassword = document.getElementById('newPassword').value;
      console.log(this.newfName);
      console.log(this.newlName);
      console.log(this.newUsername);
      console.log(this.newPassword);

      if (this.newfName) {
        this.users[this.currentUser].fName = this.newfName;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
      if (this.newlName) {
        this.users[this.currentUser].lName = this.newlName;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
      if (this.newUsername) {
        this.currentUser = this.newUsername;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
      if (this.newPassword) {
        this.users[this.currentUser].password = this.newPassword;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    },
  },
};
</script>

<style>

</style>
