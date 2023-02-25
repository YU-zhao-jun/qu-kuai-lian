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
      <el-scrollbar height="80%">
        <div v-for="item in menus" :key="item.id">
          <div v-if="item.path">
            <el-menu-item :index="item.path">
              <template #default>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span style="margin-left: 26px">{{ item.name }}</span>
              </template>
            </el-menu-item>
          </div>
          <div v-else>
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span style="margin-left: 26px">{{ item.name }}</span>
              </template>
              <div v-for="subItem in item.children" :key="subItem.id">
                <el-menu-item :index="subItem.path">
                  <template #title>
                    <el-icon>
                      <component :is="subItem.icon"></component>
                    </el-icon>
                    <span style="margin-right: 30px">{{ subItem.name }}</span>
                  </template>
                </el-menu-item>
              </div>
            </el-sub-menu>
          </div>
        </div>
        <el-menu-item index="#" @click="logout">
          <template #default>
            <el-icon>
              <Loading/>
            </el-icon>
            <span style="margin-left: 26px">退出系统</span>
          </template>
        </el-menu-item>
      </el-scrollbar>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: "Menu",
  components: {},
  data() {
    return {
      menus: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")) : [],
    }
  },
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
  methods: {
    logout() {
      this.$store.commit("logout")
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