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
        <el-checkbox-group v-model="data.type">
          <el-checkbox v-for="item in COMPANY_TYPE" :key="item" :label="item" :value="item" border>{{item}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

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
              <el-carousel height="200px" width="125px">
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
              <div style="padding: 14px;">
                <span>产品名称：{{production.name}}</span>
                <div class="bottom clearfix">
                  <div class="detail">{{ production.detail }}</div>
                  <div style="float: right; bottom:10px">
                    <el-button @click.stop="onProductionUpdateClick(production, $event)" plain>修改</el-button>
                    <el-button type="danger" @click.stop="onProductionDeleteClick(production.id, $event)" plain>删除</el-button>
                  </div>

                </div>
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
import commonUpdateDialog from "@/mixins/update_dialog";
import { queryKinds } from '@/api/kinds'
import { COMPANY_TYPE } from '@/api/const'
import { getDonwloadImageUrl,getUploadImageUrl } from '@/api'
import { createProduction, updateProduction } from '@/api/production'

import NewDialog from './components/newDialog'
import UpdateDialog from './components/updateDialog'

export default {
  mixins: [commonUpdateDialog],
  components: { NewDialog, UpdateDialog },
  data() {
    return {
      COMPANY_TYPE:COMPANY_TYPE,
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
      kinds:[],
      pictureVisible: false,
      dialogImageUrl: '',
      newDialogShow: false,
      updateDialogShow: false,
      selected_data: {}
    };
  },
  methods: {


    handleSubmit() {
      this.$refs.data.validate(valid => {
        if (valid) {
          this.data = {
            ...this.data,
            id: undefined,
            created_at: undefined,
            created_by: undefined,
            deleted_at: undefined,
            updated_at: undefined,
            updated_by: undefined
          }
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
      this.data.imgs.push(file.response.file_name)
    },

    handleRemove(file) {
      let tmp_files = this.files.filter((item) => {
        return item.name !== file.name
      })
      this.data.imgs = []
      tmp_files.forEach(f => {
        if (f.name){
          this.data.imgs.push(f.name)
        }
      })
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
    getDonwloadImageUrl(img) {return getDonwloadImageUrl(img)},
    getUploadImageUrl() {return getUploadImageUrl()},

    onAddProductionClick() {
      this.newDialogShow = true
    },

    onProductionUpdateClick(production, event) {
      this.selected_data = production
      this.updateDialogShow = true
    },

    onProductionDeleteClick(id, $event) {
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

  computed: {
    files() {
      if (this.data.imgs) {
        let fs = []
        this.data.imgs.forEach((img) => {
          fs.push({
            name: img,
            url: this.getDonwloadImageUrl(img)
          })
        })
        return fs
      } else {
        return []
      }
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
