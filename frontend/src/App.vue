<template class="test">
  <div>
    <sidenav @nav-collapse="changeMargin"></sidenav>
    <main :class="[navCollapsed ? 'collapsed' : 'extended']">
      <topnav></topnav>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import topnav from "./components/navigation/topnav.vue";
import sidenav from "./components/navigation/sidenav.vue";

export default {
  name: "App",
  components: {
    topnav,
    sidenav,
  },
  data() {
    return {
      navCollapsed: false,
    };
  },
  methods:{
    changeMargin(bool){
      this.navCollapsed = bool;
    }
  }

};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch&display=swap');

#app {
  font-family: "Roboto Slab", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

html {
  background: #f8f9fa;
}

:root {
  --bg-main: #f8f9fa;
  --bg-s1: rgb(56, 77, 109);;
  --fc-s1: #ffffff;
  --fc-s2:gold;
}

.extended {
  margin-left: 250px;
  animation: slide-in 0.4s ease-out;
}

.collapsed {
  margin-left: 100px;
  animation: slide-out 0.6s;
}

@keyframes slide-in {
  from {
    margin-left: 120px;
  }
  to {
    margin-left: 250px;
  }
}

@keyframes slide-out {
  from {
    margin-left: 250px;
  }
  to {
    margin-left: 100px;
  }
}

header{
  font-size: 50px;
 font-family: 'Chakra Petch', sans-serif;
}
</style>
