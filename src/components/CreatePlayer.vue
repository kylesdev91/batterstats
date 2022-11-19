<script setup>
import { useUserStore } from "../stores/users";
import { ref } from "vue";

const user_store = useUserStore();

const user_input = ref({
  name: "",
  player: "",
});

const sort = ref(false);

const CreateUser = () => {
  if (!user_input.value.player) {
    return alert("Please enter a Player");
  }
  user_store.create(user_input.value);
  user_input.value = {
    player: "",
  };
};

const DeletePlayer = (id) => {
  user_store.delete(id);
};
</script>

<template>
  <main>
    <form @submit.prevent="CreateUser">
      <h2 class="text-center">Player</h2>

      <v-row class="my-10">
        <v-col cols="6">
          <v-text-field
            hide-details="auto"
            label="Player"
            v-model="user_input.player"
          ></v-text-field>
        </v-col>
        <v-row align="center">
          <v-btn
            class="mx-4"
            color="blue"
            variant="tonal"
            type="submit"
            value="Create"
            >Create</v-btn
          >
        </v-row>
      </v-row>
    </form>
    <v-simple-table fixed-header fill-height="300px" class="my-15">
      <thead>
        <tr>
          <th><p>Player</p></th>
        </tr>
      </thead>
    </v-simple-table>

    <div class="users" v-if="!sort">
      <div v-for="user in user_store.users" class="user">
        <h2 class="text-left">{{ user.player }}</h2>
        <div class="text-center">
          <v-row></v-row>
          <v-col cols="12" sm="12" class="mx-12">
            <v-btn
              class="delete"
              color="red"
              variant="tonal"
              value="Delete"
              @click="DeletePlayer(user.id)"
              >Delete</v-btn
            >
          </v-col>
        </div>
      </div>
    </div>

    <div class="users" v-else>
      <div v-for="user in user_store.usersByName" class="user">
         <h3>{{ user.player }}</h3>
      </div>
    </div>
  </main>
</template>
