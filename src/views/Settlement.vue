<template>
  <div class="syuan">
    <img src="@/assets/images/syuan.png" alt="系统结构图" style="width: 100%; height: 100%">
  </div>

  <div class="text">
    <el-card class="box-card">
      <p>
        随着食品安全事件的屡次发生，溯源系统在食品安全领域受到了大家的广泛关注。企业入驻溯源系统后，可以将所有的产品材料追溯到原始种植或生产地，以确保食品安全。</p>
      <br/>
      <p>
        企业入驻溯源系统的第一步是正式注册，确认企业名称、企业地址、经营范围等信息，完成企业资质审核，确保企业资质符合国家和行业规定。</p>
    </el-card>
    <br/>
    <el-card class="box-card">
      <p>
        入驻溯源系统后，企业需要完善自身的信息管理系统，将原料采购、生产、加工、运输、销售等环节的实时信息全部录入溯源系统中，以实现对食品从原料到成品的完整追溯。</p>
      <br/>
      <p>此外，企业还可以在溯源系统中与相关企业建立联系，实现信息共享，深入探讨食品安全问题，提高食品安全保障水平。</p>
    </el-card>
    <br/>
    <el-card class="box-card">
      <p>
        企业入驻溯源系统，可以有效保障食品安全，增强消费者对食品质量和安全的认可，是任何食品企业值得考虑的一项重要举措。</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Settlement"
}
</script>

<style scoped>
.syuan {
  width: 45%;
  height: 400px;
  margin-top: 40px;
  margin-left: 40px;
  border: 1px solid #86aef6;
}

.text {
  position: absolute;
  color: #409EFF;
  width: 45%;
  top: 100px;
  right: 40px;
}


</style>