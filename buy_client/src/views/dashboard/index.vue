<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name:{{ name }}</div>-->
    <div class="dashboard-text">
      <!--roles:-->
      <!--<span v-for="role in roles" :key="role">{{ role }}</span>-->
      <el-form class="form" inline>
        <template v-for="item in permission_routes">
          <div v-if="item.children && item.meta">
            <div style="margin-top: 20px">{{item.meta.title}}</div>
            <el-row v-if="item.children" :key="item.path" :gutter="20" style="margin-top: 10px">
            <div v-for="c in item.children" :key="c.path">
              <el-col :span="5">
                <el-card
                  class="manage-card"
                  @click.native="handleSelect(c.name)"
                  :key="`menu-${item.name}`"
                >
                   <span class="iconfont"> <svg-icon :icon-class="c.meta.icon"/> {{c.meta.title}} </span>
                </el-card>
              </el-col>
            </div>
            </el-row>
          </div>
        </template>
      </el-form>
    </div>
  </div>
</template>

<script lang="js">
  import ElCard from "element-ui/packages/card/src/main";
  import { mapGetters } from 'vuex'
  export default {
    name: "",
    components: {ElCard},
    data() {
      return {
        not_show: ['/404', '*', 'login']
      }
    },
    methods: {
      handleSelect(name) {
        this.$router.push({name: name});
      }
    },
    computed: {
      ...mapGetters([
        'permission_routes',
      ]),
      router () {
        return  this.$router
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 23px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .ivu-form-item-content {
    height: 100%;
  }
  .manage-card {
    cursor: pointer;
    height: 100%;
    width: 100%;
  }
  .form {
    /*margin: 40px 20px 0 40px;*/
  }

  .manage-card-item {
    width: 100%;
    margin-right: 50px;

  }
</style>
