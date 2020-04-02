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
           <li v-for="company in companys" >
             <el-button type="danger" icon="el-icon-delete" circle @click="onDeleteClick(company)"></el-button>
             {{company.name}}公司
           </li>
          </ul>
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
          selected: Function
        },
        data: function () {
          return {
            drawer: false,
          }
        },
        methods: {
          onDeleteClick(company) {
            let newdata = this.companys.filter((item) => {
              return item.id !== company.id
            })
            this.$emit('update:companys', newdata)
          },
          onRandomSelectClick() {
            if(this.companys.length) {
              let n = this.randomNum(0, this.companys.length)
              this.$emit('selected', this.companys[n])
            }
          },
          randomNum(minNum, maxNum) {
            switch (arguments.length) {
              case 1:
                return parseInt(Math.random() * minNum, 10);
                break;
              case 2:
                return parseInt(Math.random() * ( maxNum - minNum ) + minNum, 10);
                break;
              default:
                return 0;
                break;
            }
          }
        }
    }
</script>

<style scoped>
  ul li{margin:0;padding:0}
</style>
