<template>
  <div class="container">
    <div class="login_text"><span>EnterpriseLogin</span></div>
    <el-tabs type="border-card" style="width: 100%; height: 100%">
      <el-tab-pane label="生产商">
        <div class="login_left" v-show="isShow">
          <el-form label-width="140px" :model="mfrs">
            <el-form-item label="账号">
              <el-input placeholder="Account" v-model="mfrs.manufacturer_account" style="width: 200px"/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input placeholder="Password" v-model="mfrs.manufacturer_password" show-password style="width: 200px"/>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input placeholder="Verification" style="width: 100px"/>
            </el-form-item>
          </el-form>
          <br/>
          <el-button type="primary" round @click="mfrs_login">--&nbsp;&nbsp;登&nbsp;&nbsp;录&nbsp;&nbsp;--</el-button>
        </div>
        <div class="login_right" v-show="isShow">
          <el-link type="primary" class="m_register" @click="changeToRegister">
            No account, go to register now!
          </el-link>
        </div>
        <div v-show="!isShow">
          <el-form label-width="140px">
            <el-form-item label="账号">
              <el-input placeholder="Account" style="width: 200px"/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input placeholder="Password" show-password style="width: 200px"/>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input placeholder="Confirm Password" show-password style="width: 200px"/>
            </el-form-item>
            <el-form-item label="营业证件" style="position: absolute; top: 65px; left: 380px">
            <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" alt=""/>
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            </el-form-item>
            <el-row>
              <el-form-item label="名称">
                <el-input placeholder="Name" style="width: 200px"/>
              </el-form-item>
              <el-form-item label="类型">
                <el-select  placeholder="Type" style="width: 200px">
                  <el-option label="蔬菜" value="shucai" />
                  <el-option label="水果" value="shuiguo" />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="电话">
                <el-input placeholder="Phone" style="width: 200px"/>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input placeholder="Email" style="width: 200px"/>
              </el-form-item>
            </el-row>
            <el-form-item label="地址">
              <el-input placeholder="Address" style="width: 540px"/>
            </el-form-item>
          </el-form>
          <el-link type="primary" @click="changeToLogin">
            You have an account, go to log in now!
          </el-link>

        </div>
      </el-tab-pane>
      <el-tab-pane label="经销商">Config</el-tab-pane>
      <el-tab-pane label="零售商">Role</el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import {Plus} from "@element-plus/icons-vue";

export default {
  name: "EnterpriseLogin",
  components: {
    Plus,
  },
  data() {
    return {
      isShow: true,
      mfrs: {},
    }
  },
  methods: {
    changeToRegister() {
      this.isShow = !this.isShow
    },
    changeToLogin() {
      this.isShow = !this.isShow
    },
    mfrs_login(){
      this.request.post("/mfrsUser/login",this.mfrs).then(res => {
        console.log(this.mfrs)
        if(!res){
          this.$message.error("错误")
        }else {
          this.$router.push("/ManufacturerManage")
        }
      })
    },
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 800px;
  height: 400px;
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: 0 0.9rem 1.7rem rgb(0 0 0 / 25%), 0 0.7rem 0.7rem rgb(0 0 0 / 22%);
  background-color: white;
  background-size: cover;
  justify-content: center;
  overflow: hidden;
}

.login_text {
  position: absolute;
  display: flex;
  width: 160px;
  margin-top: 5px;
  right: 50px;
  color: #409EFF;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 30px;
  z-index: 999;
}

.login_left {
  position: relative;
  width: 468px;
  height: 320px;
  float: left;
  padding-top: 60px;
  text-align: center;
}

.login_right {
  position: relative;
  width: 300px;
  height: 320px;
  float: right;
  text-align: center;
  background-image: url("@/assets/images/elogin.png");
}

.m_register {
  position: relative;
  top: 280px;
  right: 80px;
}

.avatar-uploader, .avatar {
  position: absolute;
  width: 120px;
  height: 120px;
  display: flex;
  /*top: 20px;*/
  /*left: 520px;*/
  border: 1px dashed var(--el-border-color);
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}

</style>