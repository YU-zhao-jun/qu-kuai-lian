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
      <span>{{User.admin_name || User.manufacturer_name || User.distributor_name || User.retailer_name}}</span>
    </div>

  </div>
</template>

<script>

export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse: Boolean,
  },
  data() {
    return {
      isShow: true,
      currentPathName: "",
      User: localStorage.getItem("User")?JSON.parse(localStorage.getItem("User")):{},
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
      this.$store.commit("logout")
      localStorage.removeItem("adminUser")
    }
  }
}
</script>

<style>

.User_xx {
  position: absolute;
  padding-right: 30px;
  right: 0;
  width: 300px;
  line-height: 60px;
  text-align: right;
  font-size: 18px;
  color: white;
}

</style>