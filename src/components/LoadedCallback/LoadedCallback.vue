<template>
   <div class="spinner">
      <img src="/static/img/loading.svg" alt="loading"/>
   </div>
</template>

<script>
export default {
  name: "callback",
  data() {
    return {};
  }
};
</script>

<style>
.spinner {
  position: absolute;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>