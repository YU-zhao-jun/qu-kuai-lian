<template>
  <div class="Carousel">
    <el-carousel :interval="2000" arrow="always">
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
        <img v-bind:src="img.url" alt="轮播图" style="width: 100%; height: 100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

export default {
  name: "UserMain",
  components: {},
  data() {
    return {
      imgList: [
        {url: require("@/assets/images/Carousel001.jpeg")},
        {url: require("@/assets/images/Carousel002.jpeg")},
        {url: require("@/assets/images/Carousel003.jpeg")},
        {url: require("@/assets/images/Carousel004.jpeg")}
      ]
    }
  }
}
</script>

<style scoped>

  .Carousel {
    width: 600px;
    margin: 30px 50px;
    box-shadow: 1px 1px 5px #868686b1;
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>