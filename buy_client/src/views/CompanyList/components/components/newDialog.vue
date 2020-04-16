<template>
  <el-dialog title="添加产品" :visible="visible" @close="handleCancel" append-to-body>
    <el-form :model="data" ref="data" label-width="80px">
      <el-form-item label="产品名称" prop="name">
        <el-input v-model.trim="data.name" ref="name"></el-input>
      </el-form-item>

      <el-form-item label="产品详情" prop="detail">
        <el-input v-model.trim="data.detail" ref="detail"></el-input>
      </el-form-item>

      <el-form-item label="产品类型" prop="production_kind">
        <el-select v-model="data.production_kind" placeholder="请选择">
          <el-option v-for="kind in kinds" :label="kind.name" :key="kind.name" :value="kind.name"></el-option>
        </el-select>
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
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import commonNewDialog from "@/mixins/new_dialog";
import { getDonwloadImageUrl,getUploadImageUrl } from '@/api'
import { queryKinds } from '@/api/kinds'

export default {
  mixins: [commonNewDialog],
  data() {
    return {
      data: {
        name: '',
        detail: '',
        production_kind: '',
        imgs: []
      },
      kinds: [],
      files: []

    };
  },
  methods: {
    //获取部门信息

    getDonwloadImageUrl(img) {return getDonwloadImageUrl(img)},
    getUploadImageUrl() {return getUploadImageUrl()},
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
