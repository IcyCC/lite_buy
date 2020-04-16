<template>
  <el-dialog title="添加公司" :visible="visible" @close="handleCancel">
    <el-form :model="data" ref="data" label-width="80px">
      <el-form-item label="公司名称" prop="name">
        <el-input v-model="data.company.name" ref="name" disabled></el-input>
      </el-form-item>

      <el-form-item label="中标类型" prop="type">
        <el-input v-model="data.type" ref="type" disabled></el-input>
      </el-form-item>

      <el-form-item label="产品类型" prop="production_type">
        <el-input v-model="data.production_type" ref="production_type" disabled></el-input>
      </el-form-item>

      <el-form-item label="采购/租赁人" prop="created_by">
        <el-input v-model="data.created_by" ref="created_by" disabled></el-input>
      </el-form-item>

      <el-form-item label="项目内容" prop="content">
        <el-input v-model="data.content" ref="content" disabled></el-input>
      </el-form-item>

      <el-form-item label="评论" prop="comment">
        <el-input type="textarea" v-model="data.comment" ref="comment"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>

import commonUpdateDialog from "@/mixins/update_dialog";

export default {
  mixins: [commonUpdateDialog],
  data() {
    return {     
    };
  },
  methods: {

    handleSubmit() {
      this.$refs.data.validate(valid => {
        if (valid) {
          this.data = {
            ...this.data,
            id: undefined,
            company: undefined,
            created_at: undefined,
            deleted_at: undefined,
            updated_at: undefined,
            updated_by: undefined
          }
          this.$emit("onOK", this.data);
        }
      });
    },
  },

  mounted() {

  }
};
</script>
