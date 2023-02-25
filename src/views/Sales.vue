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
        <span class="search_x">零售商名称：</span>
        <el-input v-model="retailer_name" class="w-50 m-2 mr-20" placeholder="Manufacturer" style="width: 150px">
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
      <el-table-column prop="retailer_account" label="零售商账号" width="200"/>
      <el-table-column prop="retailer_name" label="零售商名称" width="360"/>
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
  name: "Sales",
  components: {},
  data() {
    return {
      Search: Search,
      Refresh: Refresh,
      CirclePlus: CirclePlus,
      tableData: [],
      product_name: '',
      retailer_name: '',
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/sales/condition", {
        params: {
          product_name: this.product_name,
          retailer_name: this.retailer_name
        }
      }).then(res => {
        this.tableData = res.data
      })
    },
    reset() {
      this.product_name = ""
      this.retailer_name = ""
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