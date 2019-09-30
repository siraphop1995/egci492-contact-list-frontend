<template lang="html">
  <div>


<!-- search segment-->
      <sui-segment raised style="margin:10px">
        <sui-label color="teal" ribbon style="font-size:20px;">
          Contacts
        </sui-label>
        <span>
                    <sui-input placeholder="Search..." style="width:70%;" v-model="search"/>
                    <sui-button-group>
                        <sui-button content="Search" icon="search"/>
                        
                        <sui-button content="Add" icon="add" color="orange" @click="$router.push('/addcontact')"/>
                    </sui-button-group>
                </span>

      </sui-segment>
      <!-- blank segment -->
<sui-segment raised style="margin:10px">
  <br>
  <br>
</sui-segment>

<!-- card segment -->
 <sui-segment style="margin:10px">
    <sui-card-group :items-per-row="4" >
      <div v-for="contact in filterdContacts" >
      <sui-card style="margin:10px">
          <sui-image :src= contact.imageUrl />
        <sui-card-content>
          <sui-card-header>{{contact.firstName}} {{contact.lastName}}</sui-card-header>
          <sui-card-meta>Mobile:{{contact.mobileNo}}</sui-card-meta>
          <sui-card-meta>Email:{{contact.email}}</sui-card-meta>
          <sui-card-meta>Facebook:{{contact.facebook}}</sui-card-meta>
        </sui-card-content>
        <sui-card-content extra>
          <sui-button icon="edit" color="blue" @click="$router.push('updatecontact/'+contact._id)"></sui-button>
          <sui-button  icon="erase" color="red" @click="delContact(contact._id)"></sui-button>
          </sui-card-content>
      </sui-card>
    </div>
    </sui-card-group>
 </sui-segment>

<sui-segment raised style="margin:10px">

        <button class="btn btn-large btn-block btn-success full-width" @click="logout">logout</button>

</sui-segment>


  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ContactList",
  data() {
    return {
      Contacts: [],
      uid: "",
      search: ""
    };
  },
  methods: {
    delContact(contactId) {
      var url = "/contacts/delete/" + contactId;
      axios
        .delete(url)
        .then(response => {
          console.log("Delete ContactId: " + contactId);
        })
        .catch(error => {
          console.log(error);
        });
      window.location.reload();
    },
    DELETE(id) {
      console.log("delete" + id);
      $("#my-modal").modal("show");
      this.uid = id;
    },
    logout() {
      Event.$emit("logout");
    }
  },
  computed: {
    filterdContacts: function() {
      return this.Contacts.filter(contact => {
        return (
          contact.firstName.match(this.search) ||
          contact.lastName.match(this.search)
        );
      });
    }
  },
  mounted() {
    axios
      .get("/contacts/getMany")
      .then(response => {
        console.log(response.data);
        this.Contacts = response.data;
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
