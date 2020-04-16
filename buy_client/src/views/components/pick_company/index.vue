<template>
    <div>
      <el-button icon="el-icon-files" type="primary"  @click="()=>{this.drawer = true}">
          <el-badge :value="companys.length" class="item">
        随机选取
          </el-badge>
</el-button>
      <el-drawer
        title="随机抽选"
        :visible.sync="drawer"
        direction="rtl">
        <span slot="title">随机抽选</span>
        <div>
          <ul style="list-style-type:none">
           <li v-for="company in companys" :key="company.id" style="display: flex;justify-content:space-between;align-items:center;">
            <p><i class="el-icon-info"></i>{{company.name}}</p>
            <el-button type="text" @click="onDeleteClick(company)" style="padding-right:30px">删除</el-button>
           </li>
          </ul>
          <el-divider content-position="right">选取清单</el-divider>
          <el-input-number v-model="num" :min="1" :max="companys.length"></el-input-number>
          <el-button type="primary" style="float: right;" @click="onRandomSelectClick">随机选取</el-button>
        </div>
      </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: {
          companys: {type: Array, default:[]},
          selected: Function,
          onDelete: Function
        },
        data: function () {
          return {
            drawer: false,
            num: 1
          }
        },
        methods: {
          onDeleteClick(company) {
            let newdata = this.companys.filter((item) => {
              return item.id !== company.id
            })
            this.$emit('update:companys', newdata)
            this.$emit('onDelete', company.id)
          },
          onRandomSelectClick() {
            if(this.companys.length) {
              let res = this.randomNum(this.companys, this.num)
              this.$emit('selected', res)
            }
          },
          randomNum(arr, count) {
            var shuffled = arr.slice(0),
              i = arr.length,
              min = i - count,
              temp, index;
            while(i-- > min) {
              index = Math.floor((i + 1) * Math.random());
              temp = shuffled[index];
              shuffled[index] = shuffled[i];
              shuffled[i] = temp;
            }
            return shuffled.slice(min)
          }
        }
    }
</script>

<style scoped>
  ul li{margin:0;padding:0;margin:0;padding:0;list-style:none;}
</style>
