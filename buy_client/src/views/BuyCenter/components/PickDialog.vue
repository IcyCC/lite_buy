<template>
  <el-dialog :visible="visible" @close="handleCancel">
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
  </el-dialog>
</template>
<script>
import { getDonwloadImageUrl,getUploadImageUrl } from '@/api'
export default {
  props: {
    visible: Boolean,
    companys: Array,
    onCancel: Function,
    onOK: Function
  },
  data() {
    return {
    }
  },
  methods: {
    handleCancel() {
      this.$emit('onCancel')
    },
    handleSubmit(company) {
      this.$emit('onOK', company)
    },
        getDonwloadImageUrl(img) {return getDonwloadImageUrl(img)},
    getUploadImageUrl() {return getUploadImageUrl()},
  },
  mounted() {
    
  }
}
</script>
