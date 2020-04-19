<template>
  <el-dialog :visible="visible" @close="handleCancel" append-to-body>
    <el-row :gutter="20" style="min-height: 500px">
      <el-col :span="6" v-for="company in companys" :key="company.id" style="padding-top: 20px">
        <el-card
        :body-style="{ padding: '0px' }"
        style="height:340px;"
        >
        <el-carousel height="225px" width="125px">
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
                <el-button style="padding-left: 20px" type="text" @click.stop="handleSubmit(company)">采购</el-button>
            </div>

            </div>
        </div>
        </el-card>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleOK">批量租赁</el-button>
    </span>

    <batch-order-dialog
      :visible="orderdialogshow"
      :production_type="production_type"
      @onCancel="onOrderCancel"
      @onOK="onOrderOK">
    </batch-order-dialog>
  </el-dialog>
</template>
<script>
import { getDonwloadImageUrl,getUploadImageUrl } from '@/api'
import BatchOrderDialog from './BatchOrderDialog'
import { createResult } from '@/api/results'
export default {
  props: {
    visible: Boolean,
    companys: Array,
    production_type: String,
    onCancel: Function,
    onOK: Function
  },
  components: { BatchOrderDialog },
  data() {
    return {
      orderdialogshow: false
    }
  },
  methods: {
    handleSubmit(company) {
      this.$emit('onOK', company)
    },
    handleCancel() {
      this.$emit('onCancel')
    },
    handleOK() {
      this.orderdialogshow = true
    },
    onOrderCancel() {
      this.orderdialogshow = false
    },
    onOrderOK(obj) {
      this.companys.forEach(element => {
        obj.company_id = element.id
        let cp = {}
        Object.assign(cp, obj)
        createResult(cp).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '租赁信息提交成功'
            })
          }
        })
      });
      this.orderdialogshow = false
      this.$emit('onCancel')
    },
        getDonwloadImageUrl(img) {return getDonwloadImageUrl(img)},
    getUploadImageUrl() {return getUploadImageUrl()},
  },
  mounted() {
    
  }
}
</script>
