<template>
  <div class="filter-menu">
    <div class="filter-item">
      <label>Event Name</label>
      <input />
    </div>
    <div class="filter-item">
      <label>Loan Purpose</label>
      <input />
    </div>
    <div class="filter-item">
      <label>Contact Mail</label>
      <input />
    </div>
    <div class="filter-item">
      <label>Loan Status</label>
      <input />
    </div>
    <div class="filter-item">
      <button class="button-main" @click="displayMenu()">
        Search
        <i class="pi pi-search"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.filter-menu {
  display: flex;
  justify-content: left;
  background: var(--bg-s2);
  padding: 10px 10px;
  border-top: black 1px solid;
  border-bottom: black 1px solid;
  box-shadow: 2px 3px 6px 2px grey;
}

.filter-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 2%;
}

.filter-item button{
    margin-top: auto;
    
}
</style>