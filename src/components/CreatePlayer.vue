<script setup>
import { usePlayerStore } from "../stores/players";
import { ref } from "vue";

const player_store = usePlayerStore();

const user_input = ref({
  player: "",
});

const CreatePlayer = () => {
  if (!user_input.value.player) {
    return alert("Please enter a player");
  }
  player_store.create(user_input.value);
  user_input.value = {
    player: "",
  };
};

const DeletePlayer = (id) => {
  player_store.delete(id);
};
</script>

<template>
  <main>
    <form @submit.prevent="CreatePlayer">
      <v-card class="mx-auto" max-width="332" title="Player Registration">
        <v-text-field
          label="Enter a player"
          persistent-hint
          variant="outlined"
          v-model="user_input.player"
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

    <div class="players" v-if="!user_input.create">
      <div v-for="user in player_store.players" class="user">
        <v-simple-table fixed-header fill-height="300px" class="my-14">
          <thead>
            <th v-if="user_input.create"></th>
          </thead>
        </v-simple-table>
        <p align="center">Player:</p>
        <h2 class="text-center">{{ user.player }}</h2>
        <div class="text-center">
          <v-responsive class="mx-auto" max-width="344">
            <v-btn
              class="delete"
              color="red"
              variant="tonal"
              value="Delete"
              @click="DeletePlayer(user.id)"
              >Delete</v-btn
            >
          </v-responsive>
        </div>
      </div>
    </div>

    <div class="players" v-else>
      <div v-for="user in player_store.playersByName" class="user">
        <h3>{{ user.player }}</h3>
      </div>
    </div>
  </main>
</template>
