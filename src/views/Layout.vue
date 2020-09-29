<template>
  <div class="layout">
    <Header />
    <NavBar />
    <Center />
  </div>
</template>

<script>
import Header from "../views/Header.vue";
import NavBar from "../views/NavBar.vue";
import Center from "../views/Center.vue";
export default {
  name: "Layout",
  components: {
    Header,
    NavBar,
    Center
  }
};
</script>
<style>
.header {
  position: absolute;
  line-height: 50px;
  padding: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #2d3a4b;
}
.nav {
  position: absolute;
  width: 230px;
  top: 50px;
  left: 0px;
  bottom: 0px;
  overflow-y: auto;
  background-color: #545c64;
  text-align: left;
}
.center {
  position: absolute;
  line-height: 100px;
  left: 230px;
  top: 50px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
  padding: 10px;
  background-color:white;
}
</style>
