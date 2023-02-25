<template>
  <div class="backdrop">
    <div class="container">
      <!--    登录 -->
      <div class="login_box" v-show="isShow">
        <div class="login_text">
          <h2>Login</h2>
          <hr style="color: rgb(30,225,225);border-style:double; width: 325px;margin-top: 5px">
          <el-form label-width="80px" :rules="rules" :model="Admin_login" ref="loginFrom">
            <el-form-item label="账号" prop="Account">
              <el-input size="default" :prefix-icon="User" placeholder="Account"
                        style="width: 160px" v-model="Admin_login.admin_account"/>
            </el-form-item>
            <el-form-item label="密码" prop="Password">
              <el-input size="default" :prefix-icon="Lock" show-password placeholder="Password"
                        style="width: 160px" v-model="Admin_login.admin_password"/>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input size="default" style="width: 80px"/>
            </el-form-item>
            <el-link type="primary">Forgot your password?</el-link>
            <br/>
            <el-form-item>
              <el-button type="primary" round @click="login()">--&nbsp;&nbsp;登&nbsp;&nbsp;录&nbsp;&nbsp;--</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="changeToLogin" v-show="isShow">
          <el-button type="success" plain @click="changeToRegister">没有账户？点击注册</el-button>
        </div>
      </div>

      <!--    注册-->
      <div class="register_box" v-show="!isShow">
        <div class="changeToRegister" v-show="!isShow">
          <el-button type="success" plain @click="changeToLogin">已有账户？点击登录</el-button>
        </div>
        <div class="register_text">
          <h2>Register</h2>
          <hr size=2 style="color: rgb(30,225,225);border-style:double; width: 325px;margin-top: 5px">
          <el-form label-width="80px" :rules="rules" :model="Admin_register" ref="registerFrom">
            <el-form-item label="姓名" prop="Name">
              <el-input size="default" :prefix-icon="Star" placeholder="Name"
                        style="width: 160px" v-model="Admin_register.admin_name"/>
            </el-form-item>
            <el-form-item label="账号" prop="Account">
              <el-input size="default" :prefix-icon="User" placeholder="Account"
                        style="width: 160px" v-model="Admin_register.admin_account"/>
            </el-form-item>
            <el-form-item label="密码" prop="Password">
              <el-input size="default" :prefix-icon="Lock" placeholder="Password" show-password
                        style="width: 160px" v-model="Admin_register.admin_password"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="ConfirmPassword">
              <el-input size="default" :prefix-icon="Lock" placeholder="Confirm Password" show-password
                        style="width: 160px" v-model="Admin_register.admin_confirmpassword"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="register()">--&nbsp;&nbsp;注&nbsp;&nbsp;册&nbsp;&nbsp;--</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>


<script>

import {User, Lock, Star} from '@element-plus/icons-vue'


export default {
  name: "AdminLogin",
  components: {},
  data() {
    return {
      isShow: true,
      Admin_login: {},
      Admin_register: {},
      loginFrom: {},
      registerFrom: {},
      User: User,
      Lock: Lock,
      Star: Star,
      rules: {
        // Name: [
        //   {required: true, message: '请输入姓名', trigger: 'blur'},
        //   {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        // ],
        // Account: [
        //   {required: true, message: '请输入账号', trigger: 'blur'},
        //   {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}
        // ],
        // Password: [
        //   {required: true, message: '请输入密码', trigger: 'blur'},
        //   {min: 5, max: 20, message: '请输入5-20个字符', trigger: 'blur'},
        // ],
        // ConfirmPassword: [
        //   {required: true, message: '请输入密码', trigger: 'blur'},
        //   {min: 5, max: 20, message: '请输入5-20个字符', trigger: 'blur'},
        // ],
      },
    }
  },
  methods: {
    changeToRegister() {
      this.isShow = !this.isShow
    },
    changeToLogin() {
      this.isShow = !this.isShow
    },
    login() {
      this.$refs['loginFrom'].validate((valid) => {
        if (valid) {
          this.request.post("/admin/login", this.Admin_login).then(res => {
            if (res.code === '200') {
              localStorage.setItem("adminUser", JSON.stringify(res.data))//存储用户信息到浏览器
              this.$router.push("/AdminManage")
              this.$message.success("登录成功")
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false;
        }
      });
    },
    register() {
      this.$refs['registerFrom'].validate((valid) => {
        if (valid) {
          if (this.Admin_register.admin_password !== this.Admin_register.admin_confirmpassword) {
            this.$message.error("两次输入密码不一致")
            return false
          }
          this.request.post("/admin/register", this.Admin_register).then(res => {
            console.log(this.Admin_register)
            if (res.code === '200') {
              this.isShow = !this.isShow
              this.$message.success("注册成功,请登录")
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false;
        }
      })
    },
  }
}
</script>

<style scoped>
.backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
}

.container {
  position: relative;
  width: 650px;
  height: 400px;
  margin: 60px auto;
  border-radius: 20px;
  box-shadow: 0 0.9rem 1.7rem rgb(0 0 0 / 25%), 0 0.7rem 0.7rem rgb(0 0 0 / 22%);
  background-color: white;
  background-size: cover;
  justify-content: center;
  overflow: hidden;
}

.login_box {
  display: flex;
  width: 650px;
  height: 400px;
  background-image: url("@/assets/images/UserLogin.jpg");
  background-size: cover;
}

.login_text {
  width: 325px;
  margin-top: 30px;
  text-align: center;
}

.changeToLogin {
  width: 325px;
  margin-top: 180px;
  text-align: center;
}

.register_box {
  display: flex;
  width: 650px;
  height: 400px;
  background-image: url("@/assets/images/UserRegister.jpg");
  background-size: cover;
}


.register_text {
  width: 325px;
  margin-top: 40px;
  text-align: center;
}

.changeToRegister {
  width: 325px;
  margin-top: 180px;
  text-align: center;
}

h2 {
  color: #409EFF;
  font-size: 30px;
}

.el-form {
  margin: 30px;
}

.el-link {
  margin: 0 -100px 20px 0;
  font-size: 6px;
}


</style>