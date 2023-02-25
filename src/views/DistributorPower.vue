<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <el-row>
        <span class="info_font">经销商权限</span>
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
      </el-row>
    </div>

    <!--    表单-->
    <el-table :data="tableData" border style="margin: 20px auto">
      <el-table-column fixed prop="id" label="ID" width="60"/>
      <el-table-column prop="distributor_name" label="经销商名称" width="180"/>
      <el-table-column prop="distributor_type" label="类型" width="150"/>
      <el-table-column prop="distributor_account" label="账号" width="150"/>
      <el-table-column prop="menu_description" label="描述"/>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="selectMenu(scope.row)">分配菜单</el-button>
          <el-button link type="primary" size="small" @click="Edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="menuDialogVis" center title="菜单分配" width="360px">
      <el-scrollbar height="200px">
      <el-tree
          :props="props"
          :data="menuData"
          show-checkbox
          node-key="id"
          ref="tree"
          :check-strictly="true"
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
      </el-scrollbar>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="menuDialogVis = false">取消</el-button>
          <el-button type="primary" @click="saveRoleMenu">确认</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogFormVisible" center title="经销商信息" width="360px">
      <el-form :model="form" label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="form.distributor_name" style="width: 220px" autocomplete="off" :disabled="true"/>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.distributor_type" style="width: 220px" autocomplete="off" :disabled="true"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.menu_description" style="width: 220px" autocomplete="off"/>
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

import {Search, Refresh, CirclePlus} from '@element-plus/icons-vue'

export default {
  name: "DistributorPower",
  components: {},
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
      distributor_name: "",
      distributor_type: "",
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
    selectMenu(roleId) {
      //请求菜单数据
      this.roleId = roleId
      // 请求菜单数据
      this.request.get("/menu").then(res => {
        this.menuData = res.data
        // 把后台返回的菜单数据处理成 id数组
        this.expends = this.menuData.map(v => v.id)
      })
      this.request.get("/distributor/roleMenu/" + this.roleId.id).then(res => {
        this.checks = res.data
      })
      this.menuDialogVis = true
    },
    saveRoleMenu() {
      this.request.post("/distributor/roleMenu/" + this.roleId.id, this.$refs.tree.getCheckedKeys()).then(res => {
        if (res.code === '200') {
          this.$message.success("绑定成功")
          this.menuDialogVis = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    reset() {
      this.distributor_name = ""
      this.distributor_type = ""
      this.load()
    },
    save() {
      this.request.post("/distributor", this.form).then(res => {
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