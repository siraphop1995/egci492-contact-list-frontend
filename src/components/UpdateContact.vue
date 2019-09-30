<template>
  <div class="container">
    <sui-segment style="width:100%;">
      <sui-card-header style="text-align:left">
        <b style="font-size:20px">Contact</b>
        <sui-label color="teal">Edit</sui-label>
      </sui-card-header>

      <div class="ui divider"></div>
      <!-- form -->
      <sui-form style="margin:20px">
        <sui-form-field>
          <label style="text-align:left">
            Contact ID
            <a style="color:red">*</a>
          </label>
          <input placeholder="Contact ID" v-model="Contact.contactID" />
        </sui-form-field>
        <sui-form-field>
          <label style="text-align:left">
            First Name
            <a style="color:red">*</a>
          </label>
          <input placeholder="First Name" v-model="Contact.firstName" />
        </sui-form-field>
        <sui-form-field>
          <label style="text-align:left">
            Last Name
            <a style="color:red">*</a>
          </label>
          <input placeholder="Last Name" v-model="Contact.lastName" />
        </sui-form-field>
        <sui-form-field>
          <label style="text-align:left">
            Mobile No
            <a style="color:red">*</a>
          </label>
          <input placeholder="Mobile No" v-model="Contact.mobileNo" />
        </sui-form-field>
        <sui-form-field>
          <label style="text-align:left">Email</label>
          <input placeholder="Email" v-model="Contact.email" />
        </sui-form-field>
        <sui-form-field>
          <label style="text-align:left">Facebook</label>
          <input placeholder="Facebook" v-model="Contact.facebook" />
        </sui-form-field>
        <sui-form-field>
          <label style="text-align:left">ImageUrl</label>
          <input placeholder="ImageUrl" v-model="Contact.imageUrl" />
        </sui-form-field>
      </sui-form>

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
      </p>
      <ul v-for="error in errors" v-bind:key="error.id">
        <li style="color:red">{{ error }}</li>
      </ul>

      <!-- button -->
      <sui-card-content>
        <br />
        <sui-grid textAlign="center">
          <sui-button-group>
            <sui-button color="blue" content="Save" icon="save" basic @click="updateToAPI" />
            <sui-button
              color="blue"
              content="Close"
              icon="close icon"
              basic
              @click="$router.push('/contactlist')"
            />
          </sui-button-group>
        </sui-grid>
        <br />
      </sui-card-content>
    </sui-segment>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UpdateContact",
  data() {
    return {
      msg: "Update Contact",
      Contact: [],
      errors: [],
      checkError: false
    };
  },
  methods: {
    updateToAPI() {
      console.log(this.$route.params.contactId);
      this.checkForm();
      if (!this.checkError) {
      } else {
        let newContact = {
          contactID: this.Contact.contactID,
          firstName: this.Contact.firstName,
          lastName: this.Contact.lastName,
          mobileNo: this.Contact.mobileNo,
          email: this.Contact.email,
          facebook: this.Contact.facebook,
          imageUrl: this.Contact.imageUrl
        };
        console.log(newContact);
        axios
          .put("/contacts/update/" + this.$route.params.contactId, newContact)
          .then(response => {
            console.log(response);
            this.$router.push("/contactlist");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    checkForm(e) {
      this.errors = [];
      if (this.Contact.email == "") {
      } else if (!this.validEmail(this.Contact.email)) {
        this.errors.push("Incorrect email format");
      }
      if (
        this.Contact.contactID == "" ||
        this.Contact.firstName == "" ||
        this.Contact.lastName == "" ||
        this.Contact.mobileNo == ""
      ) {
        this.errors.push("Input require");
      }
      if (!this.errors.length) {
        this.checkError=true
      }

    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
  mounted() {
    console.log(this.$route.params.contactId);
    axios
      .get("/contacts/getOne/" + this.$route.params.contactId)
      .then(response => {
        console.log(response.data);
        this.Contact = response.data;
      })
      .catch(error => {
        console.log(error);
      });
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