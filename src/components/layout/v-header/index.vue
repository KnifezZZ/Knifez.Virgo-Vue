<template>
  <div class="right-menu">
    <a-dropdown>
      <a-avatar
        shape="square"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      >
      </a-avatar>
      <template #overlay>
        <a-menu @click="handleAvatarClick">
          <a-menu-item key="0">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.alipay.com/"
              >1st menu item</a
            >
          </a-menu-item>
          <a-menu-item key="1">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.taobao.com/"
              >2nd menu item</a
            >
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="LogOut" @click="logOut">
            <v-icon icon="logout-circle-line"></v-icon> Log out
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import UserModule from "@/store/modules/user";
import VIcon from '@/components/v-icon'
export default {
  name: 'VHeader',
  components: {
    VIcon,
  },
  methods: {
    logOut () {
      UserModule.LogOut();
      this.$router.push(`/login.html?redirect=${this.$route.fullPath}`);
    }
  }
}
</script>

<style>
.right-menu {
  float: right;
  height: 100%;
  line-height: 64px;
  padding-right: 10px;
}
</style>