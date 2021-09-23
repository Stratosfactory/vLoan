<template>
  <div class="filter-menu">
    <div class="filter-item">
      <label>Product Family</label>
      <select v-model="filterInput.productFamily">
        <option>Family A</option>

        <option>Family B</option>
        <option>Family C</option>
      </select>
    </div>
    <div class="filter-item">
      <label>Model</label>
      <input v-model="filterInput.model" />
    </div>

    <div class="filter-item">
      <label>Reference Number</label>
      <input v-model="filterInput.referenceNumber"/>
    </div>

    <div class="filter-item">
      <label>Serial Number</label>
      <input v-model="filterInput.serialNumber" />
    </div>
    <div class="filter-item">
      <label>Material</label>
      <select v-model="filterInput.material">
        <option>Gold</option>
        <option>Silver</option>
        <option>Iron</option>
      </select>
    </div>

    <div class="filter-menu-button">
      <button class="button-main" @click="submitPayload()">
        Search
        <i class="pi pi-search"></i>
      </button>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterInput: {
        productFamily: null,
        model: null,
        referenceNumber: null,
        serialNumber: null,
        material: null,
      },
    };
  },
  methods:{
    submitPayload(){
      this.$store.dispatch("getObjects",this.filterInput)
    }
  }
};
</script>

<style>
</style>