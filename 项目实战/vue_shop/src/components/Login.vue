<template>
  <div class="login_container">
    <div class="title">
      <h1>智箱云路后台管理系统</h1>
    </div>
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <!-- <img src="../assets/login_init.png" :class="isInput?'active':''" alt /> -->
        <img src="../assets/inputzhanghao.png" :class="isInput?'active':''" alt />
        <img src="../assets/inputpassword.png" :class="!isInput?'active':''" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="LoginFormRef"
        :model="loginForm"
        :rules="LoginFormRules"
        label-width="0px"
        class="login_form"
      >
        <div class="title_1">登录</div>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户"
            @focus="change1"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
            placeholder="请输入密码"
            @focus="change2"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btn_s">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      isInput: false,
      // 这是表单的验证规则对象
      LoginFormRules: {
        username: [
          { required: true, message: '请输入用户', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在3到6个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    change1() {
      this.isInput = false
    },
    change2() {
      this.isInput = true
    },
    resetLoginForm() {
      // 点击重置按钮,重置登录表单
      this.$refs.LoginFormRef.resetFields()
      this.isInput = false
    },
    login() {
      // 登录之前先进行表单验证
      this.$refs.LoginFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return false // 如果验证不通过就不发请求
        const { data } = await this.$http.post('login', this.loginForm)
        if (data.meta.status !== 200) return this.$message.error('登录失败')
        // console.log('登录成功');
        this.$message.success('登录成功')
        // 1.将登录成功之后的token,保存到客户端的sessionStorage中
        // 1.1项目中除了登录之外的其他接口，必须在登录之后才可以访问
        // 1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        console.log(data)
        window.sessionStorage.setItem('token', data.data.token)
        this.$router.push('/home')
        // 2.通过编程式导航跳转到后台主页 路由地址是/home
      })
    }
  }
}
</script>

<style lang="less" scoped>
// scope 只是定义自己的样式的
.title {
  text-align: center;
  color: #eee;
  position: absolute;
  //   top: 100px;
  left: 50%;
  font-size: 28px;
  transform: translate(-50%);
}
.login_container {
  //   background-image: url("../assets/background.jpg");
  background-color: #2b4b6b;
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100%;
}
.login_box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -80%);
    img {
      height: 100%;
      width: 100%;
    }
  }
  .avatar_box .active {
    display: none;
  }
}
.btn_s {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px; //上下 左右
  box-sizing: border-box;
  .title_1 {
    margin-left: 150px;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: bold;
    color: #409eff;
  }
}
</style>
