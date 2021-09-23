<template>
  <div>
    <header>My Objects</header>
    <add-object @object-added="getObjects()"></add-object>
    <filter-menu></filter-menu>
    <object-table></object-table>
  </div>
</template>

<script>
import addObject from "./addObject.vue";

import filterMenu from "./filtermenu.vue";
import objectTable from "./objectTable.vue";
export default {
  components: {
    objectTable,
    addObject,
    filterMenu,
  },
  data() {
    return {
      objects: [],
      response: {
        type: null,
      },
    };
  },
  mounted() {
    this.$store.dispatch("getObjects");
  },
};
</script>

<style scoped>
</style>