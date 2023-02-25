<template>
  <div class="backdrop common-layout">
      <el-container>
        <el-header style="width: 100%;padding: 0 0">
          <UserMenu />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer style="margin-top: 60px; width: 100%;padding: 0 0">
          <Footer />
        </el-footer>
      </el-container>
    </div>
</template>
<script>

import UserMenu from "@/views/UserMenu";
import Footer from "@/views/Footer";

export default {
  name: 'HomeView',
  components: {
    Footer,
    UserMenu,
  },
}
</script>
<style>

</style>