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
    team: "",
  };
};

const DeleteTeam = (id) => {
  user_store.delete(id);
};
</script>

<template>
  <main>
    <form @submit.prevent="CreateUser">
      <h2 class="text-center">Team</h2>

      <v-responsive class="mx-auto" max-width="344">
        <v-text-field label="Team" v-model="user_input.team"></v-text-field>
      </v-responsive>

      <v-row align="center">
        <v-btn
          color="blue"
          variant="tonal"
          type="submit"
          value="Create"
          class="mx-auto"
          >Create</v-btn
        >
      </v-row>
    </form>

    <div class="users" v-if="!user_input.create">
      <div v-for="user in user_store.users" class="user">
        <v-simple-table fixed-header fill-height="300px" class="my-14">
          <thead>
            <th v-if="user_input.create"></th>
          </thead>
        </v-simple-table>
        <p align="center">Team:</p>
        <h2 align="center">{{ user.team }}</h2>
        <div class="text-center">
          <v-responsive class="mx-auto" max-width="344">
            <v-btn
              class="delete"
              color="red"
              variant="tonal"
              value="Delete"
              @click="DeleteTeam(user.id)"
              >Delete</v-btn
            >
          </v-responsive>
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