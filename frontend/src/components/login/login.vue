<template>
  <div>
    <Dialog
      :visible="loginIsVisible"
      :modal="true"
      class="login-dialog"
      :closable="false"
    >
      <template #header>
        <h3>Login</h3>
        <button class="close-button" @click="hideLogin()">
          <i class="pi pi-times"></i>
        </button>
      </template>
      <form class="dialog-body" name="formlogin" id="formlogin">
       
        <label>E-Mail</label>
        <input v-model="loginData.email" autocomplete="email username" name="email" type="text" />
        <label>Password</label>
        <input type="password" v-model="loginData.password" autocomplete="password" name="new-password" />
        
      </form>
      <template #footer>
        <button class="button-main" @click="login()">Login</button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "primevue/dialog";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      loginData: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    loginIsVisible() {
      return this.$store.getters.getLoginVisibility;
    },
  },
  methods: {
    hideLogin() {
      this.$store.commit("toggleLogin");
    },
    login() {
      this.$store.dispatch("login", this.loginData);
    },
  },
};
</script>

<style>
.login-dialog {
  width: 30vw;
}

.p-dialog-header {
  background: var(--bg-main) !important;
}

.dialog-body {
  display: flex;
  flex-direction: column;
}

.close-button {
  margin-left: auto;
  border: none;
  cursor: pointer;
}
</style>