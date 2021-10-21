<template>
  <div>
     <header>My Loan Events</header>
    <lend-scheduler></lend-scheduler>
    <filter-menu></filter-menu>
    <event-display></event-display>
  </div>
</template>

<script>
import lendScheduler from "./lendScheduler.vue"
import eventDisplay from "./eventDisplay.vue"
import filterMenu from "./filterMenu.vue"
export default {
 components:{
   lendScheduler,eventDisplay,filterMenu
 },
}
</script>

<style>

</style>