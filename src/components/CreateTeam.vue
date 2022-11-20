<script setup>
import { useTeamStore } from "../stores/teams";
import { ref } from "vue";

const team_store = useTeamStore();

const user_input = ref({
  team: "",
});

const CreateTeam = () => {
  if (!user_input.value.team) {
    return alert("Please enter a team");
  }
  team_store.create(user_input.value);
  user_input.value = {
    team: "",
  };
};

const DeleteTeam = (id) => {
  team_store.delete(id);
};
</script>

<template>
  <main>
    <form @submit.prevent="CreateTeam">
      <v-card class="mx-auto" max-width="332" title="Team Registration">
        <v-text-field
          label="Enter a team"
          persistent-hint
          variant="outlined"
          v-model="user_input.team"
        ></v-text-field>
      </v-card>
      <v-col>
        <v-row>
          <v-btn
          color="blue"
          variant="tonal"
          type="submit"
          value="Create"
          class="mx-auto"
          >Create</v-btn
        >
        </v-row>
      </v-col>
    </form>

    <div class="teams" v-if="!user_input.create">
      <div v-for="user in team_store.teams" class="user">
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

    <div class="teams" v-else>
      <div v-for="user in team_store.teamsByName" class="user">
        <h3>{{ user.team }}</h3>
      </div>
    </div>
  </main>
</template>
