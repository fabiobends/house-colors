<template>
  <div
    class="shadow rounded"
    :class="[isSmall ? 'box-small' : 'box']"
    :style="{
      backgroundColor: '#' + hexColor,
    }"
  ></div>
</template>

<script lang="ts">
export default {
  name: 'BoxItem',
  props: {
    id: { type: String, default: '' },
    isSmall: Boolean,
    hexColor: { type: String, default: '' },
    onClickBox: { type: Function, default: () => {} },
  },
}
</script>

<style>
.box {
  height: 200px;
  width: 200px;
}

.box-small {
  height: 100px;
  width: 100px;
}
</style>
