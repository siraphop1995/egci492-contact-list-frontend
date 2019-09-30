<template>
  <div class="hello">
    <div class="ui two column centered grid">
      <sui-card style="width:50%" center>
        <sui-segment raised style="margin:20px">
          <sui-label class="left floated" color="teal" ribbon style="font-size:20px">Login</sui-label>
        </sui-segment>

        <sui-form style="margin:20px">
          <sui-form-field>
            <label style="text-align:left; font-size:15px">User Account</label>
            <input placeholder="Contact ID" v-model="account.username" />
          </sui-form-field>
          <sui-form-field>
            <label style="text-align:left; font-size:15px">Password</label>
            <input placeholder="Contact ID" v-model="account.password" type="password" />
          </sui-form-field>
        </sui-form>

        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
        </p>
        <ul v-for="error in errors" v-bind:key="error.id">
          <li style="color:red">{{ error }}</li>
        </ul>

        <sui-button @click="signIn" style="margin:20px; width:20%">Login</sui-button>
      </sui-card>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      account: {
        username: "",
        password: ""
      },
      errors: []
    };
  },
  methods: {
    signIn() {
      this.errors = [];
      let login = {
        username: this.account.username,
        password: this.account.password
      };
      axios
        .post("/login", login)
        .then(response => {
          console.log(response);
          if (response.data.status == 403) {
            this.errors.push("Wrong username or password");
          } else if (response.data.status == 200) {
            Event.$emit("login",this.account.username);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
