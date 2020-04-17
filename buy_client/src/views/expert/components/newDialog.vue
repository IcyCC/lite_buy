<template>
  <el-dialog title="添加专家" :visible="visible" @close="handleCancel">
    <el-form :model="data" ref="data" :rules="uploadRules" label-width="80px">
      <el-form-item label="专家姓名" prop="name">
        <el-input v-model.trim="data.name" ref="name"></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="tele">
        <el-input v-model.number="data.tele" ref="tele" type='tel'></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="note">
        <el-input v-model="data.note" ref="note"></el-input>
      </el-form-item>

      <el-form-item label="擅长领域" prop="skill_in">
        <el-input v-model="data.skilled_in" ref="skill_in"></el-input>
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
import { queryKinds } from '@/api/kinds'
import { COMPANY_TYPE } from '@/api/const'
import { getDonwloadImageUrl,getUploadImageUrl } from '@/api'

export default {
  mixins: [commonNewDialog],
  data() {
    return {
      COMPANY_TYPE:COMPANY_TYPE,
      data: {
        name: "",
        tele: "",
        note: "",
        skilled_in: '',
      },
      selected_types: [],
      uploadRules: {
        name:  [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        tele: [{validator:
        (rule, value, callback) => {
            if (!value) {
              return callback(new Error('手机号不能为空'));
            } else {
              const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
              console.log(reg.test(value));
              if (reg.test(value)) {
                callback();
              } else {
                return callback(new Error('请输入正确的手机号'));
              }}
          }, trigger: 'blur'},{ required: true, message: '请输入正确的电话', trigger: 'blur' },],
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
    },

    handleChange(resp, file, fileList) {
      this.files = fileList
      this.updateFiles()
    },

    handleRemove(file) {
      this.files = this.files.filter((item) => {
        return item.name !== file.name
      })
      this.updateFiles()
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.pictureVisible = true
    },

    updateFiles() {
      this.data.imgs = []
      this.files.forEach(file => {
        this.data.imgs.push(file.response.file_name)
      })
    }
  },
  mounted() {
    let params = { _order_by: 'id', _desc: true, _page: 1, _per_page: 30 }
    queryKinds(params).then((res) => {
      this.kinds = res.data.kinds
    })
  }
};
</script>
