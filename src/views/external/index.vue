<template>
  <div class="external-wrap">
    <iframe
      id="mainiframe"
      :src="url"
      width="100%"
      height="700"
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      scrolling="auto"
      allowtransparency="yes"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "external",
  props: {
    url: String
  }
}

</script>

<style>
</style>