<template>
  <el-dialog :visible="visible" @close="handleCancel">
    <el-form :model="data" ref="data" label-width="80px">
      <el-form-item label="专家名称">
        <el-input v-model="expert.name" disabled></el-input>
      </el-form-item>

      <el-form-item label="雇佣人" prop="created_by">
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
    expert: Object,
    onCancel: Function,
    onOK: Function
  },
  data() {
    return {
      data: {
        expert_id: 0,
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
      this.data.expert_id = this.expert.id
      this.$emit('onOK', this.data)
    }
  },
  mounted() {
    
  }
}
</script>
