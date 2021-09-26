<template class="test">
  <div>
    <sidenav @nav-collapse="changeMargin"></sidenav>
    <main :class="[navCollapsed ? 'collapsed' : 'extended']">
      <topnav></topnav>
      <Toast />
      <router-view></router-view>
     
    </main>
  </div>
</template>

<script>
import topnav from "./components/navigation/topnav.vue";
import sidenav from "./components/navigation/sidenav.vue";
import Toast from "primevue/toast";

export default {
  name: "App",
  components: {
    topnav,
    sidenav,
    Toast,
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
  computed:{
    toastService(){
      return this.$store.getters.getToast
    }
  },
  watch:{
    toastService:{
      deep:true,
      handler(toastObj){
        this.$toast.add({
                        severity: toastObj.type,
                        summary: toastObj.message,
                    });
      }
    }
  }
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
  --bg-s2: rgba(56, 77, 109, 0.2);
  --bg-s3: white;
  


  --fc-s1: #ffffff;
  --fc-s2: gold;
  --ac-s1: rgb(0, 140, 255);
  --ac-good:rgba(105, 250, 100, 0.596);
  --ac-neutral:rgba(33, 79, 179, 0.473);
  --ac-bad:rgba(179, 13, 68, 0.493);
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
main {
  margin-right: 10px;
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
  font-family: "Chakra Petch", sans-serif;
  font-size: 1.3rem;
  border-radius: 5px !important;
  cursor: pointer;
}

.button-main:hover {
  color: var(--fc-s2);
  transform: scale(1.02);
}

.button-secondary {
  font-family: "Chakra Petch", sans-serif;
  background: var(--bg-s1);
  font-size: 1.1rem;
  cursor: pointer;
  color: white;
  border: black 1px solid;
  border-radius: 3px;
}
.button-secondary:hover {
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

/* Add new button */

.addNew {
  display: flex;
  padding: 5px 5px 20px 5px;
}
/* Input Menu and Item */

.inputMenu {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid var(--bg-s1);
  padding: 10px 10px 10px 10px;
  border-radius: 3px;
  box-shadow: 2px 5px 16px 2px var(--bg-s1);
  margin: 20px 0 20px 0;
}
.menuitem {
  display: flex;
  flex-direction: column;
  width: 42%;
  margin-right: 6vw;
  padding: 10px 10px 10px 10px;
}

.menuitem label {
  align-self: flex-start;
}

@media only screen and (max-width: 1200px) {
  .menuitem {
    width: 100%;
  }
  .menuitem button {
    width: 33% !important;
    align-self: center !important;
    height: 100% !important;
  }
}

.menubutton {
  width: 100%;
}

.menubutton button {
  height: 2.7rem;
  width: 25%;
  align-self: flex-end;

  margin-top: auto;
  margin-bottom: auto;
}

.p-button {
  background: var(--bg-s1) !important;
}

.filter-menu {
  display: flex;
  justify-content: left;
  background: var(--bg-s2);
  padding: 10px 10px;
  
  box-shadow: 2px 3px 6px 2px grey;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-right: 2%;
  width: 31%;
  
}

.filter-item label {
  text-align: left;
  
}

.filter-menu-button{
    margin-top: auto;
    margin-left:auto;
    margin-right: 3%;
    
}
</style>
