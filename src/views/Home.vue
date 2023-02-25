<template>
  <div class="backdrop common-layout">
      <el-container>
        <el-header style="width: 100%;padding: 0 0">
          <UserMenu />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </div>
</template>
<script>

import UserMenu from "@/views/UserMenu";

export default {
  name: 'HomeView',
  components: {
    UserMenu,
  },
}
</script>
<style>

</style>