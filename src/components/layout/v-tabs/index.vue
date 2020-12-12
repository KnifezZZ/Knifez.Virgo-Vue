<template>
  <div class="v-tabs">
    <a-dropdown :trigger="['contextmenu']">
      <div class="v-tabs-left-panel">
        <a-tabs
          @tab-click="handleTabClick"
          @edit="handleTabRemove"
          v-model:activeKey="tabActive"
          hide-add
          type="editable-card"
          @contextmenu.prevent="openMenu(item, $event)"
        >
          <a-tab-pane v-for="item in visitedRoutes" :key="item.fullPath" :closable="!isAffix(item)">
            <template #tab>
              <span>
                <v-icon :icon="item.meta.icon" />
                {{ item.meta.title }}
              </span>
            </template>
          </a-tab-pane>
        </a-tabs>
      </div>
      <template #overlay>
        <a-menu @click="handleClick">
          <a-menu-item key="closeOthersTabs">
            <a>关闭其他</a>
          </a-menu-item>
          <a-menu-item key="closeLeftTabs">
            <a>关闭左侧</a>
          </a-menu-item>
          <a-menu-item key="closeRightTabs">
            <a>关闭右侧</a>
          </a-menu-item>
          <a-menu-item key="closeAllTabs">
            <a>关闭全部</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import VIcon from "@/components/v-icon/index"
import { mapActions, mapGetters } from "vuex"
export default {
  name: "VTabs",
  components: {
    VIcon,
  },
  data() {
    return {
      affixTabs: [],
      tabActive: null,
      created: false,
    }
  },
  computed: {
    ...mapGetters({
      visitedRoutes: "tabsBar/visitedRoutes",
      routes: "routes/routes",
    }),
  },
  watch: {
    $route: {
      handler(route) {
        this.addTabs(route)
      },
    },
  },
  created() {
    if (sessionStorage.getItem("visitedTabs")) {
      this.$store.commit("tabsBar/setVisitedRoute", JSON.parse(sessionStorage.getItem("visitedTabs")))
      this.tabActive = this.$route.fullPath
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("visitedTabs", JSON.stringify(this.$store.getters["tabsBar/visitedRoutes"]))
    })
    if (this.visitedRoutes.length === 0) {
      this.initAffixTabs(this.routes)
    }
  },
  unmounted() {
    // window.removeEventListener('beforeunload')
  },
  methods: {
    ...mapActions({
      addVisitedRoute: "tabsBar/addVisitedRoute",
      delVisitedRoute: "tabsBar/delVisitedRoute",
      delOthersVisitedRoutes: "tabsBar/delOthersVisitedRoutes",
      delLeftVisitedRoutes: "tabsBar/delLeftVisitedRoutes",
      delRightVisitedRoutes: "tabsBar/delRightVisitedRoutes",
      delAllVisitedRoutes: "tabsBar/delAllVisitedRoutes",
    }),
    initAffixTabs(routes) {
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) this.addTabs(route)
        if (route.children) this.initAffixTabs(route.children)
      })
    },
    async addTabs(tag) {
      if (tag.name && tag.meta && tag.meta.tagHidden !== true) {
        let matched = [tag.name]
        if (tag.matched) matched = tag.matched.map((item) => item.name)
        await this.addVisitedRoute({
          path: tag.path,
          fullPath: tag.fullPath,
          name: tag.name,
          query: tag.query,
          matched: matched,
          meta: { ...tag.meta },
        })
        this.tabActive = tag.fullPath
      }
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    handleTabClick(tab) {
      const route = this.visitedRoutes.filter((item) => item.path === tab)[0]
      if (this.$route.fullPath !== route.fullPath) this.$router.push(route)
    },
    async handleTabRemove(fullPath) {
      const view = this.visitedRoutes.find((item) => {
        return fullPath === item.fullPath
      })
      await this.delVisitedRoute(view)
      if (this.isActive(view)) this.toLastTag()
    },
    handleClick({ key }) {
      switch (key) {
        case "closeOthersTabs":
          this.closeOthersTabs()
          break
        case "closeLeftTabs":
          this.closeLeftTabs()
          break
        case "closeRightTabs":
          this.closeRightTabs()
          break
        case "closeAllTabs":
          this.closeAllTabs()
          break
      }
    },
    async closeSelectedTag(view) {
      await this.delVisitedRoute(view)
      if (this.isActive(view)) {
        this.toLastTag()
      }
    },
    async closeOthersTabs() {
      await this.delOthersVisitedRoutes(this.toThisTag())
    },
    async closeLeftTabs() {
      await this.delLeftVisitedRoutes(this.toThisTag())
    },
    async closeRightTabs() {
      await this.delRightVisitedRoutes(this.toThisTag())
    },
    async closeAllTabs() {
      await this.delAllVisitedRoutes()
      if (this.affixTabs.some((tag) => tag.path === this.toThisTag().path)) return
      this.toLastTag()
    },
    toLastTag() {
      const latestView = this.visitedRoutes.slice(-1)[0]
      if (latestView) this.$router.push(latestView)
      else this.$router.push("/")
    },
    toThisTag() {
      const view = this.visitedRoutes.find((item) => item.fullPath === this.$route.fullPath)
      if (this.$route.path !== view.path) this.$router.push(view)
      return view
    },
  },
}
</script>
<style lang="less">
.v-tabs {
  padding: 0 20px;
  background: #fdfdfd;
  &-left-panel {
    float: left;
    width: calc(100% - 52px - 20px - 20px);
  }
  &-right-panel {
    float: left;
    width: 52px;
  }
  .ant-tabs {
    user-select: none;
    &-bar {
      margin: 0 !important;
    }
    &-tab {
      margin-right: 5px !important;
      background: #ffffff !important;
      border: 1px solid #dedede !important;
    }
    &-tab-prev,
    &-tab-next {
      height: 32px !important;
      line-height: 32px !important;
    }
    &-tab-active {
      border: 1px solid @primary-color-1 !important;
      border-bottom: 1px solid #fff !important;
      .ant-tabs-close-x {
        color: @primary-color-1 !important;
      }
    }
  }
}
</style>
