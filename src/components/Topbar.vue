<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Home</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li>
              <router-link to="/categories" class="nav-link pb-1"
                >Categories</router-link
              >
            </li>
            <li>
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
  name: 'Topbar',
  props: {},
};
</script>
<style scoped lang="scss" >
.nav-link:hover,
.nav-link:focus,
.nav-link:active {
  border-bottom: 3px solid rgb(184, 255, 255);
}
</style>
