<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :route-children="routeChildren"
  >
    <template v-if="item.children && item.children.length">
      <v-menu
        v-for="route in item.children"
        :key="route.fullPath"
        :item="route"
      ></v-menu>
    </template>
  </component>
</template>

<script>
import MenuItem from './components/MenuItem'
import Submenu from './components/Submenu'
export default {
  name: 'VMenu',
  components: { MenuItem, Submenu },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      routeChildren: {},
      menuComponent: '',
    }
  },
  created () {
    const showChildren = this.handleChildren(this.item.children)
    if (showChildren.length === 0) {
      this.menuComponent = 'MenuItem'
      this.routeChildren = this.item
    } else if (showChildren.length === 1 && this.item.alwaysShow !== true) {
      this.menuComponent = 'MenuItem'
      this.routeChildren = showChildren[0]
    } else {
      this.menuComponent = 'Submenu'
    }
  },
  methods: {
    handleChildren (children = []) {
      if (children === null) return []
      return children.filter((item) => item.hidden !== true)
    },
  },
}
</script>
<style lang="less">
.anticon {
  margin-right: 3px !important;
}
</style>
