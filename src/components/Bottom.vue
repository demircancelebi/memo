<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <h5>
            Contact
            <hr />
          </h5>
        </div>
        <div class="col-4">
          <a href="#">
            <span
              class="icon-design fab fa-github mx-1 text-decoration-none"
            ></span></a
          ><a href="#"
            ><span
              class="icon-design fab fa-twitter mx-1 text-decoration-none"
            ></span></a
          ><a href="#"
            ><span
              class="icon-design fab fa-facebook-f mx-1 text-decoration-none"
            ></span
          ></a>
          <hr />
        </div>
        <div class="col-4">
          <h5>Developed by <i>Hack Study Group</i></h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Bottom',
};
</script>
<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 10%;
  padding: 15px;
  background-color: rgb(247, 247, 247);
}
.icon-design:hover {
  color: rgb(33, 37, 41);
}
</style>
