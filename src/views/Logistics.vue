<template>
  <div class="container backdrop">
    <div class="demo-input-suffix">
      <el-row>
        <span class="info_font">经销信息</span>
        <span class="search_x">产品名称：</span>
        <el-input v-model="product_name" class="w-50 m-2 mr-20" placeholder="Product" style="width: 150px">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User/>
            </el-icon>
          </template>
        </el-input>
        <span class="search_x">经销商名称：</span>
        <el-input v-model="distributor_name" class="w-50 m-2 mr-20" placeholder="Manufacturer" style="width: 150px">
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
      <el-table-column fixed prop="logistics_info_id" label="产品编号" width="200"/>
      <el-table-column prop="product_name" label="产品名称" width="200"/>
      <el-table-column prop="distributor_account" label="经销商账号" width="200"/>
      <el-table-column prop="distributor_name" label="经销商名称" width="360"/>
      <el-table-column prop="product_type" label="产品类型" width="200"/>
      <el-table-column prop="origin" label="始发地" width="200"/>
      <el-table-column prop="destination" label="目的地" width="200"/>
      <el-table-column prop="departure_time" label="出发时间" width="200"/>
      <el-table-column prop="arrival_time" label="到达时间" width="200"/>
      <el-table-column prop="transportation_people" label="运输人员" width="200"/>
      <el-table-column prop="transportation_mode" label="运输方式" width="200"/>
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
  name: "Logistics",
  components: {},
  data() {
    return {
      Search: Search,
      Refresh: Refresh,
      CirclePlus: CirclePlus,
      tableData: [],
      product_name: '',
      distributor_name: '',

    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/logistics/condition", {
        params: {
          product_name: this.product_name,
          distributor_name: this.distributor_name
        }
      }).then(res => {
        this.tableData = res.data
      })
    },
    reset() {
      this.product_name = ""
      this.distributor_name = ""
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