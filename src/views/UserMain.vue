<template>
  <div class="Carousel">
    <el-carousel :interval="2000" arrow="always">
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
        <img v-bind:src="img.url" alt="轮播图" style="width: 100%; height: 100%">
      </el-carousel-item>
    </el-carousel>
  </div>

  <div class="text">
    <el-card class="box-card">
      <p>
        随着食品安全问题日益受到重视，食品安全溯源系统应运而生，它可以有效地帮助我们解决食品安全问题。</p>
      <br/>
      <p>
        食品安全溯源系统是通过利用互联网、大数据、物联网等技术，实现食品从出厂到消费者手中的完整溯源追溯。它可以帮助企业更好地控制食品安全，确保各环节的食品安全，减少食品安全事件的发生。</p>
      <br/>
      <p>此外，食品安全溯源系统还可以支持消费者对食品安全的实时监控，可以查看食品生产者的生产情况，可以查看食品从出厂到消费者手中的完整流程，从而确保食品安全。</p>
    </el-card>
    <br/>
  </div>

  <div>

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

.text {
  position: absolute;
  color: #409EFF;
  width: 35%;
  top: 125px;
  right: 40px;
}
</style>