  <template>
  <a-layout id="layout-virgo-custom-trigger">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img :src="require('@/assets/logo.png')" />
        <h1 v-show="!collapsed">{{ projectName }}</h1>
      </div>
      <a-menu theme="light" mode="inline" v-model:selectedKeys="selectedKeys">
        <v-menu v-for="route in routes" :key="route.path" :item="route" />
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade-transform">
            <component :is="Component" />
          </transition>
        </router-view>
        <!-- <keep-alive :include="cachedViews">
        </keep-alive> -->
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>


<script>
import config from '@/configs/index'
import { mapActions, mapGetters } from 'vuex'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
export default {
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  data () {
    return {
      selectedKeys: ['1'],
      collapsed: false,
      projectName: config.projectName
    };
  },

  computed: {
    ...mapGetters({
      collapse: 'settings/collapse',
      routes: 'routes/routes',
      device: 'settings/device',
    })
  },
  methods: {
    ...mapActions({})
  }
};
</script>
<style lang='less'>
#layout-virgo-custom-trigger {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    :hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    img {
      height: 32px;
      margin: 2px 6px;
      display: inline;
    }
    h1 {
      display: inline-block;
      font-size: 20px;
    }
  }
  .ant-layout-sider {
    background: #fff;
  }
}
</style>
