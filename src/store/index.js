import { createStore } from 'vuex';
import VuexORM from '@vuex-orm/core';
import * as models from '@/models';
import auth from '@/utils/auth';

const database = new VuexORM.Database();

Object.values(models).forEach((model) => {
  database.register(model);
});

export default createStore({
  plugins: [VuexORM.install(database)],
  state: () => ({
    user: null,
    feed: {
      mostUpvoted: [],
      recently: [],
    },
    editor: {
      instance: null,
      showPreview: false,
    },
  }),
  mutations: {
    updateState(state, { key, value }) {
      state[key] = value;
    },
    pushFeedStory(state, { key, value }) {
      state.feed[key]?.push(value);
    },
  },
  actions: {
    retrieveData({ commit }) {
      auth.listen((user) => {
        if (user) {
          const { displayName, email, emailVerified } = user;

          commit('updateState', {
            key: 'user',
            value: {
              email,
              displayName,
              emailVerified,
            },
          });
        }
      });
    },
  },
});
