<template>
  <div class="filter-menu">
    <div class="filter-item">
      <label>Loan Name</label>
      <input v-model="filterInputs.loanName" />
    </div>
    <div class="filter-item">
      <label>Loan Purpose</label>
      <select v-model="filterInputs.loanPurpose">
        <option>Event</option>>
        <option>Photoshooting</option>
        <option>Testing</option>
        
        </select>
    </div>
   
    <div class="filter-item">
      <label>Loan Status</label>
      <select v-model="filterInputs.loanStatus">
        <option>Submitted</option>>
        <option>Approved</option>
        <option>Released</option>
        <option>Rejected</option>
        </select>
    </div>
    <div class="filter-item">
      <label>Start Date</label>
      <input type="date" v-model="filterInputs.loanStartDate"/>
    </div>
    <div class="filter-item">
      <label>End Date</label>
     
      <input type="date" v-model="filterInputs.loanEndDate"/>
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
data(){
  return{
   
    filterInputs:{
      loanName:null,
      loanPurpose: null,
      loanStatus:null,
      loanStartDate: null,
      loanEndDate: null,
    }
  }
},
methods:{
  setStartDate(){
    
    this.filterInputs.loanStartDate = new Date().toISOString().substr(0, 10)
  },
  submitPayload(){
    this.$store.dispatch("getEvents",this.filterInputs)

  }
},
mounted(){
   this.setStartDate();
   this.submitPayload();
}

};
</script>

<style>

</style>