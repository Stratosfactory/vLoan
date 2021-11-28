<template>
  <section class="container">
    <div class="panel-header">
    <h2>{{title}}</h2>
    <i class="pi pi-times" @click="togglePanel()"></i>
    </div>
    <div class="panelData">
    <div class="eventTags">
      <div class="tagItem">
        <i class="pi pi-bookmark"></i>
        <p>DUMMY</p>
      </div>

      <div class="tagItem">
        <i class="pi pi-tags"></i>
        <p>{{loanType}}</p>
      </div>
      <div class="tagItem">
        <i class="pi pi-id-card"></i>
        <p>DUMMY</p>
      </div>

      <div class="tagItem">
        <i class="pi pi-flag"></i>
        <p>DUMMY</p>
      </div>
    </div>
    <div class="objects">
      <p>TESTOBJECT</p>
    </div>
  
  </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    loanType: String,
    activeWorkflow: String,
    contact: String,
    objects: Array,
  },
  methods:{
    togglePanel(){
        this.$emit("togglePanel",false)
    }
  }
};
</script>

<style scoped>
.panel-header{
  border-bottom: var(--bg-s1) 1px solid;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.panel-header i{
  margin-left: auto;
  margin-right: 20px;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 50%;
  padding: 2px;
}

.container{
  background: var(--bg-s3);
  padding: 10px 10px;
  margin-top: 10px;
  border-radius: 5px;
}

.panelData{
  display:flex;
  
  
}

.panelData div{
 width: 50%;

}

.eventTags{
  background: cadetblue;
}

.objects{
  background: chocolate;
}


</style>