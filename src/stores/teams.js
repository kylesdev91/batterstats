import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export const useTeamStore = defineStore("teams", {
  state: () => {
    return {
      teams: [
        {
          id: 1,
          team: "Americans",
        },
        {
          id: 2,
          team: "Stingers",
        },
        {
          id: 3,
          team: "Dragons",
        },
      ],
    };
  },
  actions: {
    create(team) {
      this.teams.push({
        id: uuid(),
        ...team,
      });
    },
    delete(id) {
      this.teams = this.teams.filter((team) => team.id !== id);
    },
  },
});
