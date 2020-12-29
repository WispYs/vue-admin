<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 v-if="loginRole === 0" class="title">{{ title1 }}</h3>
        <h3 v-else class="title">{{ title2 }}</h3>
      </div>

      <el-form-item v-if="loginRole === 0" prop="mobile">
        <span class="svg-container">
          <i class="el-icon-mobile-phone" style="font-size: 16px;margin-left: -1px" />
        </span>
        <el-input
          ref="mobile"
          v-model="loginForm.mobile"
          placeholder="手机号码"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item v-else prop="loginname">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="mobile"
          v-model="loginForm.loginname"
          placeholder="账号昵称"
          name="loginname"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <div class="tips">
        <span v-if="loginRole === 0" @click="toggleRole(1)">切换到管理员登录</span>
        <span v-else @click="toggleRole(0)">切换到常规登录</span>
        <span @click="$router.push({name: 'Register'})">注册</span>
      </div>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;letter-spacing:5px" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { isMobile, validUserPassword } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!validUserPassword(value)) {
        callback(new Error('只能输入3-20个字母、数字、下划线'))
      } else {
        callback()
      }
    }
    return {
      loginRole: 0, // 0 - 普通账号登录；1 - 管理员登录
      title1: '上海泷得自动化后台管理系统',
      title2: '泷得管理员登录',
      loginForm: {
        mobile: '',
        loginname: '',
        password: ''
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
        loginname: [{ required: true, message: '请输入账号昵称', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.$set(this.loginForm, 'mobile', this.$store.getters.mobile)
  },
  methods: {
    // 切换登录角色
    // 0 - 普通账号登录；1 - 管理员登录
    toggleRole(val) {
      this.loginRole = val
      this.loginForm = {
        mobile: '',
        password: ''
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 后台用户登录和管理员登录为不同接口
          const loginUrl = this.loginRole ? 'user/adminLogin' : 'user/login'
          this.loading = true
          this.$store.dispatch(loginUrl, this.loginForm).then((response) => {
            this.$message.success(response.message)
            // this.$router.push({ path: this.redirect || '/' })
            this.$router.push({ path: '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      letter-spacing: 1px;
    }
  }

  .tips {
    font-size: 13px;
    text-align: right;
    margin: 10px 10px 20px 0;
    span {
      margin-left: 20px;
      color: #409EFF;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
