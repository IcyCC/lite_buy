<template>
  <el-dialog title="添加公司" :visible="visible" @close="handleCancel">
    <el-form :model="data" ref="data" :rules="uploadRules" label-width="80px">
      <el-form-item label="公司名称" prop="name">
        <el-input v-model="data.name" ref="name"></el-input>
      </el-form-item>

      <el-form-item label="公司法人" prop="owner">
        <el-input v-model="data.owner" ref="owner"></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="tele">
        <el-input v-model="data.tele" ref="tele"></el-input>
      </el-form-item>

      <el-form-item label="公司描述" prop="detail">
        <el-input v-model="data.detail" ref="detail"></el-input>
      </el-form-item>

      <el-form-item label="负责产品" prop="production_kind">
        <el-checkbox-group v-model="data.production_kind">
          <el-checkbox v-for="kind in kinds" :label="kind.name" :key="kind.name" border>{{kind.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="公司类型" prop="type">
        <el-radio v-model="data.type" label="租赁">租赁</el-radio>
        <el-radio v-model="data.type" label="采购">采购</el-radio>
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
import commonUpdateDialog from "@/mixins/update_dialog";
import { queryKinds } from '@/api/kinds'

export default {
  mixins: [commonUpdateDialog],
  data() {
    return {
      uploadRules: {
        owner: [{ required: true, trigger: "blur", message: "公司法人不能为空" }],
        name: [{ required: true, trigger: "blur", message: "公司名称不能为空" }],
        tele: [{ required: true, trigger: "blur", message: "联系电话不能为空" }],
        detail: [{ required: true, trigger: "blur", message: "公司详情不能为空" }],
      },
      kinds:[]
    };
  },
  methods: {


    handleSubmit() {
      this.$refs.data.validate(valid => {
        if (valid) {
          console.log(this.data)
          this.$emit("onOK", this.data);
        }
      });
    }
  },
  mounted() {
    window.vue = this;
    let params = { _order_by: 'id', _desc: true, _page: 1, _per_page: 30 }
    queryKinds(params).then((res) => {
      this.kinds = res.data.kinds
    })
  }
};
</script>
