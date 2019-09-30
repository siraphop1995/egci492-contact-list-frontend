<template>
  <div id="app">
    <sui-menu inverted>
      <sui-menu-item header>
        <img src="./assets/logo.png" />
      </sui-menu-item>
      <sui-menu-item style="font-size:20px;">Contacts</sui-menu-item>
      <sui-menu-menu position="right">
        <sui-menu-item right style="margin-right:30px">
          <sui-icon name="user" />
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>

    <sui-segment attached="bottom"></sui-segment>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    window.loginUser = localStorage.getItem("loginUser");
    this.redirectGuestToLogin();

    Event.$on("login", username => {
      localStorage.setItem("loginUser", username);
      window.loginUser = username;
      this.$router.push("/contactlist");
    });

    Event.$on("logout", () => {
      console.log("logout");
      localStorage.removeItem("loginUser");
      window.loginUser = null;
      this.$router.push("/login");
    });
  },
  methods: {
    redirectGuestToLogin() {
      if (loginUser === null) {
        console.log("loginUser:" + loginUser + "   Please login");
        return this.$router.push("/login");
      } else {
        console.log("loginUser:" + loginUser + "   Authenticated");
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
