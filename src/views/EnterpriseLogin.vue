<template>
  <div class="container">
    <div class="login_text"><span>EnterpriseLogin</span></div>
    <el-tabs type="border-card" style="width: 100%; height: 100%">
      <el-tab-pane label="生产商">
        <div class="login_left" v-show="isShow">
          <el-form
            label-width="140px"
            :rules="rules"
            :model="manufacturer"
            ref="manufacturerLogin"
          >
            <el-form-item label="账号" prop="manufacturer_account">
              <el-input
                size="default"
                :prefix-icon="User"
                placeholder="Account"
                v-model="manufacturer.manufacturer_account"
                style="width: 200px"
              />
            </el-form-item>
            <el-form-item label="密码" prop="manufacturer_password">
              <el-input
                size="default"
                :prefix-icon="Lock"
                show-password
                placeholder="Password"
                v-model="manufacturer.manufacturer_password"
                style="width: 200px"
              />
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input
                size="default"
                type="text"
                auto-complete="false"
                v-model="manufacturer.code"
                style="width: 80px"
              >
              </el-input>
              <el-image
                class="codeImg"
                :src="manufacturerImg"
                @click="resetImg"
              ></el-image>
            </el-form-item>
            <span style="font-size: 4px; color: #606266"
              >点击图片更换验证码</span
            >
          </el-form>
          <br /><br />
          <el-button type="primary" round @click="manufacturer_login"
            >--&nbsp;&nbsp;登&nbsp;&nbsp;录&nbsp;&nbsp;--
          </el-button>
        </div>
        <div class="login_right" v-show="isShow">
          <el-link type="primary" class="m_register" @click="changeToRegister">
            No account, go to register now!
          </el-link>
        </div>

        <div v-show="!isShow">
          <el-form
            label-width="140px"
            :rules="rules"
            :model="manufacturer"
            ref="manufacturerRegister"
          >
            <el-form-item label="名称" prop="manufacturer_name">
              <el-input
                size="default"
                :prefix-icon="User"
                placeholder="Name"
                style="width: 340px"
                v-model="manufacturer.manufacturer_name"
              />
            </el-form-item>
            <el-form-item label="密码" prop="manufacturer_password">
              <el-input
                size="default"
                :prefix-icon="Lock"
                placeholder="Password"
                show-password
                style="width: 200px"
                v-model="manufacturer.manufacturer_password"
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                size="default"
                :prefix-icon="Lock"
                placeholder="Confirm Password"
                show-password
                style="width: 200px"
                v-model="manufacturer.confirmPassword"
              />
            </el-form-item>
            <el-form-item
              label="营业证件"
              style="position: absolute; top: 60px; left: 376px"
            >
              <el-upload
                class="avatar-uploader"
                action="http://localhost:9090/files/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="类型" prop="manufacturer_type">
              <el-input
                size="default"
                :prefix-icon="Switch"
                placeholder="Type"
                style="width: 200px"
                v-model="manufacturer.manufacturer_type"
              />
            </el-form-item>
            <el-row>
              <el-form-item
                size="default"
                label="电话"
                prop="manufacturer_phone"
              >
                <el-input
                  :prefix-icon="Phone"
                  placeholder="Phone"
                  style="width: 200px"
                  v-model="manufacturer.manufacturer_phone"
                />
              </el-form-item>
              <el-form-item
                size="default"
                label="邮箱"
                prop="manufacturer_email"
              >
                <el-input
                  :prefix-icon="Message"
                  placeholder="Email"
                  style="width: 200px"
                  v-model="manufacturer.manufacturer_email"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="地址" prop="manufacturer_address">
                <el-input
                  size="default"
                  :prefix-icon="Location"
                  placeholder="Address"
                  style="width: 340px"
                  v-model="manufacturer.manufacturer_address"
                />
              </el-form-item>
              <el-button
                type="primary"
                round
                @click="manufacturer_register"
                style="margin-left: 60px"
              >
                --&nbsp;&nbsp;注&nbsp;&nbsp;册&nbsp;&nbsp;--
              </el-button>
            </el-row>
          </el-form>
          <el-link type="primary" @click="changeToLogin">
            You have an account, go to log in now!
          </el-link>
        </div>
      </el-tab-pane>

      <el-tab-pane label="经销商">
        <div class="login_left" v-show="isShow">
          <el-form
            label-width="140px"
            :rules="rules"
            :model="distributor"
            ref="distributorLogin"
          >
            <el-form-item label="账号" prop="distributor_account">
              <el-input
                size="default"
                :prefix-icon="User"
                placeholder="Account"
                v-model="distributor.distributor_account"
                style="width: 200px"
              />
            </el-form-item>
            <el-form-item label="密码" prop="distributor_password">
              <el-input
                size="default"
                :prefix-icon="Lock"
                show-password
                placeholder="Password"
                v-model="distributor.distributor_password"
                style="width: 200px"
              />
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input
                size="default"
                type="text"
                auto-complete="false"
                v-model="distributor.code"
                style="width: 80px"
              >
              </el-input>
              <el-image
                class="codeImg"
                :src="distributorImg"
                @click="resetImg"
              ></el-image>
            </el-form-item>
            <span style="font-size: 4px; color: #606266"
              >点击图片更换验证码</span
            >
          </el-form>
          <br /><br />
          <el-button type="primary" round @click="distributor_login"
            >--&nbsp;&nbsp;登&nbsp;&nbsp;录&nbsp;&nbsp;--
          </el-button>
        </div>
        <div class="login_right" v-show="isShow">
          <el-link type="primary" class="m_register" @click="changeToRegister">
            No account, go to register now!
          </el-link>
        </div>

        <div v-show="!isShow">
          <el-form
            label-width="140px"
            :rules="rules"
            :model="distributor"
            ref="distributorRegister"
          >
            <el-form-item label="名称" prop="distributor_name">
              <el-input
                size="default"
                :prefix-icon="User"
                placeholder="Name"
                style="width: 340px"
                v-model="distributor.distributor_name"
              />
            </el-form-item>
            <el-form-item label="密码" prop="distributor_password">
              <el-input
                size="default"
                :prefix-icon="Lock"
                placeholder="Password"
                show-password
                style="width: 200px"
                v-model="distributor.distributor_password"
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                size="default"
                :prefix-icon="Lock"
                placeholder="Confirm Password"
                show-password
                style="width: 200px"
                v-model="distributor.confirmPassword"
              />
            </el-form-item>
            <el-form-item
              label="营业证件"
              style="position: absolute; top: 60px; left: 376px"
            >
              <el-upload
                class="avatar-uploader"
                action="http://localhost:9090/files/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="类型" prop="distributor_type">
              <el-input
                size="default"
                :prefix-icon="Switch"
                placeholder="Type"
                style="width: 200px"
                v-model="distributor.distributor_type"
              />
            </el-form-item>
            <el-row>
              <el-form-item
                size="default"
                label="电话"
                prop="distributor_phone"
              >
                <el-input
                  :prefix-icon="Phone"
                  placeholder="Phone"
                  style="width: 200px"
                  v-model="distributor.distributor_phone"
                />
              </el-form-item>
              <el-form-item
                size="default"
                label="邮箱"
                prop="distributor_email"
              >
                <el-input
                  :prefix-icon="Message"
                  placeholder="Email"
                  style="width: 200px"
                  v-model="distributor.distributor_email"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="地址" prop="distributor_address">
                <el-input
                  size="default"
                  :prefix-icon="Location"
                  placeholder="Address"
                  style="width: 340px"
                  v-model="distributor.distributor_address"
                />
              </el-form-item>
              <el-button
                type="primary"
                round
                @click="distributor_register"
                style="margin-left: 60px"
              >
                --&nbsp;&nbsp;注&nbsp;&nbsp;册&nbsp;&nbsp;--
              </el-button>
            </el-row>
          </el-form>
          <el-link type="primary" @click="changeToLogin">
            You have an account, go to log in now!
          </el-link>
        </div>
      </el-tab-pane>

      <el-tab-pane label="零售商"
        ><div class="login_left" v-show="isShow">
          <el-form
            label-width="140px"
            :rules="rules"
            :model="retailer"
            ref="retailerLogin"
          >
            <el-form-item label="账号" prop="retailer_account">
              <el-input
                size="default"
                :prefix-icon="User"
                placeholder="Account"
                v-model="retailer.retailer_account"
                style="width: 200px"
              />
            </el-form-item>
            <el-form-item label="密码" prop="retailer_password">
              <el-input
                size="default"
                :prefix-icon="Lock"
                show-password
                placeholder="Password"
                v-model="retailer.retailer_password"
                style="width: 200px"
              />
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input
                size="default"
                type="text"
                auto-complete="false"
                v-model="retailer.code"
                style="width: 80px"
              >
              </el-input>
              <el-image
                class="codeImg"
                :src="retailerImg"
                @click="resetImg"
              ></el-image>
            </el-form-item>
            <span style="font-size: 4px; color: #606266"
              >点击图片更换验证码</span
            >
          </el-form>
          <br /><br />
          <el-button type="primary" round @click="retailer_login"
            >--&nbsp;&nbsp;登&nbsp;&nbsp;录&nbsp;&nbsp;--
          </el-button>
        </div>
        <div class="login_right" v-show="isShow">
          <el-link type="primary" class="m_register" @click="changeToRegister">
            No account, go to register now!
          </el-link>
        </div>

        <div v-show="!isShow">
          <el-form
            label-width="140px"
            :rules="rules"
            :model="retailer"
            ref="retailerRegister"
          >
            <el-form-item label="名称" prop="retailer_name">
              <el-input
                size="default"
                :prefix-icon="User"
                placeholder="Name"
                style="width: 340px"
                v-model="retailer.retailer_name"
              />
            </el-form-item>
            <el-form-item label="密码" prop="retailer_password">
              <el-input
                size="default"
                :prefix-icon="Lock"
                placeholder="Password"
                show-password
                style="width: 200px"
                v-model="retailer.retailer_password"
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                size="default"
                :prefix-icon="Lock"
                placeholder="Confirm Password"
                show-password
                style="width: 200px"
                v-model="retailer.confirmPassword"
              />
            </el-form-item>
            <el-form-item
              label="营业证件"
              style="position: absolute; top: 60px; left: 376px"
            >
              <el-upload
                class="avatar-uploader"
                action="http://localhost:9090/files/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="类型" prop="retailer_type">
              <el-input
                size="default"
                :prefix-icon="Switch"
                placeholder="Type"
                style="width: 200px"
                v-model="retailer.retailer_type"
              />
            </el-form-item>
            <el-row>
              <el-form-item size="default" label="电话" prop="retailer_phone">
                <el-input
                  :prefix-icon="Phone"
                  placeholder="Phone"
                  style="width: 200px"
                  v-model="retailer.retailer_phone"
                />
              </el-form-item>
              <el-form-item size="default" label="邮箱" prop="retailer_email">
                <el-input
                  :prefix-icon="Message"
                  placeholder="Email"
                  style="width: 200px"
                  v-model="retailer.retailer_email"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="地址" prop="retailer_address">
                <el-input
                  size="default"
                  :prefix-icon="Location"
                  placeholder="Address"
                  style="width: 340px"
                  v-model="retailer.retailer_address"
                />
              </el-form-item>
              <el-button
                type="primary"
                round
                @click="retailer_register"
                style="margin-left: 60px"
              >
                --&nbsp;&nbsp;注&nbsp;&nbsp;册&nbsp;&nbsp;--
              </el-button>
            </el-row>
          </el-form>
          <el-link type="primary" @click="changeToLogin">
            You have an account, go to log in now!
          </el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  User,
  Lock,
  Star,
  Plus,
  Switch,
  Phone,
  Message,
  Location,
} from "@element-plus/icons-vue";
import { setRoutes } from "@/router";

