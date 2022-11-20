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
    getters: {
        playersByName (state) {
            const sortable = [...state.players]
            return sortable.sort((a, b) => {
              return a.name.localeCompare(b.name)
            }) 
        }
    }
})