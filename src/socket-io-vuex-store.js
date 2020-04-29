import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
    socketMessage: '',
    tags: []
  },

  mutations:{
    SOCKET_connect(state) {
      state.isConnected = true;
    },

    SOCKET_DISCONNECT(state) {
      state.isConnected = false;
    },

    SOCKET_MESSAGECHANNEL(state, message) {
      state.socketMessage = message
    },
    
    SOCKET_MESSAGE(state, message) {
      state.socketMessage = message;
    },

    SOCKET_list(state,message) {
      console.log(message);
      state.tags= JSON.parse(message).data;
    },

    SOCKET_update(state, message) {
      const update = JSON.parse(message).data[0];
      state.tags = state.tags.map(tag => {
        if(tag._id !== update._id ) {
          return tag;
        } else {
          return update;
        }
      });
    },

    SOCKET_delete(state, message) {
      console.log(message);
      const remove = JSON.parse(message).data[0];
      state.tags = state.tags.filter(tag => tag._id !== remove._id);
    },

    SOCKET_create(state, message) {
      console.log(message);
      let data = JSON.parse(message).data;
      state.tags.push(data[0]);
    },

  }
})