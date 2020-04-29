<template>
  <v-layout column justify-center align-center>
    <v-flex class="w-100">
      <v-toolbar color="white" light>Etiquetas</v-toolbar>
      <v-list>
        <v-list-item>
          <v-text-field v-model="newTag" v-on:keyup.enter="submit" placeholder="Añadir etiqueta" solo flat hide-details></v-text-field>
        </v-list-item>
        <v-list-item v-for="tag in tags.slice().reverse()" :key="tag._id">
          <v-list-item-icon>
            <v-icon :style="dynamicStyle(tag.randomColor)" dense>mdi-circle-medium</v-icon>
          </v-list-item-icon>
          <v-list-item-content v-show="!tag.editing"
          >{{tag.name}}</v-list-item-content>
          <v-list-item-content v-show="tag.editing">
            <v-text-field v-model="tag.name" v-on:keyup.enter="update(tag._id, tag.name, tag.randomColor)" placeholder="Nuevo nombre" dense></v-text-field>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              text
              dense
              small
              v-on:click="setEditing(tag)"
              class="text-transform-none"
            >Editar</v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn text dense small v-on:click="remove(tag._id)" class="text-transform-none">Borrar</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    newTag: ""
  }),
  name: "index",
  head: {
    title: "Prueba Valiu"
  },
  computed: {
    ...mapState(["tags"])
  },
  methods: {
    setEditing(tag) {
      //this.tags..
      this.$store.commit('UPDATE_EDITING', tag);
      //this.$forceUpdate();
    },
    dynamicStyle(randomColor) {
      return {
        color: randomColor
      };
    },
    submit() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      let message = {
        action: "create",
        data: [
          {
            randomColor: color,
            name: this.newTag
          }
        ]
      };
      this.$socket.emit("message", JSON.stringify(message));
      this.newTag = "";
    },
    update(_id, name, randomColor) {
      let message = {
        action: "update",
        data: [
          {
            _id,
            name,
            randomColor
          }
        ]
      };
      this.$socket.emit("message", JSON.stringify(message));
    },
    remove(_id) {
      let message = {
        action: "delete",
        data: [
          {
            _id
          }
        ]
      };
      this.$socket.emit("message", JSON.stringify(message));
    }
  }
};
</script>
<style scoped>
.w-100 {
  width: 100%;
}
</style>
