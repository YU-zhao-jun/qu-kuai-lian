<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <el-row>
        <span class="info_font">生产商信息</span>
        <span class="search_x">名称：</span>
        <el-input v-model="name" class="w-50 m-2" placeholder="Name" style="width: 150px">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User/>
            </el-icon>
          </template>
        </el-input>

        <el-button type="primary" :icon="Search" class="ml-10" @click="load">搜索</el-button>
        <el-button type="success" :icon="CirclePlus" class="ml-10" @click="mfrs_Add">新增</el-button>
      </el-row>
    </div>

    <el-dialog v-model="dialogFormVisible" title="生产商" width="30%">
      <el-form :model="from" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="from.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="from.description" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>

      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="mfrs_save">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>

    <!--    表单-->
    <el-table :data="tableData" border style="margin: 20px auto">
      <el-table-column fixed prop="name" label="名称" width="200"/>
<!--      <el-table-column prop="name" label="名称" width="150"/>-->
      <el-table-column prop="description" label="描述"/>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default slot-scope="scope">
          <el-button link type="primary" size="small" @click="mfrs_Del()">详情</el-button>
          <el-button link type="primary" size="small" @click="mfrs_Edit($slots.row)">编辑</el-button>
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
  name: "ManufacturerRole",
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
      dialogFormVisible: false,
      from: {},
      tableData: [],
      records: "",
      total: 0,
      pageNum: 1,
      pageSize: 8,
      name: "",
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
      this.request.get("/role/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    mfrs_Add() {
      this.dialogFormVisible = true
      this.from = {}
    },
    mfrs_Edit(row) {
      this.from = row
      console.log(row)
      this.dialogFormVisible = true
    },
    mfrs_Del(id) {
      this.request.delete("/role", this.id).then(res => {
        if (res.data) {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    mfrs_Export() {
      window.open("http://localhost:9090/role/Export","_self")
    },
    mfrs_save() {
      this.request.post("/rloe", this.from).then(res => {
        if (res.data) {
          this.$message.success("添加成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("添加失败")
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
</style>