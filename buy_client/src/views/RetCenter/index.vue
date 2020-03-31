<template>
  <div class="app-container">


    <div class="app-container">
      <!-- <div>模板列表</div> -->
        <el-row :gutter="20">
          <el-tabs v-model="activeName" type="card" @tab-click="onTabClick">
            <el-tab-pane v-for="kind in kinds" :key="kind" :label="kind" :name="kind">

              <el-row :gutter="20" style="min-height: 500px">
                <el-col :span="6" v-for="company in data" :key="company.id" style="padding-top: 20px">
                  <el-card :body-style="{ padding: '0px' }" style="cursor:pointer;" @click.native="onCardClick(company)">
                    <el-carousel height="125px" width="125px">
                      <el-carousel-item v-for="img in company.imgs" :key="img">
                        <el-image
                          :src="'/api/files/download/'+img"
                          fit="fill"></el-image>
                      </el-carousel-item>
                    </el-carousel>
                    <div style="padding: 14px;">
                      <span>公司名称：{{company.name}}公司</span>
                      <div class="bottom clearfix">
                        <time class="time">{{ company.detail }}</time>
                        <div style="float: right">
                            <el-button type="text" @click.stop="onSelectClick(company, $event)">选取</el-button>
                            <el-button style="padding-left: 20px" type="text" @click.stop="onOrderClick(company)">租赁</el-button>
                        </div>

                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>

            </el-tab-pane>
          </el-tabs>
        </el-row>

      <Sticky :stickyTop="800">
      <el-col :span="24" class="toolbar">
        <el-pagination
          @current-change="onPageChange"
          :current-page="pages._page"
          :page-size="pages._per_page"
          background
          layout="total, prev, pager, next"
          :total="total"
          style="float:right;">
        </el-pagination>
      </el-col>
        <pick_company :companys.sync="selected_companys" style="position: absolute; bottom:250px; right: 0px" @click="show=!show" @selected="onOrderClick"></pick_company>
      </Sticky>

      <detail-dialog
        :visible="detail_dialog_show"
        :company="selected_company"
        @onCancel="onDetailDialogCancel"
        @onOK="onDetailDialogOK">
      </detail-dialog>

      <order-dialog
        :visible="order_dialog_show"
        :production_type="activeName"
        :company="selected_company"
        @onCancel="onOrderDialogCancel"
        @onOK="onOrderDialogOK">
      </order-dialog>

    </div>
  </div>
</template>

<script>
  //mixin
  //视频接口
  import commonTable from '@/mixins/table'
  import { queryCompanys } from '@/api/company'
  import Sticky from '@/components/Sticky'
  import pick_company from '@/views/components/pick_company'
  import DetailDialog from './components/DetailDialog'
  import OrderDialog from './components/OrderDIalog'
  import { createResult } from '@/api/results'


  export default {
    mixins: [commonTable],
    components: { Sticky, pick_company, DetailDialog, OrderDialog },
    data() {
      return {
        kinds: ['灯光', '音响', '舞台'],
        activeName: '',

        //配置minxin种curd api方法：
        queryMethod: queryCompanys,

        //配置resource_name
        resource_name: 'company',
        //配置mixin query
        query: {  //条件查询 dict  //api查询条件dict
          _like_type: '|租赁|',
          _like_production_kind: this.activeName
        },

        data: [],  //列表

        selected_company: {},
        detail_dialog_show: false,
        order_dialog_show: false,

        selected_companys: []

      }
    },
    created() {
    },
    methods: {
      //Rewrite minxin onReset()  查询条件重置
      onTabClick() {
        this.query._like_production_kind = '|' + this.activeName + '|'
        this.order = { _order_by: 'id', _desc: true } //order 在
        this.pages._page = 1
        this.fetchData()
      },

      onCardClick(company) {
        this.selected_company = company
        this.detail_dialog_show = true
      },

      onDetailDialogCancel() {
        this.detail_dialog_show = false
      },

      onDetailDialogOK() {
        this.detail_dialog_show = false
      },

      onOrderClick(company) {
        this.selected_company = company
        this.order_dialog_show = true
      },

      onOrderDialogCancel() {
        this.order_dialog_show = false
      },

      onOrderDialogOK(obj) {
        createResult(obj).then((res) => {
          if (res.data.code === 200) {
            this.order_dialog_show = false
            this.$message({
              type: 'success',
              message: '租赁信息提交成功'
            })
          }
        })
      },

      onSelectClick(company, event) {
        let exist = false
        this.selected_companys.forEach(element => {
          if(company.id === element.id) {
            exist = true
            return
          }
        });
        if(!exist)
          this.selected_companys.push(company)
      }

    },
    mounted() {
      // window.vue = this
      this.activeName = this.kinds[0]
      console.log('mounted', this.activeName)
      this.onTabClick()
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

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
