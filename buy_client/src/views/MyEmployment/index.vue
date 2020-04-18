<template>
  <div class="app-container">


    <div class="app-container">
      <!-- <div>模板列表</div> -->
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
          prop="scope.row.expert"
          label="专家名"
        >
          <template slot-scope="scope">
            {{ scope.row.expert.name }}
          </template>
        </el-table-column>

        <el-table-column
          prop="created_by"
          label="雇佣人"
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

        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="onCommentClick(scope.$index, scope.row)">评论</el-button>
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

      <UpdateDialog
        :visible="updateDialogShow"
        :data="selected_data"
        @onOK="onUpdateOK"
        @onCancel="onUpdateCancel">
      </UpdateDialog>

      <CommentDialog
        :visible="commentDialogShow"
        :data="selected_data"
        @onOK="onCommentOK"
        @onCancel="onCommentCancel">
      </CommentDialog>

    </div>
  </div>
</template>

<script>
  //mixin
  import commonTable from '@/mixins/table'
  //视频接口
  import { queryEmployments, deleteEmployment, updateEmployment, getEmployment, createEmployment } from '@/api/employment'

  import UpdateDialog from './components/updateDialog'
  import CommentDialog from './components/commentDialog'

  export default {
    mixins: [commonTable],
    components: { UpdateDialog, CommentDialog },
    data() {
      return {
        //配置minxin种curd api方法：
        newMethod: createEmployment,
        deleteMethod: deleteEmployment,
        updateMethod: updateEmployment,
        getMethod: getEmployment,
        queryMethod: queryEmployments,

        //配置resource_name
        resource_name: 'employment',


        data: [],  //列表

        commentDialogShow: false

      }
    },
    created() {
    },
    methods: {
      //Rewrite minxin onReset()  查询条件重置
      onReset() {
        this.query = {  //条件查询 dict
          _like_name: undefined
        }
        this.order = { _order_by: 'id', _desc: true } //order 在
        this.pages._page = 1
        this.fetchData()
      },
      onCommentClick(index, row) {
        this.getMethod(row.id).then((resp) => {
          this.selected_data = resp.data[this.resource_name]
        })
        this.commentDialogShow = true
      },
      onCommentOK(obj) {
        this.updateMethod(this.selected_data.id, obj).then((res) => {
          if (res.data.code === 200) {
            this.commentDialogShow = false
            this.$message({
              type: 'success',
              message: '评论成功'
            })
            return this.fetchData()
          }
        })
      },
      onCommentCancel() {
        this.commentDialogShow = false
      },
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
