<template>
  <div class="profile">
    <h4>My Profile</h4>
    <div class="row mt-4">
      <div class="col-1"></div>
      <div class="col-3">
        <p id="myImg" class="text-start">
          <img :src="profileImg" class="profileImg">
        </p>
        <p class="text-start fname-lname">
          {{ users[currentUser].fName }}
          {{ users[currentUser].lName }}</p>
        <p class="text-start username">
          {{ users[currentUser].username }}</p>
          <div class="d-grid gap-2 col-9">
            <button id="myButton"
            class="btn btn-dark edit-profile-btn">
              Change profile picture
            </button>
          </div>
      </div>
      <div class="col-5">
        <div class="row mt-4" v-for="attribute in attributes"
        :key="attribute">
            <div class="col-3 text-start">
                <b>{{ attributeLabels[attribute] }}</b>
            </div>
            <div v-if="isAttributeHidden[attribute]" class="col text-start">
                {{ users[currentUser][attribute] }}
            </div>
            <input v-if="!isAttributeHidden[attribute]" type="text" class="col form-control"
            :placeholder="users[currentUser][attribute]" v-model="newInput[attribute]">
            <div class="col text-start">
                <button @click="clicked(attribute)" class="btn btn-outline-dark">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        </div>
        <div class="row mt-4">
          <div class="d-grid gap-2 col-9">
            <button class="btn btn-outline-dark" @click="saveChanges">
                Save changes
            </button>
          </div>
          <div v-if="showInfoMessage" class="col-9 mt-4 error-message">
            {{ message }}
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      users: {},
      attributes: [],
      attributeLabels: {},
      isAttributeHidden: {},
      newInput: {},
      infoMessages: {
        usernameErr: 'Username already taken.',
        saveSuccess: 'Successfully saved!',
      },
      message: null,
      showInfoMessage: false,
      currentUser: null,
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
    this.getAttributes();
  },
  computed: {
    profileImg() {
      if (this.users[this.currentUser].img) {
        return this.users[this.currentUser].img;
      }
      return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    },
  },
  methods: {
    getAttributes() {
      this.attributes = Object.keys(this.users[this.currentUser]);
      this.attributes.pop('img');
      this.attributeLabels = {
        username: 'Username: ',
        fName: 'First name: ',
        lName: 'Last name: ',
        password: 'Password: ',
      };
      for (let i = 0; i < this.attributes.length; i += 1) {
        this.isAttributeHidden[this.attributes[i]] = true;
        this.newInput[this.attributes[i]] = '';
      }
    },
    clicked(attribute) {
      const isHidden = this.isAttributeHidden[attribute];
      if (isHidden) {
        this.isAttributeHidden[attribute] = false;
      } else {
        this.newInput[attribute] = '';
        this.isAttributeHidden[attribute] = true;
      }
    },
    saveChanges() {
      for (let i = 0; i < this.attributes.length; i += 1) {
        const attribute = this.attributes[i];
        if (this.newInput[attribute]) {
          if (attribute === 'username') {
            const usernames = Object.keys(this.users);
            for (let j = 0; j < usernames.length; j += 1) {
              if (this.newInput[attribute] === usernames[j]
              && this.newInput[attribute] !== this.currentUser) {
                this.showMessages('usernameErr');
                return;
              }
            }
            const oldCurrentUser = this.currentUser;
            this.currentUser = this.newInput[attribute];
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.users[this.currentUser] = this.users[oldCurrentUser];
            delete this.users[oldCurrentUser];
          }
          this.users[this.currentUser][this.attributes[i]] = this.newInput[this.attributes[i]];
          this.clicked(this.attributes[i]);
          localStorage.setItem('users', JSON.stringify(this.users));
          this.showMessages('saveSuccess');
          window.setTimeout(this.saveSuccess, 3000);
        }
        this.isAttributeHidden[attribute] = true;
      }
    },
    showMessages(messageType) {
      this.showInfoMessage = true;
      this.message = this.infoMessages[messageType];
    },
    saveSuccess() {
      this.showInfoMessage = false;
      window.location.reload();
    },
  },
};
</script>

<style>
.error-message {
    font-size: 85%;
    color:red;
}
</style>
