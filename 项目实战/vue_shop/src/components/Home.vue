<template>
  <div class="welcome">
    welcome 智箱云路后台管理系统
    <el-button type="info" @click="loginOut">退出登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.welcome {
  font-size: 24px;
  font-weight: bold;
}
</style>