export default {
  name: "EnterpriseLogin",
  components: {},
  data() {
    return {
      isShow: true,
      User: User,
      Lock: Lock,
      Star: Star,
      Switch: Switch,
      Phone: Phone,
      Message: Message,
      Location: Location,
      manufacturer: {},
      distributor: {},
      retailer: {},
      manufacturerLogin: {},
      manufacturerRegister: {},
      distributorLogin: {},
      distributorRegister: {},
      retailerLogin: {},
      retailerRegister: {},
      imageUrl: "",
      src: "",
      manufacturerImg:
        "http://localhost:9090/manufacturer/code?time=" + new Date(),
      distributorImg:
        "http://localhost:9090/distributor/code?time=" + new Date(),
      retailerImg: "http://localhost:9090/retailer/code?time=" + new Date(),
      rules: {
        manufacturer_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 3, max: 12, message: "请输入3-12个字符", trigger: "blur" },
        ],
        manufacturer_account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 20, message: "请输入5-20个字符", trigger: "blur" },
        ],
        manufacturer_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 20, message: "请输入5-20个字符", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { min: 5, max: 20, message: "请输入5-20个字符", trigger: "blur" },
        ],
        manufacturer_type: [
          { required: true, message: "请输入类型", trigger: "blur" },
        ],
        manufacturer_phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
        ],
        manufacturer_email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
        ],
        manufacturer_address: [
          { required: true, message: "请输入地址", trigger: "blur" },
        ],
        distributor_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 3, max: 12, message: "请输入3-12个字符", trigger: "blur" },
        ],
        distributor_account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 20, message: "请输入5-20个字符", trigger: "blur" },
        ],
        distributor_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 20, message: "请输入5-20个字符", trigger: "blur" },
        ],
        distributor_type: [
          { required: true, message: "请输入类型", trigger: "blur" },
        ],
        distributor_phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
        ],
        distributor_email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
        ],
        distributor_address: [
          { required: true, message: "请输入地址", trigger: "blur" },
        ],
        retailer_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 3, max: 12, message: "请输入3-12个字符", trigger: "blur" },
        ],
        retailer_account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 20, message: "请输入5-20个字符", trigger: "blur" },
        ],
        retailer_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 20, message: "请输入5-20个字符", trigger: "blur" },
        ],
        retailer_type: [
          { required: true, message: "请输入类型", trigger: "blur" },
        ],
        retailer_phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
        ],
        retailer_email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
        ],
        retailer_address: [
          { required: true, message: "请输入地址", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    changeToRegister() {
      this.isShow = !this.isShow;
    },
    changeToLogin() {
      this.isShow = !this.isShow;
    },
    resetImg() {
      this.manufacturerImg =
        "http://localhost:9090/manufacturer/code?time=" + new Date();
      this.distributorImg =
        "http://localhost:9090/distributor/code?time=" + new Date();
      this.retailerImg =
        "http://localhost:9090/retailer/code?time=" + new Date();
    },
    manufacturer_login() {
      this.$refs["manufacturerLogin"].validate((valid) => {
        if (valid) {
          this.request
            .post("/manufacturer/login", this.manufacturer)
            .then((res) => {
              if (res.code === "200") {
                localStorage.setItem("User", JSON.stringify(res.data)); //存储用户信息到浏览器
                localStorage.setItem("menus", JSON.stringify(res.data.menus)); // 存储用户信息到浏览器
                setRoutes(); //动态设置当前用户的路由
                this.$router.push("/Manage");
                this.$message.success("登录成功");
              } else {
                this.$message.error(res.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    manufacturer_register() {
      this.$refs["manufacturerRegister"].validate((valid) => {
        if (valid) {
          if (
            this.manufacturer.manufacturer_password !==
            this.manufacturer.confirmPassword
          ) {
            this.$message.error("两次输入密码不一致");
            return false;
          }
          this.manufacturer.manufacturer_image = this.imageUrl;
          this.request
            .post("/manufacturer/register", this.manufacturer)
            .then((res) => {
              if (res.code === "200") {
                this.$alert(res.data, "您的账号为:", {
                  confirmButtonText: "去登录",
                  callback: (action) => {
                    this.$message.success("注册成功,请登录");
                    this.isShow = !this.isShow;
                  },
                });
              } else {
                this.$message.error(res.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    distributor_login() {
      this.$refs["distributorLogin"].validate((valid) => {
        if (valid) {
          this.request
            .post("/distributor/login", this.distributor)
            .then((res) => {
              if (res.code === "200") {
                localStorage.setItem("User", JSON.stringify(res.data)); //存储用户信息到浏览器
                localStorage.setItem("menus", JSON.stringify(res.data.menus)); // 存储用户信息到浏览器
                setRoutes(); //动态设置当前用户的路由
                this.$router.push("/Manage");
                this.$message.success("登录成功");
              } else {
                this.$message.error(res.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    distributor_register() {
      this.$refs["distributorRegister"].validate((valid) => {
        if (valid) {
          if (
            this.distributor.distributor_password !==
            this.distributor.confirmPassword
          ) {
            this.$message.error("两次输入密码不一致");
            return false;
          }
          this.distributor.distributor_image = this.imageUrl;
          this.request
            .post("/distributor/register", this.distributor)
            .then((res) => {
              if (res.code === "200") {
                this.$alert(res.data, "您的账号为:", {
                  confirmButtonText: "去登录",
                  callback: (action) => {
                    this.$message.success("注册成功,请登录");
                    this.isShow = !this.isShow;
                  },
                });
              } else {
                this.$message.error(res.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    retailer_login() {
      this.$refs["retailerLogin"].validate((valid) => {
        if (valid) {
          this.request.post("/retailer/login", this.retailer).then((res) => {
            if (res.code === "200") {
              localStorage.setItem("User", JSON.stringify(res.data)); //存储用户信息到浏览器
              localStorage.setItem("menus", JSON.stringify(res.data.menus)); // 存储用户信息到浏览器
              setRoutes(); //动态设置当前用户的路由
              this.$router.push("/Manage");
              this.$message.success("登录成功");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    retailer_register() {
      this.$refs["retailerRegister"].validate((valid) => {
        if (valid) {
          if (
            this.retailer.retailer_password !== this.retailer.confirmPassword
          ) {
            this.$message.error("两次输入密码不一致");
            return false;
          }
          this.retailer.retailer_image = this.imageUrl;
          this.request.post("/retailer/register", this.retailer).then((res) => {
            if (res.code === "200") {
              this.$alert(res.data, "您的账号为:", {
                confirmButtonText: "去登录",
                callback: (action) => {
                  this.$message.success("注册成功,请登录");
                  this.isShow = !this.isShow;
                },
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res;
    },
  },
};
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
  color: #409eff;
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

.codeImg {
  margin-left: 20px;
  float: right;
  border: 1px solid #044eda;
}

.avatar-uploader .avatar {
  width: 174px;
  height: 120px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 2px dashed var(--el-border-color);
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
  width: 174px;
  height: 120px;
  text-align: center;
}
</style>

