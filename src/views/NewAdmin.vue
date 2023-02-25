<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <span class="info_font">个人信息</span>
    </div>
    <el-card class="box-card" style="margin: 20px auto;width: 90%; height: 85%">
      <el-divider content-position="left"><span style="font-size: 14px">ADMIN INFORMATION</span></el-divider>
      <el-form :model="form" label-width="120px">
        <el-form-item label="账号" prop="admin_account">
          <el-input v-model="form.admin_account" autocomplete="off" style="width: 340px" :disabled="true"/>
        </el-form-item>
        <el-form-item label="姓名" prop="admin_account">
          <el-input v-model="form.admin_name" autocomplete="off" style="width: 340px"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" autocomplete="off" style="width: 340px" show-password/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" autocomplete="off" style="width: 340px" show-password/>
        </el-form-item>
        <el-form-item label="描述" prop="menu_description">
          <el-input v-model="form.menu_description" autocomplete="off" style="width: 340px"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 100px" round @click="save">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "NewAdmin",
  components: {},
  data() {
    return {
      User: localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : {},
      form: {},
    }
  },
  created() {
    this.getUser().then(res => {
      this.form = res
    })
  },
  methods: {
    async getUser() {
      return (await this.request.get("/admin/" + this.User.id)).data
    },
    save() {
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.$message.error("2次输入的新密码不相同")
        return false
      }else {
        this.form.admin_password =this.form.newPassword
        this.request.post("/admin", this.form).then(res => {
          if (res.code === '200') {
            this.$message.success("修改成功，请重新登录")
            this.$store.commit("logout")
          } else {
            this.$message.error("保存失败")
          }
        })
      }
    },
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  text-align: center;
}


</style>