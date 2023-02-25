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
      <el-table-column fixed prop="logistics_info_id" label="产品编号" width="200"/>
      <el-table-column prop="product_name" label="产品名称" width="200"/>
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
  name: "OneLogistics",
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
      this.request.get("/logistics/conditionOne", {
        params: {
          distributor_account: this.User.distributor_account,
          product_name: this.product_name,
          product_type: this.product_type
        }
      }).then(res => {
        this.tableData = res.data
      })
    },
    reset() {
      this.distributor_account = this.User.distributor_account
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