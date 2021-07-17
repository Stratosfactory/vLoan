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
  methods: {
    changeMargin(bool) {
      this.navCollapsed = bool;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch&display=swap");

#app {
  font-family: "Roboto Slab", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

html {
  background: var(--bg-main);
}

:root {
  --bg-main: #eaebec;
  --bg-s1: rgb(56, 77, 109);

  --fc-s1: #ffffff;
  --fc-s2: gold;
  --ac-s1: rgb(0, 140, 255);
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
main{
  margin-right:10px;
}

header {
  font-size: 50px;
  margin-bottom: 1vh;
  font-family: "Chakra Petch", sans-serif;
  text-align: left;
}

.button-main {
  background: var(--bg-s1);
  color: var(--fc-s1);
  font-family: "Roboto Slab", serif;
  font-size: 1.3rem;
  border-radius: 5px !important;
  cursor: pointer;
  
  }

.button-main:hover {
  color: var(--fc-s2);
  transform: scale(1.02);
}

.deleteButton-inline {
  background: rgb(250, 34, 77);
  color: var(--fc-s1);
  border: rgb(0, 0, 0) solid 1px;
  border-radius: 4px;
  cursor: pointer;
}

.deleteButton-inline:hover {
  background: rgb(197, 15, 51);
  transform: scale(1.01);
}

.overlayDelete {
  background: crimson !important;
}

label {
  font-size: 1.1rem;
}

input {
  border: 1px solid var(--bg-s1);
  border-radius: 3px;
  height: 25px;
  font-family: "Roboto Slab", serif;
  font-size: 1.08rem;
}

input:hover {
  border: 1px solid var(--ac-s1);
}

input:focus {
  outline: none !important;
  box-shadow: 0px 0px 3px 0px var(--ac-s1);    
}

select {
  border: 1px solid var(--bg-s1);
  border-radius: 3px;
  height: 25px;
  font-family: "Roboto Slab", serif;
  font-size: 1.08rem;
}

select:hover {
    box-shadow: 0px 0px 3px 0px var(--ac-s1);    
}

select:focus {
      box-shadow: 0px 0px 3px 0px var(--ac-s1);     
}

</style>
