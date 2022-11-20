import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export const usePlayerStore = defineStore("players", {
    state: () => {
      return {
        players: [],
      }
    },
    actions: {
      create(player) {
        this.players.push({
            id: uuid(),
           ...player,
        })
      },
      delete (id) {
        this.players = this.players.filter(player => player.id !== id)
      }
    },
})