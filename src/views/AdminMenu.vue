<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <el-row>
        <span class="info_font">菜单管理</span>
        <span class="search_x">名称：</span>
        <el-input v-model="name" class="w-50 m-2" placeholder="Name" style="width: 150px">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User/>
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary" :icon="Search" class="ml-10" @click="load">搜索</el-button>
        <el-button type="warning" :icon="Refresh" class="ml-10" @click="reset">重置</el-button>
        <el-button type="success" :icon="CirclePlus" class="ml-10" @click="handleAdd()">新增</el-button>
      </el-row>
    </div>

    <!--    表单-->
    <el-table :data="tableData" border style="margin: 20px auto" row-key="id" max-height="360px">
      <el-table-column fixed prop="id" label="ID" width="80"/>
      <el-table-column prop="name" label="名称" width="120"/>
      <el-table-column label="图标" width="80" align="center">
        <template #default="scope">
          <el-icon style="margin-top: 5px; font-size: 18px;">
            <component :is="scope.row.icon"></component>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路径" width="280"/>
      <el-table-column prop="page_path" label="页面路径" width="280"/>
      <el-table-column prop="description" label="描述" width="360"/>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
              class="ml-5"
              width="180"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              title="您确定删除吗？"
              :icon="InfoFilled"
              icon-color="#626AEF"
              @confirm="handleDel(scope.row.id)"
          >
            <template #reference>
              <el-button link size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button link type="primary" size="small" @click="handleChildrenAdd(scope.row.id)"
                     v-if="!scope.row.pid && !scope.row.path">新增子菜单
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    新增-->
    <el-dialog v-model="dialogFormVisible" title="菜单信息" width="400px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off" style="width: 250px"/>
        </el-form-item>
        <el-form-item label="路经">
          <el-input v-model="form.path" autocomplete="off" style="width: 250px"/>
        </el-form-item>
        <el-form-item label="页面路经">
          <el-input v-model="form.page_path" autocomplete="off" style="width: 250px"/>
        </el-form-item>
        <el-form-item label="图标">
          <el-select clearable v-model="form.icon" placeholder="请选择" style="width: 250px">
            <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.value">
              <template #default>
                <el-icon style="margin: 0 20px; font-size: 16px; align-items: center; ">
                  <component :is="item.value"></component>
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" autocomplete="off" style="width: 250px"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
      </template>
    </el-dialog>

    <!--    新增子菜单-->
    <el-dialog v-model="dialogFormChildren" title="菜单信息" width="400px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off" style="width: 250px"/>
        </el-form-item>
        <el-form-item label="路经">
          <el-input v-model="form.path" autocomplete="off" style="width: 250px"/>
        </el-form-item>
        <el-form-item label="页面路经">
          <el-input v-model="form.page_path" autocomplete="off" style="width: 250px"/>
        </el-form-item>
        <el-form-item label="图标">
          <el-select clearable v-model="form.icon" placeholder="请选择" style="width: 250px">
            <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.value">
              <template #default>
                <el-icon style="margin: 0 20px; font-size: 16px; align-items: center; ">
                  <component :is="item.value"></component>
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" autocomplete="off" style="width: 250px"/>
        </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormChildren = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>

import {User, Search, Refresh, CirclePlus, InfoFilled} from '@element-plus/icons-vue'

export default {
  name: "AdminMenu",
  components: {},
  data() {
    return {
      User: User,
      Search: Search,
      Refresh: Refresh,
      CirclePlus: CirclePlus,
      InfoFilled: InfoFilled,
      form: {},
      tableData: [],
      name: "",
      small: true,
      disabled: false,
      background: true,
      dialogFormVisible: false,//菜单
      dialogFormChildren: false,//子菜单
      options: [],
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/menu", {
        params: {
          name: this.name,
        }
      }).then(res => {
        this.tableData = res.data
      })
    },
    save() {
      this.request.post("/menu", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.dialogFormChildren = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
      this.form.pid = null
    },
    handleChildrenAdd(pid) {
      this.dialogFormChildren = true
      this.form = {}
      this.form.pid = pid
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
      //请求图标数据
      this.request.get("/menu/icons").then(res => {
        this.options = res.data
      })
    },
    handleDel(id) {
      this.request.delete("/menu/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    reset() {
      this.name = ""
      this.load()
    },

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