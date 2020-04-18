<template>
  <div class="app-container">
    <div class="app-container">
      <!-- <div>模板列表</div> -->

      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" v-model="query">
          <el-form-item label="专家姓名：">
            <el-input v-model="query._like_name" placeholder="请输入专家姓名"></el-input>
          </el-form-item>
          <el-form-item label="擅长领域：">
            <el-input v-model="query._search_skilled_in" placeholder="请输入擅长领域"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button plain @click="onReset">重置</el-button>
          </el-form-item>

          <el-form-item style="float: right">
            <el-button type="success"  @click="onNewClick">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>


      <el-table
        :data="data"
        v-loading="tableLoading"
        @sort-change="onSort">

        <el-table-column
          prop="id"
          label="id"
          sortable
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="tele"
          label="联系电话"
        >
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
        >
        </el-table-column>

        <el-table-column
          prop="skilled_in"
          label="擅长领域"
        >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="onOrderClick(scope.$index, scope.row)">雇佣</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="onUpdateClick(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="onDeleteClick(scope.$index, scope.row)">删除</el-button>
          </template>
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

      <CreatorDialog
        :visible="newDialogShow"
        @onOK="onNewOK"
        @onCancel="onNewCancel">
      </CreatorDialog>

      <update-dialog
        :visible="updateDialogShow"
        :data="selected_data"
        @onOK="onUpdateOK"
        @onCancel="onUpdateCancel">
      </update-dialog>

      <order-dialog
        :visible="orderDialogShow"
        :expert="selected_data"
        @onOK="onOrderOK"
        @onCancel="onOrderCancel">
      </order-dialog>

    </div>
  </div>
</template>

<script>
  //mixin
  import commonTable from '@/mixins/table'
  //接口
  import {queryExperts, deleteExpert, updateExpert, getExpert, createExpert} from "@/api/expert"
  import { COMPANY_TYPE } from '@/api/const'

  import CreatorDialog from './components/newDialog.vue'
  import UpdateDialog from './components/updateDialog.vue'
  import { getDonwloadImageUrl,getUploadImageUrl } from '@/api'
  import OrderDialog from './components/OrderDIalog'
  import { createEmployment } from '@/api/employment'

  export default {
    mixins: [commonTable],
    components: {CreatorDialog, UpdateDialog,OrderDialog},
    name: "index",
    data() {
      return {
        //配置mixins种curd api方法:
        newMethod: createExpert,
        deleteMethod: deleteExpert,
        updateMethod: updateExpert,
        getMethod: getExpert,
        queryMethod: queryExperts,

        //配置resource_name
        resource_name: 'expert',
        COMPANY_TYPE: COMPANY_TYPE,

        //配置mixin query
        query: { //条件查询 dict  //api查询条件dict
          _like_name: undefined,
          _search_skilled_in: undefined
        },
        query_name: '',
        data: [ ], //列表
        new_data: [],
        newDialogShow: false,
        orderDialogShow: false
      }
    },
    created() {

    },
    methods: {
      onReset() {
        this.query = {  //条件查询 dict
          _like_name: undefined,
          _search_skilled_in: undefined
        }
        this.order = { _order_by: 'id', _desc: true } //order 在
        this.pages._page = 1
        this.fetchData()
      },

      onNewClick() {
        this.newDialogShow = true
      },

      onDeleteClick(index, row) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteExpert(row.id).then((resp)=>{
            if (resp.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
            this.fetchData()
          })

        }).catch(() => {
        });
      },

      onNewOK (data) {
        createExpert(data).then((resp)=>{
          if(resp.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }
          this.fetchData()
        }).catch((err)=>{
          alert('failure')
        })
        this.newDialogShow = false
      },

      onOrderClick(index, row) {
        this.selected_data = row
        this.orderDialogShow = true
      },

      onOrderOK(obj) {
        createEmployment(obj).then((resp)=>{
          if(resp.data.code === 200) {
            this.$message({
              type: 'success',
              message: '雇佣成功!'
            });
          }
        }).catch((err)=>{
          alert('failure')
        })
        this.orderDialogShow = false
      },

      onOrderCancel() {
        this.orderDialogShow = false
      }

      // onUpdateOK (index, row, data) {
      //   updateExpert(row.id, data).then((resp)=>{
      //     if(resp.data.code === 200) {
      //       this.$message({
      //         type: 'success',
      //         message: '修改成功!'
      //       });
      //     }
      //   }).catch((err) => {
      //     alert(123)
      //   })
      //   this.fetchData()
      //   this.updateDialogShow = false
      // },

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
