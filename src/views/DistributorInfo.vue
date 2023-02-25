<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <el-row>
        <span class="info_font">经销商信息</span>
        <span class="search_x">名称：</span>
        <el-input v-model="distributor_name" class="w-50 m-2" placeholder="Name" style="width: 150px">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User/>
            </el-icon>
          </template>
        </el-input>
        <span class="search_x">类型：</span>
        <el-input v-model="distributor_type" class="w-50 m-2" placeholder="Type" style="width: 150px">
          <template #prefix>
            <el-icon class="el-input__icon">
              <PieChart/>
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary" :icon="Search" class="ml-10" @click="load">搜索</el-button>
        <el-button type="warning" :icon="Refresh" class="ml-10" @click="reset">重置</el-button>
        <el-button type="success" :icon="CirclePlus" class="ml-10" @click="Add">新增</el-button>
        <el-upload
            action="http://localhost:9090/distributor/Import"
            :show-file-list="false"
            :on-success="handleExcelImportSuccess"
            style="display: inline-block"
        >
          <el-button type="primary" :icon="Download" class="ml-10">导入</el-button>
        </el-upload>
        <el-button type="primary" :icon="Upload" class="ml-10" @click="Export">导出</el-button>
      </el-row>
    </div>

    <!--    新增-->
    <el-drawer v-model="drawer" title="新增信息" :with-header="false" size="40%">
      <span>详细信息</span>
      <el-divider content-position="left"><span style="font-size: 10px">DISTRIBUTOR   DETAILS</span></el-divider>
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.distributor_name" autocomplete="off" style="width: 340px"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.distributor_password" autocomplete="off" style="width: 340px" show-password/>
        </el-form-item>
        <el-form-item label="营业证件">
          <el-upload
              class="avatar-uploader"
              action="http://localhost:9090/files/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" alt=""/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-row>
          <el-form-item label="类型">
            <el-input v-model="form.distributor_type" autocomplete="off" style="width: 130px"/>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.distributor_phone" autocomplete="off" style="width: 130px"/>
          </el-form-item>
        </el-row>
        <el-form-item label="邮箱">
          <el-input v-model="form.distributor_email" autocomplete="off" style="width: 340px"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.distributor_address" autocomplete="off" style="width: 340px"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
         <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </span>
      </template>
    </el-drawer>

    <!--    详情-->
    <el-drawer v-model="drawerDetails" title="详细信息" :with-header="false" size="40%">
      <span>详细信息</span>
      <el-divider content-position="left"><span style="font-size: 10px">DISTRIBUTOR   DETAILS</span></el-divider>
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.distributor_name" autocomplete="off" style="width: 340px"/>
        </el-form-item>
        <el-form-item label="营业证件">
          <el-upload
              class="avatar-uploader"
              action="http://localhost:9090/files/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
          >
            <img v-if="form.distributor_image" :src="form.distributor_image" class="avatar" alt=""/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-row>
          <el-form-item label="账号">
            <el-input v-model="form.distributor_account" autocomplete="off" style="width: 120px" :disabled="true"/>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="form.distributor_type" autocomplete="off" style="width: 140px"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="电话">
            <el-input v-model="form.distributor_phone" autocomplete="off" style="width: 120px"/>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.distributor_email" autocomplete="off" style="width: 140px"/>
          </el-form-item>
        </el-row>
        <el-form-item label="地址">
          <el-input v-model="form.distributor_address" autocomplete="off" style="width: 340px"
                    :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
         <el-button @click="drawerDetails = false">取消</el-button>
          <el-button type="primary" @click="details">确认</el-button>
        </span>
      </template>
    </el-drawer>

    <!--    修改密码-->
    <el-dialog
        v-model="dialogVisible"
        title="修改密码"
        width="360px"
    >
      <el-form :model="form" label-width="80px" :rules="rules" ref="newPwd">
        <el-form-item label="账号" prop="Account">
          <el-input v-model="form.distributor_account" autocomplete="off" style="width: 200px"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" autocomplete="off" show-password style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" autocomplete="off" show-password style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
             <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="modify">确定</el-button>
          </span>
      </template>
    </el-dialog>


    <!--    表单-->
    <el-table :data="tableData" border style="margin: 20px auto" row-key="id">
      <el-table-column fixed prop="distributor_name" label="生产商名称" width="200"/>
      <el-table-column prop="distributor_type" label="类型" width="150"/>
      <el-table-column prop="distributor_account" label="账号" width="150"/>
      <el-table-column prop="distributor_phone" label="电话" width="180"/>
      <el-table-column prop="distributor_email" label="邮箱" width="240"/>
      <el-table-column prop="distributor_address" label="地址" width="400"/>
      <el-table-column prop="create_time" label="注册时间" width="180">
        <template #default="scope">
          <span>{{ scope.row.create_time.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="Edit(scope.row)">详情</el-button>
          <el-button link type="primary" size="small" @click="ChangePassword(scope.row)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <div style="position: absolute; margin-left: 40px; bottom: 25px">
      <el-pagination
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>

import {Search, Refresh, CirclePlus, Download, Upload} from '@element-plus/icons-vue'

export default {
  name: "DistributorInfo",
  components: {},
  data() {
    return {
      Search: Search,
      Refresh: Refresh,
      CirclePlus: CirclePlus,
      Download: Download,
      Upload: Upload,
      drawer: false,
      drawerDetails: false,
      dialogVisible: false,
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
      tableData: [],
      records: "",
      total: 0,
      pageNum: 1,
      pageSize: 8,
      distributor_name: "",
      distributor_type: "",
      small: true,
      background: true,
      disabled: false,
      imageUrl: '',
      src: '',
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/distributor/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          distributor_name: this.distributor_name,
          distributor_type: this.distributor_type
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    Add() {
      this.drawer = true
      this.form = {}
    },
    Edit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.drawerDetails = true
    },
    ChangePassword(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    Export() {
      window.open("http://localhost:9090/distributor/Export", "_self")
    },
    save() {
      this.form.distributor_image = this.imageUrl
      this.request.post("/distributor/register", this.form).then(res => {
        if (res.code === '200') {
          this.$alert(res.data, '添加的账号为:', {
            confirmButtonText: '确定',
          })
          this.load()
          this.drawer = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    details() {
      this.request.post("/distributor", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("保存成功")
          this.drawerDetails = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    modify() {
      this.$refs['newPwd'].validate((valid) => {
        if (valid) {
          if (this.form.newPassword !== this.form.confirmPassword) {
            this.$message.error("2次输入的新密码不相同")
            return false
          }
          this.request.post("/distributor/password", this.form).then(res => {
            if (res.code === '200') {
              this.$message.success("修改成功")
              this.dialogVisible = false
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    reset() {
      this.distributor_name = ""
      this.distributor_type = ""
      this.load()
    },
    handleExcelImportSuccess() {
      this.$message.success("导入成功")
      this.load()
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res
      this.form.distributor_image = res
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    }
  }
}

</script>

<style scoped>
.container {
  margin: 0 auto;
  text-align: center;
}

.el-row {
  text-align: center;
  line-height: 30px;
}

.el-input {
  height: 32px;
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