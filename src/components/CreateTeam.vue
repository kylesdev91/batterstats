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
  <v-card
    class="mx-auto ma-10 px-6 py-8"
    max-width="344"
    title="Team Registration "
  >
    <v-row justify="center">
      <v-text-field
        label="Enter a team"
        persistent-hint
        variant="outlined"
        v-model="user_input.team"
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-btn
        color="blue"
        variant="tonal"
        type="submit"
        value="Create"
        class="mx-100"
        @click.prevent="CreateTeam"
        >Create</v-btn
      >
    </v-row>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Team</th>
        </tr>
      </thead>
    </v-table>

    <div v-if="team_store.teams">
      <div v-for="user in team_store.teams" class="user">
        <th v-if="user_input.create"></th>
        <p align="left" class="mx-5">{{ user.team }}</p>
        <div class="text-center">
          <v-row></v-row>
          <v-icon
            class="delete"
            color="red"
            variant="tonal"
            value="Delete"
            @click="DeleteTeam(user.id)"
            >mdi-delete
          </v-icon>
        </div>
      </div>
    </div>

    <div class="teams" v-else>
      <div v-for="user in team_store.teamsByName" class="user">
        <h3>{{ user.team }}</h3>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  dialog: false,
};
</script>
