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
  if (!user_input.value.name || !user_input.value.team) {
    return alert("Please enter both name and team");
  }
  user_store.create(user_input.value);
  user_input.value = {
    name: "",
    team: "",
  };
};

const DeleteUser = (id) => {
  user_store.delete(id);
  alert("User Deleted with id: " + id);
};
</script>

<template>
  <main>
    <h1>Team Manager</h1>

    <form @submit.prevent="CreateUser">
      <input type="text" placeholder="Player Name" v-model="user_input.name" />
      <input
        type="team"
        placeholder="Team Name"
        v-model="user_input.team"
      />
      <input type="submit" value="Create Player" />
    </form>

    <div class="users" v-if="!sort">
      <div v-for="user in user_store.users" class="user">
        <div>ID: {{ user.id }}</div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.team }}</p>
        <button @click="DeleteUser(user.id)">Delete</button>
      </div>
    </div>

    <div class="users" v-else>
      <div v-for="user in user_store.usersByName" class="user">
        <div>ID: {{ user.id }}</div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.team }}</p>
        <button @click="DeleteUser(user.id)">Delete Player</button>
      </div>
    </div>
  </main>
</template>