<script setup>
import { useTeamStore } from "../stores/teams";
import { ref } from "vue";

const team_store = useTeamStore();

const team_input = ref({
  team: "",
});

const dialogDelete = ref(false);
const idToBeDel = ref("")

const CreateTeam = () => {
  if (!team_input.value.team) {
    return alert("Please enter a team");
  }
  team_store.create(team_input.value);

  team_input.value = {
    team: "",
  };
};

const DeleteTeam = () => {
  team_store.delete(idToBeDel.value);
  dialogDelete.value = false
};

const showDialog = (id) => {
  dialogDelete.value = true;
  idToBeDel.value = id
}

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

    <div v-if="team_store.teams.length > 0" class="mt-6">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Team</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in team_store.teams" :key="team.id">
            <td>{{ team.team }}</td>
            <td>
              <v-icon
                class="delete"
                color="red"
                variant="tonal"
                value="Delete"
                @click="showDialog(team.id)"
                >mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-dialog v-model="dialogDelete" max-width="344" class="mx-auto">
        <v-card>
          <v-card-text>
            Are you sure you want to delete team? This change cannot be undone.
          </v-card-text>

          <v-card-actions>
            <v-btn color="blue" block @click="dialogDelete = false">Cancel</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn color="error" block @click="DeleteTeam"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>
