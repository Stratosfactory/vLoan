<template>
  <div>
    <header>My Profile</header>
    <section>
      <div class="inputMenu">
        <div class="photocard">
          <i class="pi pi-user"></i>
        </div>
        <div class="userInfo">
          <p> Name: <span> {{ profileInfo.userName }}</span></p>
          <p>E-Mail: <span> {{ profileInfo.email }}</span></p>
          <p>Assigned Role: <span> {{ profileInfo.role }}</span></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    profileInfo() {
      return this.$store.getters.getLoginData;
    },
  },
};
</script>

<style scoped>
.photocard{
    margin-right: 10%;
    align-self: center;
    justify-self: center;
    margin-left: 2%;

}

.photocard i{
    font-size: 8rem;
    background: var(--bg-s2);
    padding: 10px 10px;
    border-radius: 10px;
}

.userInfo {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.userInfo span{
    background: var(--bg-s2);
    padding:1px 1px;
    border-radius: 4px;
}
</style>