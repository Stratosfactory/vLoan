<template>
  <div>
     <header>My Loan Events</header>
    <lend-scheduler></lend-scheduler>
    <event-display></event-display>
  </div>
</template>

<script>
import lendScheduler from "./lendScheduler.vue"
import eventDisplay from "./eventDisplay.vue"
export default {
 components:{
   lendScheduler,eventDisplay
 }
}
</script>

<style>

</style>