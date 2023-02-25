<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <el-row>
        <span class="info_font">零售信息</span>
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
      <el-table-column fixed prop="sales_info_id" label="销售编号" width="200"/>
      <el-table-column prop="product_name" label="产品名称" width="200"/>
      <el-table-column prop="product_type" label="产品类型" width="200"/>
      <el-table-column prop="sales_people" label="销售人员" width="200"/>
      <el-table-column prop="sales_price" label="销售价格" width="200"/>
      <el-table-column prop="sales_volumes" label="销售数量" width="200"/>
      <el-table-column prop="sales_time" label="销售时间" width="200"/>
      <el-table-column prop="sales_address" label="销售地址" width="200"/>
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
  name: "OneSales",
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
      this.request.get("/sales/conditionOne", {
        params: {
          retailer_account: this.User.retailer_account,
          product_name: this.product_name,
          product_type: this.product_type
        }
      }).then(res => {
        this.tableData = res.data
      })
    },
    reset() {
      this.retailer_account = this.User.retailer_account
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