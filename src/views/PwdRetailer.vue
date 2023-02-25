<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <span class="info_font">个人信息</span>
    </div>
    <el-card class="box-card" style="margin: 20px auto;width: 90%; height: 85%">
      <el-divider content-position="left"><span style="font-size: 14px">RETAILER PASSWORD</span></el-divider>
      <el-form :model="form" label-width="120px" :rules="rules" ref="newPwd">
        <el-form-item label="账号" prop="retailer_account">
          <el-input v-model="form.retailer_account" autocomplete="off" style="width: 280px" :disabled="true"/>
        </el-form-item>
        <el-form-item label="名称" prop="retailer_name">
          <el-input v-model="form.retailer_name" autocomplete="off" style="width: 280px" :disabled="true"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" autocomplete="off" show-password style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" autocomplete="off" show-password style="width: 280px"></el-input>
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
  name: "PwdRetailer",
  components: {},
  data() {
    return {
      User: localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : {},
      form: {},
      rules: {
        newPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 20, message: '请输入5-20个字符', trigger: 'blur'},
        ],
        confirmPassword: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {min: 5, max: 20, message: '请输入5-20个字符', trigger: 'blur'},
        ],
      },
      newPwd: {},
    }
  },
  created() {
    this.getUser().then(res => {
      this.form = res
    })
  },
  methods: {
    async getUser() {
      return (await this.request.get("/retailer/" + this.User.id)).data
    },
    save() {
      this.$refs['newPwd'].validate((valid) => {
        if (valid) {
          if (this.form.newPassword !== this.form.confirmPassword) {
            this.$message.error("2次输入的新密码不相同")
            return false
          }
          this.request.post("/retailer/password", this.form).then(res => {
            if (res.code === '200') {
              this.$message.success("修改成功，请重新登录")
              this.$store.commit("logout")
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
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