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
  <v-card
    class="mx-auto ma-10 px-6 py-8"
    max-width="344"
    title="Player Registration "
  >
    <v-row justify="center">
      <v-text-field
        label="Enter a player"
        persistent-hint
        variant="outlined"
        v-model="user_input.player"
      ></v-text-field>
    </v-row>
    <v-row justify="center">
      <v-btn
        color="blue"
        variant="tonal"
        type="submit"
        value="Create"
        class="mx-100"
        @click.prevent="CreatePlayer"
        >Create</v-btn
      >
    </v-row>
  </v-card>

  <div  v-if="!user_input.create">
    <div v-for="user in player_store.players" class="user">
      <v-simple-table fixed-header fill-height="300px" class="my-14">
        <thead>
          <th v-if="user_input.create"></th>
        </thead>
      </v-simple-table>
      <p align="center">Player:</p>
      <h2 class="text-center">{{ user.player }}</h2>
      <div class="text-center">
          <v-btn
            class="delete"
            color="red"
            variant="tonal"
            value="Delete"
            @click="DeletePlayer(user.id)"
            >Delete</v-btn
          >
      </div>
    </div>
  </div>

  <div class="players" v-else>
    <div v-for="user in player_store.playersByName" class="user">
      <h3>{{ user.player }}</h3>
    </div>
  </div>
</template>
