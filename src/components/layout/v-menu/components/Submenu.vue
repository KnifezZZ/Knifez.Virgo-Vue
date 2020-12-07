<template>
  <a-sub-menu :key="item.fullPath">
    <template v-slot:title>
      <span class="anticon">
        <v-icon :icon="item.meta.icon"></v-icon>
      </span>
      <span>{{ item.meta.title }}</span>
    </template>
    <slot></slot>
  </a-sub-menu>
</template>

<script>
import VIcon from '@/components/v-icon'
export default {
  name: 'Submenu',
  components: { VIcon },
  props: {
    item: {
      type: Object,
      default () {
        return null
      },
    },
    routeChildren: {
      type: Object,
      default () {
        return null
      },
    },
  },
  methods: {},
}
</script>
