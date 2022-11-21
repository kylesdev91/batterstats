<script setup>
import { useTeamStore } from "../stores/teams";
import { ref } from "vue";

const team_store = useTeamStore();

const team_input = ref({
  team: "",
});

const dialogDelete = ref(false);

const CreateTeam = () => {
  if (!team_input.value.team) {
    return alert("Please enter a team");
  }
  team_store.create(team_input.value);

  team_input.value = {
    team: "",
  };
};

const DeleteTeam = (id) => {
  team_store.delete(id);
};

const LogTeam = () => {
  console.log("here");
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
        v-model="team_input.team"
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

    <div v-if="team_store.teams">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Team</th>
          </tr>
        </thead>
      </v-table>
      <div v-for="team in team_store.teams" class="team">
        <th v-if="team_input.create"></th>
        <p align="left" class="mx-5">{{ team.team }}</p>
        <div class="text-center">
          <v-row></v-row>
          <div class="text-center">
            <v-icon
              class="delete"
              color="red"
              variant="tonal"
              value="Delete"
              @click="dialog = true"
              >mdi-delete
            </v-icon>

            <v-dialog v-model="dialog">
              <v-card>
                <v-card-text>
                  Are you sure you want to delete team? This change cannot be
                  undone.
                </v-card-text>

                <v-card-actions>
                  <v-btn color="blue" block @click="dialog = false"
                    >Cancel</v-btn
                  >
                </v-card-actions>
                <v-card-actions>
                  <v-btn color="error" block @click="DeleteTeam(team.id)"
                    >Delete</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
