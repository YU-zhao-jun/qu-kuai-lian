<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <span class="info_font">个人信息</span>
    </div>
    <el-card class="box-card" style="margin: 20px auto;width: 90%; height: 85%">
      <el-divider content-position="left"><span style="font-size: 14px">MANUFACTURER INFORMATION</span></el-divider>
      <el-form :model="form" label-width="120px">
        <el-form-item label="账号" prop="manufacturer_account">
          <el-input v-model="form.manufacturer_account" autocomplete="off" style="width: 280px" :disabled="true"/>
        </el-form-item>
        <el-form-item label="营业证件" style="position: absolute; top: 200px; left: 750px">
          <el-upload
              class="avatar-uploader"
              action="http://localhost:9090/files/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
          >
            <img v-if="form.manufacturer_image" :src="form.manufacturer_image" class="avatar" alt=""/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称" prop="manufacturer_name">
          <el-input v-model="form.manufacturer_name" autocomplete="off" style="width: 280px"/>
        </el-form-item>
        <el-form-item label="类型" prop="manufacturer_type">
          <el-input v-model="form.manufacturer_type" autocomplete="off" style="width: 280px"/>
        </el-form-item>
        <el-row>
        <el-form-item label="电话" prop="manufacturer_phone">
          <el-input v-model="form.manufacturer_phone" autocomplete="off" style="width: 280px"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="manufacturer_email">
          <el-input v-model="form.manufacturer_email" autocomplete="off" style="width: 280px"/>
        </el-form-item>
        </el-row>
        <el-form-item label="地址">
          <el-input v-model="form.manufacturer_address" autocomplete="off" style="width: 280px"
                    :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin: 0 auto" round @click="save">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {Upload} from '@element-plus/icons-vue'

export default {
  name: "NewManufacturer",
  components: {},
  data() {
    return {
      Upload: Upload,
      User: localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : {},
      form: {},
      src: '',
    }
  },
  created() {
    this.getUser().then(res => {
      this.form = res
    })
  },
  methods: {
    async getUser() {
      return (await this.request.get("/manufacturer/" + this.User.id)).data
    },
    save() {
      this.request.post("/manufacturer", this.form).then(res => {
        if (res.code === '200') {
          if (res.code === '200') {
            this.$message.success("保存成功")
            // 触发父级更新User的方法
            this.$emit("refreshUser")
            // 更新浏览器存储的用户信息
            this.getUser().then(res => {
              res.token = JSON.parse(localStorage.getItem("User")).token
              localStorage.setItem("User", JSON.stringify(res))
            })
          }
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleAvatarSuccess(res) {
      this.form.manufacturer_image = res
    },
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 220px;
  height: 128px;
  display: block;
}
</style>

<style>
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
  width: 220px;
  height: 128px;
  text-align: center;
}
</style>



