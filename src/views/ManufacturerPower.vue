<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <el-row>
        <span class="info_font">生产商权限</span>
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
        <el-button type="warning" :icon="Refresh" class="ml-10" @click="reset">重置</el-button>
      </el-row>
    </div>

    <!--    表单-->
    <el-table :data="tableData" border style="margin: 20px auto">
      <el-table-column fixed prop="id" label="ID" width="60"/>
      <el-table-column prop="manufacturer_name" label="生产商名称" width="180"/>
      <el-table-column prop="manufacturer_type" label="类型" width="150"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="selectMenu(scope.row)">分配菜单</el-button>
          <el-button link type="primary" size="small" @click="Edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="menuDialogVis" title="菜单分配" width="30%">
      <el-tree
          :props="props"
          :data="menuData"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-expanded-keys="expends"
          :default-checked-keys="checks">
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <el-icon style="margin: 0 10px; font-size: 16px; align-items: center">
              <component :is="data.icon"></component>
            </el-icon>
            <span>{{ data.name }}</span>
         </span>
        </template>
      </el-tree>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="menuDialogVis = false">取消</el-button>
          <el-button type="primary" @click="saveRoleMenu">确认</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogFormVisible" title="生产商信息" width="480px">
      <el-form :model="form" label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="form.manufacturer_name" width="300px" autocomplete="off" :disabled="true"/>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.manufacturer_type" width="300px" autocomplete="off" :disabled="true"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" width="300px" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>

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

import {User, PieChart, Search, Refresh, CirclePlus} from '@element-plus/icons-vue'

export default {
  name: "ManufacturerMenu",
  components: {
    User,
    PieChart,
    Search,
  },
  data() {
    return {
      Search: Search,
      Refresh: Refresh,
      CirclePlus: CirclePlus,
      dialogFormVisible: false,
      menuDialogVis: false,
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
      menuData: [],
      props: {
        label: 'name',
      },
      expends: [],
      checks: [],
      roleId: 0,
      roleFlag: '',
      ids: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/mfrs/page", {
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
    selectMenu(roleId) {
      //请求菜单数据
      this.roleId = roleId
      // this.roleFlag = role.flag
      // 请求菜单数据
      this.request.get("/menu").then(res => {
        this.menuData = res.data
        // 把后台返回的菜单数据处理成 id数组
        this.expends = this.menuData.map(v => v.id)
      })
      // this.request.get("/mfrs/roleMenu/" + this.roleId).then(res => {
      //   this.checks = res.data
      // })
      this.menuDialogVis = true
    },
    saveRoleMenu() {
      this.request.post("/mfrs/roleMenu/" + this.roleId, this.$refs.tree.getCheckedKeys()).then(res => {
        if (res.code === '0' || res.code === '200') {
          this.$message.success("绑定成功")
          this.menuDialogVis = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    reset() {
      this.mfrs_name = ""
      this.mfrs_type = ""
      this.load()
    },
    save() {
      this.request.post("/mfrs", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    Edit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
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