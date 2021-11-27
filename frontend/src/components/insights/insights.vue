<template>
<section>
  
 <header>My Insights</header>
 <div class="tabControls">
    <button class="button-main" @click="switchTabs('eventView')">Event Insights</button>
    <button class="button-main" @click="switchTabs('objectView')">Object Insights</button>
  </div>
    <event-view v-if="view === 'eventView'"></event-view>
    <object-view v-if="view === 'objectView'"></object-view>
</section>
</template>

<script>
import eventView from "./eventView.vue"
import objectView from "./objectView.vue"
export default {
  components:{
    eventView,objectView
  },
  data(){
    return{
      view:"eventView"
    }
  },
  methods:{
    switchTabs(tabName){
        this.view = tabName
        
    }
  }
}
</script>

<style scoped>
.tabControls{
  display: flex;

}

.tabControls button{
   border-radius: 10px 10px 0 0 !important;
   margin-right:10px;
  
}

</style>