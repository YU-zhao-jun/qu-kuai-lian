<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <el-row>
        <span class="info_font">生产信息</span>
        <span class="search_x">产品名称：</span>
        <el-input v-model="product_name" class="w-50 m-2 mr-20" placeholder="Product" style="width: 150px">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User/>
            </el-icon>
          </template>
        </el-input>
        <span class="search_x">产品类型：</span>
        <el-input v-model="product_type" class="w-50 m-2 mr-20" placeholder="Type" style="width: 150px">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User/>
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary" :icon="Search" class="ml-10" @click="load">搜索</el-button>
        <el-button type="warning" :icon="Refresh" class="ml-10" @click="reset">重置</el-button>
      </el-row>
    </div>

    <!--    表单-->
    <el-table :data="tableData" border style="margin: 20px auto" row-key="id" max-height="360px">
      <el-table-column fixed prop="product_info_id" label="产品编号" width="200"/>
      <el-table-column prop="product_name" label="产品名称" width="200"/>
      <el-table-column prop="product_type" label="产品类型" width="200"/>
      <el-table-column prop="product_material" label="产品原料" width="200"/>
      <el-table-column prop="product_image" label="产品图片" width="200"/>
      <el-table-column prop="product_people" label="生产人员" width="200"/>
      <el-table-column prop="manufacture_data" label="生产日期" width="200"/>
      <el-table-column prop="expiration_date" label="保质日期" width="200"/>
      <el-table-column prop="storage_conditions" label="存储条件" width="280"/>
      <el-table-column prop="product_address" label="生产地址" width="360"/>
      <el-table-column prop="product_description" label="产品描述" width="360"/>
      <el-table-column prop="traceability_code" label="溯源码" width="300"/>
      <el-table-column prop="create_time" label="录入时间" width="180">
        <template #default="scope">
          <span>{{ scope.row.create_time.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import {CirclePlus, Refresh, Search} from "@element-plus/icons-vue";

export default {
  name: "OneProduction",
  components: {},
  data() {
    return {
      Search: Search,
      Refresh: Refresh,
      CirclePlus: CirclePlus,
      tableData: [],
      User: localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : {},
      product_name: '',
      product_type: '',
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/production/conditionOne", {
        params: {
          manufacturer_account: this.User.manufacturer_account,
          product_name: this.product_name,
          product_type: this.product_type
        }
      }).then(res => {
        this.tableData = res.data
      })
    },
    reset() {
      this.manufacturer_account = this.User.manufacturer_account
      this.product_name = ""
      this.product_type = ""
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

</style>