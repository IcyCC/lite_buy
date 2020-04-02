<template>
  <el-dialog :visible="visible" @close="handleCancel">
    <el-carousel height="400px">
      <el-carousel-item v-for="img in company.imgs" :key="img" style="text-align:center">
        <el-image
          :src="'/api/files/download/'+img"
          style="width: 400px; height: 400px"
          fit="scale-down">
                <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
      </el-image>
      </el-carousel-item>
    </el-carousel>
    <div style="padding: 14px;">
      <span>公司名称：{{company.name}}公司</span>
      <div class="bottom clearfix">
        <time class="time">{{ company.detail }}</time>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleOK">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    company: Object,
    onCancel: Function,
    onOK: Function
  },
  methods: {
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
