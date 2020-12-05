<template>
  <div class="login-container">
    <a-row>
      <a-col :xs="0" :md="0" :sm="12" :lg="14" :xl="16"></a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="6">
        <div class="login-container-form">
          <div class="login-container-hello">hello!</div>
          <div class="login-container-title">
            欢迎来到 {{ projectName }}-{{ version }}
          </div>
          <a-form :model="form" @submit="handleSubmit" @submit.prevent>
            <a-form-item>
              <a-input v-model:value="form.userid" placeholder="UserName">
                <template v-slot:prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-model:value="form.password"
                type="password"
                placeholder="Password"
              >
                <template v-slot:prefix>
                  <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                :disabled="form.username === '' || form.password === ''"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
    <div class="login-container-tips">
      Powered by .NET5 & vue{{ dependencies.vue }}
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import config from "@/configs/index";
import { dependencies } from '../../../package.json';
export default {
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined,
  },
  data () {
    return {
      version: config.version,
      projectName: config.projectName,
      dependencies: dependencies,
      form: {
        userid: '',
        password: '',
        cookie: false,
      },
      redirect: undefined
    }
  },
  computed: {
  },
  watch: {
    $route: {
      handler (route) {
        this.redirect = (route.query && route.query.redirect) || '/'
      },
      immediate: true,
    },
  },
  mounted () {
    if (config.development) {
      this.form.userid = 'admin'
      this.form.password = '000000'
    }
  },
  methods: {
    ...mapActions({
      login: 'user/login',
    }),
    handleRoute () {
      return this.redirect === '/404' || this.redirect === '/403'
        ? '/'
        : this.redirect
    },
    async handleSubmit () {
      await this.login(this.form)
      await this.$router.push(this.handleRoute())
    },
  },
}
</script>
<style lang="less">
.login-container {
  height: 100vh;
  background: #e0e0e0;
  &-form {
    width: calc(100% - 40px);
    height: 380px;
    padding: 4vh;
    margin-top: calc((100vh - 380px) / 2);
    margin-right: 20px;
    margin-left: 20px;
    background: #fff;
    background-size: 100% 100%;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
  }
  &-hello {
    font-size: 32px;
    color: #512bd4;
  }
  &-title {
    margin-bottom: 30px;
    font-size: 20px;
    color: #512bd4;
  }
  &-tips {
    position: fixed;
    width: 100%;
    height: 40px;
    color: rgba(105, 102, 102, 0.856);
    bottom: 0px;
    text-align: center;
  }
  .ant-input {
    width: 400px;
    height: 35px;
  }
  .ant-btn {
    width: 365px;
    height: 45px;
    border-radius: 99px;
  }
}
</style>
