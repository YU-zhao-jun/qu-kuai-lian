<template>
  <div class="container">
    <el-menu
        active-text-color="#409EFF"
        background-color="#303133"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
        :collapse-transition="false"
        :collapse="isCollapse"
        style="height: 100vh; box-shadow: 2px 0 6px rgb(0 21 41 / 35%)"
        router
    >
      <div class="logo_text">
        <a href="#">
          <img src="../assets/images/logoMin.png" alt="logo">
        </a>
        <b class="logo_font">产品溯源</b>
      </div>

      <el-menu-item index="AdminMain">
        <el-icon>
          <House />
        </el-icon>
        <span style="margin-left: 26px">数据详情</span>
      </el-menu-item>
      <el-sub-menu index="Manage">
        <template #title>
          <el-icon>
            <Connection/>
          </el-icon>
          <span>企业管理</span>
        </template>
        <div class="min-menu">
          <el-menu-item index="mfrsUser"><span>生产商</span></el-menu-item>
          <el-menu-item index="2-2"><span>经销商</span></el-menu-item>
          <el-menu-item index="2-3"><span>零售商</span></el-menu-item>
        </div>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <Document/>
          </el-icon>
          <span>权限管理</span>
        </template>
        <div class="min-menu">
          <el-menu-item index="mfrsMenu"><span>生产商</span></el-menu-item>
          <el-menu-item index="3-2"><span>经销商</span></el-menu-item>
          <el-menu-item index="3-3"><span>零售商</span></el-menu-item>
        </div>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <setting/>
          </el-icon>
          <span>菜单管理</span>
        </template>
        <div class="min-menu">
          <el-menu-item index="1-1"><span>生产商</span></el-menu-item>
          <el-menu-item index="1-2"><span>经销商</span></el-menu-item>
          <el-menu-item index="1-3"><span>零售商</span></el-menu-item>
        </div>
      </el-sub-menu>
      <el-menu-item index="/">
        <el-icon><Loading /></el-icon>
        <span style="margin-left: 26px" @click="logout">退出系统</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {
  House,
  Document,
  Connection,
  Location,
  Setting,
  Loading
} from '@element-plus/icons-vue'

export default {
  name: "AdminMenu",
  components: {
    House,
    Document,
    Connection,
    Location,
    Setting,
    Loading
  },
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
  methods: {
    logout() {
      this.$router.push("/AdminLogin")
      localStorage.removeItem("adminUser")
      this.$message.success("退出成功")
    }
  }
}
</script>

<style scoped>
.container {
  overflow: hidden;
  text-align: center;
}

.logo_text {
  height: 80px;
  display: flex;
  padding: 22px 20px;
}

.logo_text a {
  margin-top: -4px;
  margin-left: -4px;
  margin-right: 14px;
}

span {
  margin: 0 auto;
  text-align: center;
}

</style>