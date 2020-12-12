<template>
  <a-layout id="layout-virgo-custom-trigger">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img :src="require('@/assets/logo.png')" />
        <h1 v-if="!collapsed">{{ projectName }}</h1>
      </div>
      <a-menu theme="light" mode="inline" v-model:selectedKeys="selectedKeys">
        <v-menu v-for="route in routes" :key="route.path" :item="route" />
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <v-icon class="trigger" icon="indent-increase" v-if="collapsed" @click="() => (collapsed = !collapsed)">
        </v-icon>
        <v-icon class="trigger" icon="indent-decrease" v-else @click="() => (collapsed = !collapsed)"> </v-icon>
        <v-header></v-header>
      </a-layout-header>
      <v-tabs></v-tabs>
      <a-layout-content
        class="main-layout"
        :style="{
          padding: '24px',
        }"
      >
        <router-view v-slot="{ Component }">
          <keep-alive :include="cachedViews">
            <transition mode="out-in" name="fade-transform">
              <component :is="Component" />
            </transition>
          </keep-alive>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import config from "@/configs/index"
import { mapActions, mapGetters } from "vuex"
import VMenu from "./v-menu/index"
import VHeader from "./v-header/index"
import VTabs from "./v-tabs/index"
export default {
  components: {
    VMenu,
    VHeader,
    VTabs,
  },
  data() {
    return {
      selectedKeys: [],
      collapsed: false,
      projectName: config.projectName,
    }
  },

  computed: {
    ...mapGetters({
      cachedViews: "tabsBar/cachedViews",
      collapse: "settings/collapse",
      routes: "routes/routes",
      device: "settings/device",
    }),
  },
  methods: {
    ...mapActions({}),
  },
}
</script>
<style lang="less">
#layout-virgo-custom-trigger {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    :hover {
      color: @primary-color-1;
    }
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    margin: 16px 5px;
    overflow: hidden;
    overflow: hidden;
    font-size: 15px;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    img {
      height: 32px;
      margin: 2px 6px;
      display: inline;
    }
    h1 {
      display: inline-block;
      font-size: 18px;
    }
  }
  .ant-layout-sider {
    background: #fff;
  }
  .main-layout {
    height: 100vh;
    overflow: auto;
  }
}
</style>
