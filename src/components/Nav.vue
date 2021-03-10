<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Home</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <router-link to="/categories" class="nav-link pb-1"
              >Categories</router-link
            >
            <li class="nav-item">
              <router-link to="/questions" class="nav-link pb-1"
                >Questions</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Nav',
  props: {
    msg: String,
  },
};
</script>
<style scoped lang="scss" >
.nav-link:hover,
.nav-link:focus,
.nav-link:active {
  border-bottom: 3px solid rgb(184, 255, 255);
}
</style>
