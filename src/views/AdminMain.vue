<template>
  <div class="container backdrop">
    <br />
    <el-card class="box-card" style="margin: 0 auto;width: 90%; height: 90%">
      <h2 style="color: #409EFF">欢迎--
        <span>{{User.admin_name || User.manufacturer_name || User.distributor_name || User.retailer_name}}</span>
      --使用食品安全溯源系统
      </h2>
      <el-divider content-position="right"><span style="font-size: 16px">Food safety traceability</span></el-divider>
      <h3>全过程质量监测，可以买得更放心，吃得更安心更健康，从源头上解决食品安全问题</h3>
      <br />
      <p>溯源体系是指采集记录产品生产、流通、消费等环节信息，
        实现来源可查、去向可追、责任可究，强化全过程质量安全管理与风险控制的有效措施，
        以确保食品的安全，保障消费者的权益。</p>
      <br />
      <p><b>轻便快捷</b>——食品安全溯源平台汇集多品类追溯方案，每一个追溯方案可以自定义溯源节点，快速搭建企业追溯系统</p>
      <br />
      <p><b>质量提升</b>——平台具备企业内部溯源管理、物流管理、生产管理功能，帮助企业提升管理，建设有效的企业追溯体系</p>
      <br />
      <p><b>精准管理</b>——溯源系统可以帮助企业实现产品防伪验真、防串货、营销推广、优质渠道对接、销售数据分析等功能</p>
      <br />
      <el-divider content-position="right"><span style="font-size: 16px">增强消费者的信任，扩大用户来源，推动消费者再次购买</span></el-divider>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AdminMain",
  data() {
    return {
      Name: "",
      User: localStorage.getItem("User")?JSON.parse(localStorage.getItem("User")):{},
    }
  },

}
</script>

<style scoped>
.container {
  margin: 0 auto;
}
</style>