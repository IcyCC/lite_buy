<template>
  <el-dialog :title="production_type+'采购'" :visible="visible" @close="handleCancel" append-to-body>
    <el-form :model="data" ref="data" label-width="80px">

      <el-form-item label="采购人" prop="created_by">
        <el-input v-model="data.created_by"></el-input>
      </el-form-item>

      <el-form-item label="项目内容" prop="content">
        <el-input v-model="data.content"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    production_type: String,
    onCancel: Function,
    onOK: Function
  },
  data() {
    return {
      data: {
        company_id: 0,
        type: '采购',
        production_type: '',
        content: '',
        created_by: ''
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit('onCancel')
    },
    handleSubmit() {
      this.data.production_type = this.production_type
      this.$emit('onOK', this.data)
    }
  },
  mounted() {
    
  }
}
</script>
