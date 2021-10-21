<template>
  <section>
    <div>
      <p>{{getEvent}}</p>
    </div>
  </section>
</template>

<script>
export default {
computed:{
  getEvent(){
    return this.$store.getters.eventGetter
  },
 
},
 mounted(){
    this.$store.dispatch("getEventTasks")
  }
}
</script>

<style>

</style>