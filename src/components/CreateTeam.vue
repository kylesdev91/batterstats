<script setup>
import { useUserStore } from "../stores/users";
import { ref } from "vue";

const user_store = useUserStore();

const user_input = ref({
  name: "",
  team: "",
});

const sort = ref(false);

const CreateUser = () => {
  if (!user_input.value.team) {
    return alert("Please enter a team");
  }
  user_store.create(user_input.value);
  user_input.value = {
    name: "",
    team: "",
  };
};

const DeleteTeam = (id) => {
  user_store.delete(id);
  alert("Team Deleted");
};
</script>

<template>
  <main>
    <form @submit.prevent="CreateUser">
      <v-text-field label="Team Name" v-model="user_input.team"></v-text-field>
      <v-btn variant="tonal" type="submit" value="Create"> Create Team </v-btn>
       <v-btn rounded color="green" type="submit" value="Create Team" icon><v-icon large>mdi-location-enter</v-icon></v-btn>
    </form>

    <div class="users" v-if="!sort">
      <div v-for="user in user_store.users" class="user">
        <h3>{{ user.team }}</h3>
        <v-btn @click="DeleteTeam(user.id)">Delete</v-btn>
        <v-btn @click="DeleteTeam(user.id)" class="mr-4" rounded color="red" icon><v-icon>mdi-delete-circle-outline</v-icon></v-btn>  
      </div>
    </div>

    <div class="users" v-else>
      <div v-for="user in user_store.usersByName" class="user">
        <h3>{{ user.team }}</h3>
      </div>
    </div>
  </main>
</template>
