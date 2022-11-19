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
    return alert("Please enter a player");
  }
  user_store.create(user_input.value);
  user_input.value = {
    team: "",
  };
};

const DeletePlayer = (id) => {
  user_store.delete(id);
};
</script>

<template>
  <main>
    <form @submit.prevent="CreateUser">
      <v-responsive class="mx-auto" max-width="344">
        <h2 class="text-center">Player</h2>
        <v-text-field
          hide-details="auto"
          label="Player"
          v-model="user_input.team"
          class="my-2"
        ></v-text-field>
       </v-responsive>
       <div class="text-center">
        <v-btn class="mx-auto" color="blue" variant="tonal" type="submit" value="Create">Create</v-btn>
       </div>
    </form>

    <div class="users" v-if="!sort">
      <div v-for="user in user_store.users" class="user">
        <h3 class="text-center">{{ user.team }}</h3>
        <div class="text-center">
             <v-btn class="text-right" color="red" variant="tonal" @click="DeleteTeam(user.id)">Delete</v-btn>
        </div>
        </div>
      </div>

    <div class="users" v-else>
      <div v-for="user in user_store.usersByName" class="user">
        <h3>{{ user.team }}</h3>
      </div>
    </div>
  </main>
</template>