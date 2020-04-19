<template>
  <div class="app-container">


    <div class="app-container" v-loading="pageLoading">
      <!-- <div>模板列表</div> -->
        <el-row :gutter="20">
          <el-tabs v-model="activeName" type="card" @tab-click="onTabClick">
            <el-tab-pane v-for="kind in kinds" :key="kind" :label="kind" :name="kind">

              <el-row :gutter="20" style="min-height: 500px" v-loading="tableLoading">
                <el-col :span="6" v-for="company in data" :key="company.id" style="padding-top: 20px">
                  <el-card
                    class="company-card"
                    :body-style="{ padding: '0px' }"
                    style="cursor:pointer;height:340px;"
                    @click.native="onCardClick(company)"
                    >
                    <el-carousel height="225px" width="125px"
                                        v-loading="company.picked"
                    element-loading-spinner="el-icon-success"
                    >
                      <el-carousel-item v-for="img in company.imgs" :key="img">
                        <el-image
                          :src="getDonwloadImageUrl(img)"
                          style="height:100%;"
                          fit="scale-down">
                                <div slot="error" class="image-slot">
                              <i class="el-icon-picture-outline"></i>
                            </div></el-image>
                      </el-carousel-item>
                    </el-carousel>
                    <div style="padding: 14px;">
                      <span>公司名称：{{company.name}}</span>
                      <div class="bottom clearfix">
                        <div class="detail">{{ company.detail }}</div>
                        <div style="float: right; bottom:10px">
              
                            <template v-if="company.picked">
              <el-button type="text" @click.stop="onCancelSelectClick(company, $event)"> 取消</el-button>
                            </template>
                                                      <template v-else>
                            <el-button type="text" @click.stop="onSelectClick(company, $event)">选取</el-button>
                            </template>
                            <el-button style="padding-left: 20px" type="text" @click.stop="onOrderClick(company)">采购</el-button>
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
        <pick_company
          :companys.sync="selected_companys"
          style="position: absolute; bottom:250px; right: 0px"
          @click="show=!show"
          @selected="handleSelected"
          @onDelete="handleDelete"></pick_company>
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

      <pick-dialog
        :visible="pick_dialog_show"
        :production_type="activeName"
        :companys="pre_order_companys"
        @onOK="handlePickedOK"
        @onCancel="handlePickedCancel">
      </pick-dialog>

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
  import { queryKinds } from '@/api/kinds'
  import { getDonwloadImageUrl,getUploadImageUrl } from '@/api'
  import PickDialog from './components/PickDialog'

  export default {
    mixins: [commonTable],
    components: { Sticky, pick_company, DetailDialog, OrderDialog, PickDialog },
    data() {
      return {
        kinds: [],
        activeName: '',

        //配置minxin种curd api方法：
        queryMethod: queryCompanys,

        //配置resource_name
        resource_name: 'company',
        //配置mixin query
        query: {  //条件查询 dict  //api查询条件dict
          _search_type: '|采购|',
          _search_production_kind: this.activeName
        },

        data: [],  //列表

        selected_company: {},
        detail_dialog_show: false,
        order_dialog_show: false,
        selected_companys: [],
        pre_order_companys: [],
        pick_dialog_show: false,
        pageLoading: false

      }
    },
    
    methods: {

    getDonwloadImageUrl(img) {return getDonwloadImageUrl(img)},
    getUploadImageUrl() {return getUploadImageUrl()},
      //Rewrite minxin onReset()  查询条件重置
      onTabClick() {
        this.query._search_production_kind = '|' + this.activeName + '|'
        this.order = { _order_by: 'id', _desc: true } //order 在
        this.pages._page = 1
        this.fetchData()
        this.selected_companys = []
      },

      updateLocal(data) {
        this.data = []
        data[this.resource_name + 's'].forEach((item) => {
          item.picked = false
          this.selected_companys.forEach(com => {
            if(com.id === item.id) {
              item.picked = true
              return
            }
          })
          this.data.push(item)
        })
        
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
              message: '采购信息提交成功'
            })
          }
        })
      },

      onSelectClick(company, event) {
        company.picked = true
        let exist = false
        this.selected_companys.forEach(element => {
          if(company.id === element.id) {
            exist = true
            return
          }
        });
        if(!exist)
          this.selected_companys.push(company)
      },

      onCancelSelectClick(company, event) {
        company.picked = false
        let exist = false
        this.selected_companys = this.selected_companys.filter((item)=>{ return item.id != company.id})
      },
      handleDelete(id) {
        this.data.forEach(item => {
          if(item.id === id)
            item.picked = false
        })
      },

      handleSelected(arr) {
        this.pre_order_companys = arr
        this.pick_dialog_show = true
      },

      handlePickedOK(company) {
        this.pick_dialog_show = false
        this.onOrderClick(company)
      },

      handlePickedCancel() {
        this.pick_dialog_show = false
      }

    },
    mounted() {
      this.pageLoading = true
      let params = { _order_by: 'id', _desc: true, _page: 1, _per_page: 30 }
      queryKinds(params).then((res) => {
        res.data.kinds.forEach(k => {
          this.kinds.push(k.name)
        })
        this.activeName = this.kinds[0]
        this.pageLoading = false
        this.onTabClick()
      })
      
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

  .detail {
    font-size: 13px;
    color: #999;
display:-webkit-box;
    text-overflow: ellipsis;
     overflow:hidden;
 -webkit-text-overflow:ellipsis;
 -o-text-overflow:ellipsis;
 
-webkit-box-orient:vertical;
-webkit-line-clamp:2;
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
