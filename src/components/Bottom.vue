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
          <a href="#" class="fab fa-github mx-1 text-decoration-none"></a
          ><a href="#" class="fab fa-twitter mx-1 text-decoration-none"></a
          ><a href="#" class="fab fa-facebook-f mx-1 text-decoration-none"></a>
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
  props: {},
};
</script>
<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 15%;
  padding: 15px;
  background-color: rgb(184, 255, 255);
}
</style>
