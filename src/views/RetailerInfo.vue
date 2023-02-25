<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <el-row>
        <span class="info_font">生产商信息</span>
        <span class="search_x">名称：</span>
        <el-input v-model="mfrs_name" class="w-50 m-2" placeholder="Name" style="width: 150px">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User/>
            </el-icon>
          </template>
        </el-input>
        <span class="search_x">类型：</span>
        <el-input v-model="mfrs_type" class="w-50 m-2" placeholder="Type" style="width: 150px">
          <template #prefix>
            <el-icon class="el-input__icon">
              <PieChart/>
            </el-icon>
          </template>
        </el-input>

        <el-button type="primary" :icon="Search" class="ml-10" @click="load">搜索</el-button>
        <el-button type="success" :icon="CirclePlus" class="ml-10" @click="Add">新增</el-button>
        <el-upload
            action="http://localhost:9090/manufacturer/Import"
            :show-file-list="false"
            :on-success="handleExcelImportSuccess"
            style="display: inline-block"
        >
          <el-button type="primary" :icon="Download" class="ml-10">导入</el-button>
        </el-upload>
        <el-button type="primary" :icon="Upload" class="ml-10" @click="Export">导出</el-button>
      </el-row>
    </div>

    <el-drawer v-model="drawer" title="详细信息" :with-header="false" size="40%">
      <span>详细信息</span>
      <el-divider content-position="left"><span style="font-size: 10px">MANUFACTURER   DETAILS</span></el-divider>
      <el-form :model="form" label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="form.manufacturer_name" autocomplete="off" style="width: 340px"/>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.manufacturer_type" autocomplete="off" style="width: 340px"/>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-row>
        <el-form-item label="账号">
          <el-input v-model="form.manufacturer_account" autocomplete="off" style="width: 140px"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.manufacturer_password" autocomplete="off" style="width: 140px" show-password/>
        </el-form-item>
        </el-row>
        <el-row>
        <el-form-item label="电话">
          <el-input v-model="form.manufacturer_phone" autocomplete="off" style="width: 140px"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.manufacturer_email" autocomplete="off" style="width: 140px"/>
        </el-form-item>
        </el-row>
        <el-form-item label="地址">
          <el-input v-model="form.manufacturer_address" autocomplete="off" style="width: 340px"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
         <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </span>
      </template>
    </el-drawer>

    <!--    表单-->
    <el-table :data="tableData" border style="margin: 20px auto" row-key="id">
      <el-table-column fixed prop="manufacturer_name" label="生产商名称" width="180"/>
      <el-table-column prop="manufacturer_type" label="类型" width="150"/>
      <el-table-column prop="manufacturer_account" label="账号" width="150"/>
      <el-table-column prop="manufacturer_phone" label="电话" width="180"/>
      <el-table-column prop="manufacturer_email" label="邮箱" width="240"/>
      <el-table-column prop="create_time" label="注册时间" width="180"/>
      <el-table-column prop="manufacturer_address" label="地址" width="400"/>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="Edit(scope.row)">详情</el-button>
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

import {User, PieChart, Search, CirclePlus, Download, Upload} from '@element-plus/icons-vue'

export default {
  name: "ManufacturerInfo",
  components: {
    User,
    PieChart,
    Search,
  },
  data() {
    return {
      Search: Search,
      CirclePlus: CirclePlus,
      Download: Download,
      Upload: Upload,
      drawer: false,
      form: {},
      tableData: [],
      records: "",
      total: 0,
      pageNum: 1,
      pageSize: 8,
      mfrs_name: "",
      mfrs_type: "",
      small: true,
      disabled: false,
      background: true,
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/manufacturer/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          manufacturer_name: this.mfrs_name,
          manufacturer_type: this.mfrs_type
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
      this.drawer = true
    },
    Export() {
      window.open("http://localhost:9090/manufacturer/Export", "_self")
    },
    save() {
      this.request.post("/manufacturer", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("保存成功")
          this.drawer = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleExcelImportSuccess() {
      this.$message.success("导入成功")
      this.load()
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