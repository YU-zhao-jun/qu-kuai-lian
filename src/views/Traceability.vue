<template>
  <div style="height: 300px">
    <div class="demo-input-suffix lookup">
      <span class="mr-10">产品溯源>></span>
      <el-row class="mr-20">
        <el-input
            class="w-50 m-2"
            placeholder="Traceable code"
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <Search/>
            </el-icon>
          </template>
        </el-input>
      </el-row>
      <el-button type="primary" plain>Look Up</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Traceability"
}
</script>

<style scoped>
.lookup {
  display: flex;
  width: 600px;
  margin: 40px 0 0 50px;
  align-items: center;
  font-weight: bold;
}

.lookup span {
  font-size: 20px;
  color: #303133;
}

.el-input {
  width: 300px;
}

</style>