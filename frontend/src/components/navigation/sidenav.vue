<template>
  <div>
    <div class="navigation" v-if="!slimNavigation">
      <img src="..\..\assets\Vloan.svg" />

      <router-link to="/"> <i class="pi pi-home"></i>Home</router-link>
      <router-link to="/objects">
        <i class="pi pi-list"></i>Object Administrator</router-link
      >
      <router-link to="/loan">
        <i class="pi pi-reply"></i>Lending Platform</router-link
      >
      <router-link to="/insights">
        <i class="pi pi-eye"></i>Object Insights</router-link
      >
      <router-link to="/mytasks">
        <i class="pi pi-check-square"></i>My Loan Tasks</router-link
      >
      <router-link to="/profile">
        <i class="pi pi-user"></i>My Profile</router-link
      >

      <div class="expand">
        <p>
          <button class="loginButton" v-if="!loggedIn.loggedIn" @click="callLogin()">
            <i class="pi pi-sign-in"></i> Login
          </button>
        </p>
        <p class="logoutButton" v-if="loggedIn.loggedIn" @click="logOut()">
          <i class="pi pi-sign-out"></i>Logout
        </p>
        <i class="pi pi-angle-double-left" @click="collapse(true)"></i>
      </div>
    </div>
    <div class="navigation-slim" v-if="slimNavigation">
      <img src="..\..\assets\Vloan.svg" class="logo-small" />
      <router-link to="/"> <i class="pi pi-home"></i></router-link>
      <router-link to="/objects"> <i class="pi pi-list"></i></router-link>
      <router-link to="/loan"> <i class="pi pi-reply"></i></router-link>
      <router-link to="/insights"> <i class="pi pi-eye"></i></router-link>
      <router-link to="/mytasks">
        <i class="pi pi-check-square"></i
      ></router-link>
    <router-link to="/profile"> <i class="pi pi-user"></i></router-link>
      <div class="expand">
        <p v-if="!loggedIn.loggedIn" @click="callLogin()">
          <i class="pi pi-sign-in" style="color: hsl(100, 80%, 60%)"></i>
        </p>
        <p v-if="loggedIn.loggedIn" @click="logOut()">
          <i class="pi pi-sign-out" style="color: hsl(10, 80%, 60%)"></i>
        </p>
        <i class="pi pi-angle-double-right" @click="collapse(false)"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slimNavigation: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.getLoginData
    },
  },
  methods: {
    collapse(bool) {
      this.slimNavigation = bool;
      this.$emit("nav-collapse", this.slimNavigation);
    },
    logOut() {
      this.$router.push('/')
      this.$store.commit("logOut")
      
    },
    callLogin() {
      this.$store.commit("toggleLogin");
      
    },
  },
};
</script>

<style scoped>
.navigation {
  display: flex;
  background: var(--bg-s1);
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  overflow-x: hidden;
  z-index: 1;
  top: 0;
  left: 0;
  position: fixed;
  flex-wrap: wrap;
  border-right: 1px solid grey;
  animation: slide-right 0.4s ease-out;
  width: 220px;
}

.navigation a {
  font-size: 15px;
  color: var(--fc-s1);
  text-decoration: none;
  padding: 5px 10px 5px 10px;
  margin-top: 30px;
  margin-left: 20px;
}

.navigation a:hover {
  color: var(--fc-s2);
  transform: scale(1.04);
  cursor: pointer;
}

i {
  margin-right: 10px;
}

.expand i {
  font-size: 40px;
  color: var(--fc-s1);
}

.expand {
  margin-left: 0px;
  margin-top: auto;
  padding-bottom: 50px;
  align-self: center;
}

.expand i:hover {
  color: var(--fc-s2);
  transform: scale(1.05);
  cursor: pointer;
}

.navigation-slim {
  display: flex;
  background: var(--bg-s1);
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 70px;
  overflow-x: hidden;
  z-index: 1;
  top: 0;
  left: 0;
  position: fixed;
  flex-wrap: wrap;
  border-right: 1px solid grey;
  animation: slide-left 0.5s;
}
.navigation-slim i {
  font-size: 20px;
  color: var(--fc-s1);
  text-decoration: none;
  padding: 5px 10px 5px 10px;
  margin-top: 40px;
  margin-left: 10px;
}

.navigation-slim i:hover {
  color: var(--fc-s2);
  border-top: 1px solid gold;
  border-bottom: 1px solid gold;
  transform: scale(1.05);
  cursor: pointer;
}

.logo-small {
  margin-left: 2px;
  border-bottom: 1px solid white;
  padding-bottom: 5px;
}

@keyframes slide-right {
  from {
    width: 70px;
  }
  to {
    width: 220px;
  }
}

@keyframes slide-left {
  from {
    width: 220px;
  }

  to {
    width: 70px;
  }
}

img {
  width: 50%;
  margin-left: 20%;
  margin-top: 20px;
}

.loginButton {
  color: hsl(128, 80%, 60%);
  box-shadow: 1px 0px 3px 1px #ffffff;
  padding: 5px 30px 5px 30px;
  border-radius: 4px;
  background: var(--bg-s1);
  margin-bottom: 50px;
  font-family: "Chakra Petch", sans-serif;
  font-size: 20px;
}

.loginButton i {
  font-size: 20px;
  color: hsl(100, 80%, 60%);
}

.loginButton:hover {
  background: rgb(31, 61, 107);
  transform: scale(1.01);
  box-shadow: 1px 0px 3px 1px var(--ac-good);
  cursor: pointer;
}
.logoutButton {
  box-shadow: 0px 0px 3px 1px #ffffff;
  padding: 5px 30px 5px 30px;
  border-radius: 4px;
  background: var(--bg-s1);
  margin-bottom: 50px;
  font-family: "Chakra Petch", sans-serif;
  font-size: 20px;
  color: hsl(22, 94%, 49%);
}
.logoutButton i {
  color: white;
  font-size: 20px;
  color: hsl(10, 80%, 60%);
}

.logoutButton:hover {
  background: rgb(31, 61, 107);
  transform: scale(1.01);
  box-shadow: 0px 0px 3px 1px rgb(231, 6, 81);
  cursor: pointer;
}
</style>