<template>
  <a-row>
    <a-col>
      <a-input type="text" v-model:value="ipt" />
      <a-button>Hello</a-button>
    </a-col>
  </a-row>
</template>

<script>
export default {
  data() {
    return {
      ipt: "",
    }
  },
  watch: {
    ipt(newValue, oldValue) {
      debugger
    },
  },
}
</script>

<style></style>
