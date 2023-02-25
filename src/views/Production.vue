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
        <span class="search_x">生产商名称：</span>
        <el-input v-model="manufacturer_name" class="w-50 m-2 mr-20" placeholder="Manufacturer" style="width: 150px">
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
      <el-table-column prop="manufacturer_account" label="生产商账号" width="200"/>
      <el-table-column prop="manufacturer_name" label="生产商名称" width="360"/>
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
  name: "Production",
  components: {},
  data() {
    return {
      Search: Search,
      Refresh: Refresh,
      CirclePlus: CirclePlus,
      tableData: [],
      product_name: '',
      manufacturer_name: '',

    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/production/condition", {
        params: {
          product_name: this.product_name,
          manufacturer_name: this.manufacturer_name
        }
      }).then(res => {
        this.tableData = res.data
      })
    },
    reset() {
      this.product_name = ""
      this.manufacturer_name = ""
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