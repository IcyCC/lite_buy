<template>
  <div class="app-container">


    <div class="app-container">
      <!-- <div>模板列表</div> -->

      <el-table
        :data="data"
        v-loading="tableLoading"
        @sort-change="onSort">

        <el-table-column
          prop="type"
          label="中标类型"
        >
          <template slot-scope="scope">
            <el-tag >{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="production_type"
          label="产品类型"
        >
          <template slot-scope="scope">
            <el-tag >{{scope.row.production_type}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="created_by"
          label="采购/租赁人"
        >
        </el-table-column>

        <el-table-column
          prop="content"
          label="项目内容"
        >
        </el-table-column>

        <el-table-column
          prop="comment"
          label="评价"
        >
        </el-table-column>

        <el-table-column
          prop="created_at"
          label="时间"
        >
        </el-table-column>

      </el-table>

      <el-col :span="24" class="toolbar">
        <el-pagination
          @current-change="onPageChange"
          :current-page="pages._page"
          :page-size="pages._per_page"
          layout="total, prev, pager, next"
          :total="total"
          style="float:right;">
        </el-pagination>
      </el-col>


    </div>
  </div>
</template>

<script>
  //mixin
  import commonTable from '@/mixins/table'
  //视频接口
  import { queryResults, deleteResult, updateResult, getResult, createResult } from '@/api/results'

  export default {
    name: 'history-order',
    mixins: [commonTable],
    props: {
      company_id: Number
    },
    data() {
      return {
        //配置minxin种curd api方法：
        newMethod: createResult,
        deleteMethod: deleteResult,
        updateMethod: updateResult,
        getMethod: getResult,
        queryMethod: queryResults,

        //配置resource_name
        resource_name: 'result',

        //配置mixin query
        query: {  //条件查询 dict  //api查询条件dict
          company_id: this.company_id
        },

        data: [],  //列表

      }
    },
    created() {
    },
    methods: {
      //Rewrite minxin onReset()  查询条件重置
    },
    mounted() {
      // window.vue = this

    }

  }
</script>
<style scoped>
  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0px;
  }

  .toolbar .el-form-item {
    margin-bottom: 10px;
  }
</style>
