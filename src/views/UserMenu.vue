<template>
  <div class="container">
    <el-menu
        default-active="0"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        router
    >
      <div class="logo">
        <a href="/AdminLogin">
          <img src="@/assets/images/logo.png" alt="LOGO">
          <span>产品溯源平台</span>
        </a>
      </div>
      <div class="flex-grow"/>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="Traceability">产品溯源</el-menu-item>
      <el-menu-item index="Settlement">企业入驻</el-menu-item>
      <el-menu-item index="AboutUs">关于我们</el-menu-item>
      <el-menu-item index="EnterpriseLogin">企业登录</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "UserMenu"
}
</script>

<style>
.container {
  width: 100%;
}

.logo a {
  display: flex;
  margin-left: 60px;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #409EFF;
}

.flex-grow {
  flex-grow: 1;
}

.el-menu .el-sub-menu, .el-menu--popup {
  min-width: 80px !important;
}
</style>
