<template>
  <div class="home">
    <div class="container">
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
  data() {
    return {
    };
  },
};
</script>

<style>

</style>
