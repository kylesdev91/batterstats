<template>
  <v-app>
    <v-app-bar color="primary" dark class="flex-grow-0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Batter Stats</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>

    <v-navigation-drawer v-model="drawer">
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item link>
            <v-list-item-title
              @click="goToCreateTeam"
              align="right"
              class="font-weight-bold"
              >Create Team</v-list-item-title
            >
          </v-list-item>

          <v-list-item link>
            <v-list-item-title
              @click="goToCreatePlayer"
              align="right"
              class="font-weight-bold"
              >Create Line Up</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import CreateTeam from "./components/CreateTeam.vue";
export default {
  name: "App",
  components: {
    CreateTeam,
  },
  data: () => ({
    drawer: false,
    group: null,
  }),

  methods: {
    goToCreateTeam() {
      this.$router.push("/createteam");
      this.drawer = false;
    },
    goToCreatePlayer() {
      this.$router.push("/createplayer");
      this.drawer = false;
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
