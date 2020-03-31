<template>
  <el-dialog title="添加模板" :visible="visible" @close="handleCancel">
    <el-form :model="data" ref="data" :rules="uploadRules" label-width="80px">
      <el-form-item label="类目名称" prop="name">
        <el-input v-model="data.name" ref="name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { isEmpty } from "@/utils/validate";
import commonNewDialog from "@/mixins/new_dialog";

export default {
  mixins: [commonNewDialog],
  data() {
    return {
      data: {
        name: ""
      },
      uploadRules: {
        name: [{ required: true, trigger: "blur", message: "类目名称不能为空" }]

      },

    };
  },
  methods: {
    //获取部门信息

    handleSubmit() {
      this.$refs.data.validate(valid => {
        if (valid) {
          this.$emit("onOK", this.data);
        }
      });
    }
  },
  mounted() {
    window.vue = this;
  }
};
</script>
