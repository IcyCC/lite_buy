<template>
  <el-dialog :visible="visible" @close="handleCancel">
    <el-carousel height="400px">
      <el-carousel-item v-for="img in company.imgs" :key="img" style="text-align:center">
        <el-image
          :src="getDonwloadImageUrl(img)"
          style="height:100%;"
          fit="scale-down">
                <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
      </el-image>
      </el-carousel-item>
    </el-carousel>
    <div style="padding: 14px;">
      <el-form :model="company" label-width="80px">
        <el-form-item label="公司名称" prop="name">
          {{ company.name }}
        </el-form-item>

        <el-form-item label="公司法人" prop="owner">
          {{ company.owner }}
        </el-form-item>

        <el-form-item label="联系电话" prop="tele">
          {{ company.tele }}
        </el-form-item>

        <el-form-item label="公司描述" prop="detail">
          {{ company.detail }}
        </el-form-item>

        <el-form-item label="公司产品" prop="productions">
          <el-row :gutter="20">
            <el-col :span="6" v-for="production in company.productions" :key="production.id" style="padding-top: 20px">
              <el-card
                :body-style="{ padding: '0px' }"
                style="height:300px;">
                <el-carousel height="120px" type="card">
                  <el-carousel-item v-for="img in production.imgs" :key="img">
                    <el-image
                      :src="getDonwloadImageUrl(img)"
                      style="height:100%;"
                      fit="scale-down">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div></el-image>
                  </el-carousel-item>
                </el-carousel>
                <div style="padding: 14px;overflow:auto;height:180px;">
                  <span>产品名称：{{production.name}}</span>
                  <div class="bottom clearfix">
                    <div class="detail">{{ production.detail }}</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <el-divider>历史订单</el-divider>
      <HistoryOrder :company_id="company.id"></HistoryOrder>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOK">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import { getDonwloadImageUrl,getUploadImageUrl } from '@/api'
  import HistoryOrder from '@/views/components/history_order'

export default {
  props: {
    visible: Boolean,
    company: Object,
    onCancel: Function,
    onOK: Function
  },
  components: { HistoryOrder },
  methods: {

    getDonwloadImageUrl(img) {return getDonwloadImageUrl(img)},
    getUploadImageUrl() {return getUploadImageUrl()},
    handleCancel() {
      this.$emit('onCancel')
    },
    handleOK() {
      this.$emit('onOK')
    }
  },
  mounted() {
    
  }
}
</script>
