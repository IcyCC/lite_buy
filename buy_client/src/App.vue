<template>
  <div id="app" style="overflow:scroll;">
    <el-alert v-if="loading" type="error" title="失去本地服务的链接, 马上重试"></el-alert>
    <router-view v-loading="loading" />
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      ping_sdk: undefined,
      loading: false,
      times: 0
    };
  },
  methods: {

  },
  created() {

  },

  beforeDestroy() {
    clearInterval(this.ping_sdk);
  }
};
</script>
<style>
  .company-card .el-loading-spinner i {
    zoom: 300% !important;
  }

</style>
