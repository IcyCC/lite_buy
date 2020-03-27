<template>
  <el-dialog title="添加模板" :visible="visible" @close="handleCancel">
    <el-form :model="data" ref="data" :rules="uploadRules" label-width="80px">
      <el-form-item label="公司名称" prop="account">
        <el-input v-model="data.name" ref="account"></el-input>
      </el-form-item>

      <el-form-item label="公司法人" prop="uuid">
        <el-input v-model="data.owner" ref="uuid"></el-input>
      </el-form-item>

      <el-form-item label="联系方式" prop="ip">
        <el-input v-model="data.tele" ref="ip"></el-input>
      </el-form-item>

      <el-form-item label=详情 prop="name">
        <el-input v-model="data.detail" ref="name" type="textarea" :rows="3"></el-input>
      </el-form-item>


      <el-form-item label=类型 prop="type">
        <el-select v-model="data.type" multiple placeholder="请选择">
          <el-option
            v-for="item in COMPANY_TYPE"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label=产品类型 prop="type">
        <el-select v-model="data.type" multiple placeholder="请选择">
          <el-option
            v-for="item in COMPANY_TYPE"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
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
import { COMPANY_TYPE } from '@/api/const'

export default {
  mixins: [commonNewDialog],
  data() {
    return {
      COMPANY_TYPE:COMPANY_TYPE,
      data: {
      },
      selected_types: [],
      uploadRules: {
      },

    };
  },
  computed: {
  },
  methods: {

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
