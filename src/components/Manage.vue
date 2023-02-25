<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="sideWidth + 'px'">
        <Menu :isCollapse="isCollapse"></Menu>
      </el-aside>

      <el-container>
        <el-header>
          <div @click="collapse" style="cursor: pointer; line-height: 60px; align-items: center; margin-top: 8px">
            <el-icon v-show="isShow"><Fold /></el-icon>
            <el-icon v-show="!isShow"><Expand /></el-icon>
          </div>
          <Header />
        </el-header>

        <el-main>
<!--          当前页面的子路由会在router-view展示-->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import {Expand, Fold} from "@element-plus/icons-vue";

export default {
  name: "Manage",
  components: {
    Header,
    Menu,
    Fold,
    Expand
  },
  data() {
    return {
      isShow: true,
      isCollapse: false,
      sideWidth: 200,
    }
  },
  methods: {
    // 点击收缩按钮触发
    collapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.sideWidth = 60
        this.isShow = false
      } else {
        this.sideWidth = 200
        this.isShow = true
      }
    }
  }
}
</script>

<style scoped>
.el-header {
  display: flex;
  height: 60px;
  background-color: #303133;
  align-items: center;
}

.el-icon {
  margin-left: 5px;
  color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>