<template>
  <div class="app-container">


    <div class="app-container">
      <!-- <div>模板列表</div> -->

      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" v-model="query">
          <el-form-item label="公司名字：">
            <el-input v-model="query._like_name" placeholder="请输入公司名字"></el-input>
          </el-form-item>
          <el-form-item label="产品类型：">
            <el-input v-model="query._search_production_kind" placeholder="请输入产品类型"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button plain @click="onReset">重置</el-button>
          </el-form-item>

          <el-form-item style="float: right">
            <el-button type="success"  @click="onNewClick">添加公司</el-button>
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
          label="公司名称"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="imgs"
          label="图片"
          align="center"
          >
          <template slot-scope="scope">
            <el-carousel height="50px" class="table-carousel" indicator-position="none">
              <el-carousel-item v-for="img in scope.row.imgs" :key="img">
                <el-image
                  :src="getDonwloadImageUrl(img)"
                  indicator-position="none"
                  style="height:100%;"
                  fit="scale-down">
                        <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div></el-image>
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-table-column>
        <el-table-column
          prop="owner"
          label="公司法人"
          >
        </el-table-column>
        <el-table-column
          prop="detail"
          label="公司描述"
          >
        </el-table-column>

        <el-table-column
          prop="production_kind"
          label="负责产品"
          >
          <template slot-scope="scope">
           <span style="padding-left: 10px" v-for="item in scope.row.production_kind" :key="item"><el-tag >{{ item }}</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
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

    </div>
  </div>
</template>

<script>
  //mixin
  import commonTable from '@/mixins/table'
  //视频接口
  import { queryCompanys, deleteCompany, updateCompany, getCompany, createCompany } from '@/api/company'
  import { COMPANY_TYPE } from '@/api/const'

  import CreatorDialog from './components/newDialog.vue'
  import UpdateDialog from './components/updateDialog.vue'
  import { getDonwloadImageUrl,getUploadImageUrl } from '@/api'

  export default {
    mixins: [commonTable],
    components: { CreatorDialog, UpdateDialog },
    data() {
      return {
        //配置minxin种curd api方法：
        newMethod: createCompany,
        deleteMethod: deleteCompany,
        updateMethod: updateCompany,
        getMethod: getCompany,
        queryMethod: queryCompanys,

        //配置resource_name
        resource_name: 'company',
        COMPANY_TYPE: COMPANY_TYPE,

        //配置mixin query
        query: {  //条件查询 dict  //api查询条件dict
          _like_name: undefined,
          _search_production_kind: undefined
        },

        data: [],  //列表

      }
    },
    created() {
    },
    methods: {
      //Rewrite minxin onReset()  查询条件重置
      onReset() {
        this.query = {  //条件查询 dict
          _like_name: undefined,
          _search_production_kind: undefined
        }
        this.order = { _order_by: 'id', _desc: true } //order 在
        this.pages._page = 1
        this.fetchData()
      },

      onDeleteClick(index, row) {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCompany(row.id).then((resp)=>{
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

      getDonwloadImageUrl(img) {return getDonwloadImageUrl(img)}

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
