<template>
  <el-container class="home-container">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="image_1">
         <img  src="../assets/logo_1.jpg" :class="isCollapse?'active':''" alt />
      </div>
      <div class="toggle-button" @click="toggleCollapse">{{isCollapse?'展开':'折叠'}}</div>
      <!-- 侧边栏菜单区域 -->
      <el-menu :default-active="activePath" :router="true" :collapse-transition="false" :collapse="isCollapse" unique-opened background-color="#0a143d" text-color="#fff" active-text-color="#409EFF">
        <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据预测分析</span>
        </template>
        <el-menu-item-group>
          <template slot="title">垃圾桶</template>
          <el-menu-item index="1-1">动态调整</el-menu-item>
          <el-menu-item index="1-2">路线规划</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="垃圾分类">
          <el-menu-item index="1-3">商家</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">政府预测</template>
          <el-menu-item index="1-4-1">人群密度</el-menu-item>
        </el-submenu>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>垃圾分类</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="1-1">干垃圾</el-menu-item>
          <el-menu-item index="1-2">湿垃圾</el-menu-item>
             <el-menu-item index="1-3">可回收垃圾</el-menu-item>
          <el-menu-item index="1-4">有害垃圾</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分类的次数">
          <el-menu-item index="1-5">次数</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">垃圾桶状态</span>
      </el-menu-item>
       <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>职工管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">员工信息</el-menu-item>
          <el-menu-item index="1-2">员工排行</el-menu-item>
        </el-menu-item-group>
          <el-menu-item index="1-3">回收日志</el-menu-item>
      </el-submenu>
        <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">意见反馈</span>
        </el-menu-item>-->

        <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
          <!-- 一级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i :class="iconObj[item.id]"></i>
            <!-- 文本 -->
            <span>{{item.authName}}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item @click="saveNav('/'+subItem.path)" :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{subItem.authName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="height: 111.36px;">
        <span>智箱云路后台管理系统</span>
        <el-button type="info" @click="loginOut" class="bts">退出登录</el-button>
      </el-header>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    toggleCollapse() {
      // 点击按钮 切换与展开
      this.isCollapse = !this.isCollapse
    },
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      //  解构赋值得到data 并且重命名为res
      if (res.meta.status !== 200) return res.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(res)
    },
    saveNav(activePath) {
      // 保存链接的激活状态
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  span {
    height: 50px;
    width: 300px;
    font-size: 28px;
    margin-left: 43px;
    margin-top: 30px;
    font-weight: bold;
  }
  .bts {
    height: 36px;
    margin-top: 30px;
  }
}
.el-aside {
  background-color: #0a143d;
  .el-menu {
  border-right:none
  }
  .image_1 img {
    height: 66.36px;
    width: 66.36px;
    margin: 20px 66.36px;
    border-radius: 50%;
  }
   .image_1  .active {
    height: 45px;
    width: 40px;
    margin: 32px 8px;
    border-radius: 50%;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  color: #ffffff;
  line-height:24px;
  text-align: center;
  cursor: pointer;
}
</style>
