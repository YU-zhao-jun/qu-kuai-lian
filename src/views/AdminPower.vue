<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <el-row>
        <span class="info_font">管理员权限</span>
        <span class="search_x">名称：</span>
        <el-input v-model="admin_name" class="w-50 m-2" placeholder="Name" style="width: 150px">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User/>
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary" :icon="Search" class="ml-10" @click="load">搜索</el-button>
        <el-button type="warning" :icon="Refresh" class="ml-10" @click="reset">重置</el-button>
        <el-button type="success" :icon="CirclePlus" class="ml-10" @click="Add">新增</el-button>
      </el-row>
    </div>

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

    <el-dialog v-model="dialogFormVisible" center title="管理员信息" width="360px">
      <el-form :model="form" label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="form.admin_name" style="width: 220px" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.admin_account" style="width: 220px" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.admin_password" style="width: 220px" autocomplete="off" show-password/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.menu_description" style="width: 220px" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button>
      </span>
      </template>
    </el-dialog>

    <!--    表单-->
    <el-table :data="tableData" border style="margin: 20px auto">
      <el-table-column fixed prop="id" label="ID" width="60"/>
      <el-table-column prop="admin_name" label="管理员" width="150"/>
      <el-table-column prop="admin_account" label="账号" width="150"/>
      <el-table-column prop="menu_description" label="描述"/>
      <el-table-column prop="create_time" label="注册时间" width="180">
        <template #default="scope">
          <span>{{ scope.row.create_time.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="selectMenu(scope.row)">分配菜单</el-button>
          <el-button link type="primary" size="small" @click="Edit(scope.row)">编辑</el-button>
          <el-popconfirm
              class="ml-5"
              width="180"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              title="您确定删除吗？"
              :icon="InfoFilled"
              icon-color="#626AEF"
              @confirm="Del(scope.row.id)"
          >
            <template #reference>
              <el-button link size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
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
import {Search, Refresh, CirclePlus, InfoFilled} from "@element-plus/icons-vue";

export default {
  name: "AdminPower",
  components: {},
  data() {
    return {
      Search: Search,
      Refresh: Refresh,
      CirclePlus: CirclePlus,
      InfoFilled: InfoFilled,
      dialogFormVisible: false,
      menuDialogVis: false,
      form: {},
      tableData: [],
      records: "",
      total: 0,
      pageNum: 1,
      pageSize: 8,
      admin_name: "",
      small: true,
      disabled: false,
      background: true,
      menuData: [],
      props: {
        label: 'name',
      },
      expends: [],
      checks: [],
      roleId: '',
      User: localStorage.getItem("User")?JSON.parse(localStorage.getItem("User")):{},
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/admin/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          admin_name: this.admin_name,
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
      this.request.get("/admin/roleMenu/" + this.roleId.id).then(res => {
        this.checks = res.data
      })
      this.menuDialogVis = true
    },
    saveRoleMenu() {
      this.request.post("/admin/roleMenu/" + this.roleId.id , this.$refs.tree.getCheckedKeys()).then(res => {
        if (res.code === '200') {
          if(this.roleId.id === this.User.id){
            this.$message.success("绑定成功，请重新登录")
            this.$store.commit("logout")
          }else {
            this.$message.success("绑定成功")
            this.menuDialogVis = false
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    reset() {
      this.admin_name = ""
      this.load()
    },
    Add() {
      this.dialogFormVisible = true
      this.form = {}
    },
    save() {
      this.request.post("/admin", this.form).then(res => {
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
    Del(id) {
      this.request.delete("/admin/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    }
  },

}
</script>

<style scoped>

</style>