<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/es/locale/zh_CN"
import "@/assets/css/base.less"
export default {
  name: "App",
  data() {
    return {
      locale: zhCN,
    }
  },
}
</script>
