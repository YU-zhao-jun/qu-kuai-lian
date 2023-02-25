<template>
  <div class="container" style="line-height: 60px; display: flex;">


    <div style="flex: 1; line-height: 60px; width: 860px;">
      <el-breadcrumb separator="/"
                     style="display: inline-block; margin-left: 30px; font-size: 14px; letter-spacing: 2px;">
        <el-breadcrumb-item :to="'/'" @click="logout"><span style="color: white">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item><span style="color: white">{{ currentPathName }}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="User_xx">
      <span>{{Admin_login.admin_name}}</span>
    </div>

  </div>
</template>

<script>

export default {
  name: "AdminHeader",
  props: {
    collapseBtnClass: String,
    collapse: Boolean,
  },
  data() {
    return {
      isShow: true,
      currentPathName: "",
      Admin_login: localStorage.getItem("adminUser")?JSON.parse(localStorage.getItem("adminUser")):{},
    }
  },
  computed: {
    currentPathName() {
      return this.$store.state.currentPathName;　　//需要监听的数据
    }
  },
  watch: {
    currentPathName(newVal, oldVal) {
      console.log(newVal)
    }
  },
  methods: {
    logout() {
      this.$router.push("/")
      localStorage.removeItem("adminUser")
    }
  }
}
</script>

<style>

.User_xx {
  position: absolute;
  right: 0;
  width: 160px;
  line-height: 60px;
  text-align: center;
  font-size: 18px;
  color: white;
}

</style>