<template>
  <div>
      <header>My Profile</header>
      <section>
          <div class=" inputMenu">
              <p>{{profileInfo}}</p>
          </div>
      </section>
  </div>
</template>

<script>
export default {
    computed:{
        profileInfo(){
            return this.$store.getters.getLoginData
        }
    }
}
</script>

<style>

</style>