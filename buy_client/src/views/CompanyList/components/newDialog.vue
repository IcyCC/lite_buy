<template>
  <el-dialog title="添加公司" :visible="visible" @close="handleCancel" append-to-body>
    <el-form :model="data" ref="data" :rules="uploadRules" label-width="80px">
      <el-form-item label="公司名称" prop="name">
        <el-input v-model.trim="data.name" ref="name"></el-input>
      </el-form-item>

      <el-form-item label="公司法人" prop="owner">
        <el-input v-model.trim="data.owner" ref="owner"></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="tele">
        <el-input v-model.number="data.tele" ref="tele" type='tel'></el-input>
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
        <el-checkbox-group v-model="data.type">
          <el-checkbox v-for="item in COMPANY_TYPE" :key="item" :label="item" :value="item" border>{{item}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- <el-form-item label="产品类型" prop="production_kind">
        <el-select v-model="data.production_kind" multiple placeholder="请选择">
          <el-option v-for="kind in kinds" :label="kind.name" :key="kind.name"></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="上传图片">
        <el-upload
          list-type="picture-card"
          :action="getUploadImageUrl()"
          :on-success="handleChange"
          :file-list="files"
          accept="image/*"
          multiple>
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="pictureVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="公司产品" prop="productions">
        <el-button type="primary" @click.stop="onAddProductionClick()">添加产品</el-button>
        <el-row :gutter="20">
          <el-col :span="6" v-for="production in data.productions" :key="production.id" style="padding-top: 20px">
            <el-card
              :body-style="{ padding: '0px' }"
              style="height:340px;">
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
              <div style="padding: 14px;overflow:auto;height:140px;">
                <span>产品名称：{{production.name}}</span>
                <div class="bottom clearfix">
                  <div class="detail">{{ production.detail }}</div>
                </div>
              </div>
              <div style="float: right; bottom:10px;">
                <el-button size="mini" @click.stop="onProductionUpdateClick(production, $event)" plain>查看</el-button>
                <el-button size="mini" type="danger" @click.stop="onProductionDeleteClick(production.id, $event)" plain>删除</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <new-dialog
      :visible="newDialogShow"
      @onOK="onNewOK"
      @onCancel="onNewCancel">
    </new-dialog>

    <update-dialog
      :visible="updateDialogShow"
      :data="selected_data"
      @onOK="onUpdateOK"
      @onCancel="onUpdateCancel">
    </update-dialog>
  </el-dialog>
</template>
<script>
import commonNewDialog from "@/mixins/new_dialog";
import { queryKinds } from '@/api/kinds'
import { COMPANY_TYPE } from '@/api/const'
import { getDonwloadImageUrl,getUploadImageUrl } from '@/api'
import { createProduction, updateProduction } from '@/api/production'

import NewDialog from './components/newDialog'
import UpdateDialog from './components/updateDialog'

export default {
  mixins: [commonNewDialog],
  components: { NewDialog, UpdateDialog },
  data() {
    return {
      COMPANY_TYPE:COMPANY_TYPE,
      data: {
        owner: "",
        name: "",
        tele: "",
        detail: "",
        type: [],
        production_kind: [],
        imgs: [],
        productions: []
      },
      selected_types: [],
      uploadRules: {
        owner:  [{ required: true, message: '请输入法人名称', trigger: 'blur' }],
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
      kinds: [],
      pictureVisible: false,
      dialogImageUrl: '',
      files: [],
      newDialogShow: false,
      updateDialogShow: false,
      selected_data: {}

    };
  },
  computed: {
  },
  methods: {

    getDonwloadImageUrl(img) {return getDonwloadImageUrl(img)},
    getUploadImageUrl() {return getUploadImageUrl()},
    handleSubmit() {
      this.$refs.data.validate(valid => {
        if (valid) {
          let p = []
          this.data.productions.forEach((item) => {
            p.push(item.id)
          })
          this.data.productions = p
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
    },

    onAddProductionClick() {
      this.newDialogShow = true
    },

    onProductionUpdateClick(production, event) {
      this.selected_data = production
      this.updateDialogShow = true
    },

    onProductionDeleteClick(id, event) {
      this.data.productions = this.data.productions.filter((item) => {
        return item.id !== id
      })
    },

    onNewOK(obj) {
      obj = { ...obj, id: undefined }
      createProduction(obj).then((res) => {
        if (res.data.code === 200) {
          this.newDialogShow = false
          obj.id = res.data.id
          this.data.productions.push(obj)
          this.$message({
            type: 'success',
            message: '创建成功'
          })
        }
      })
    },

    onNewCancel() {
      this.newDialogShow = false
    },

    onUpdateOK(obj) {
      updateProduction(this.selected_data.id, obj).then((res) => {
        if (res.data.code === 200) {
          this.updateDialogShow = false
          this.data.productions = this.data.productions.filter((item) => {
            return item.id !== this.selected_data.id
          })
          obj.id = this.selected_data.id
          this.data.productions.push(obj)
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      })
    },

    onUpdateCancel() {
      this.updateDialogShow = false
    },
  },
  mounted() {
    let params = { _order_by: 'id', _desc: true, _page: 1, _per_page: 30 }
    queryKinds(params).then((res) => {
      this.kinds = res.data.kinds
    })
  }
};
</script>
