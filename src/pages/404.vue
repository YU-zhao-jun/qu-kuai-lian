<template>
  <div class="container backdrop">
    <div class="Not">
      <img src="@/assets/images/404.gif" alt="NotFound">
      <br>
      <br>
      <el-button round @click="home" >返回首页</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "NotFound",
  methods: {
    home() {
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  text-align: center;
}

.Not {
  position: absolute;
  top: 60px;
}

img {
  width: 60%;
  height: 60%;
  border-radius: 20px;
}
</style>