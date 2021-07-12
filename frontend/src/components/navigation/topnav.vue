<template>
  <div v-if="isHome" class="topnav">
    <router-link to="/"><i class="pi pi-home"></i>Home</router-link>
    <div><i class="pi pi-chevron-right"></i></div>
    <p><i :class="getIcon"></i>{{ getActiveName }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getActiveName() {
      return this.$route.name;
    },
    isHome() {
      return this.$route.name === "Home" ? false : true;
    },
    getIcon() {
      return this.$route.meta.icon;
    },
  },
};
</script>

<style scoped>
.topnav {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  justify-items: start;
  justify-content: flex-start;
}
.topnav a {
  margin-right: 10px;
  text-decoration: none;
  color: var(--fc-s1);
  padding: 2px 10px 2px 10px;
  border: white 1px solid;
  border-radius: 20px;
 background:var(--bg-s1);
  font-size: 20px;
}

.topnav a:hover {
  color: var(--fc-s2);
  transform: scale(1.05);
   border: rgb(0, 0, 0) 1px solid;
}
.topnav p {
  color: var(--fc-s2);
  padding: 2px 10px 2px 10px;
  border: rgb(0, 0, 0) 1px solid;
  border-radius: 20px;
  background:var(--bg-s1);
  font-size: 20px;
}

i {
  margin-right: 10px;
}

.topnav div i {
  color: black;
  font-size: 15px;
  align-self: center;
}
</style>