<template>
  <div>{{test}}</div>
</template>

<script>
export default {
computed:{
  test(){
    return this.$store.state.login
  }
}
}
</script>

<style>


</style>