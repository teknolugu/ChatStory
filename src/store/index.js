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
  }),
  mutations: {
    updateState(state, { key, value }) {
      state[key] = value;
    },
  },
  actions: {
    retrieveData() {
      auth.listen((user) => {
        console.log(user);
      });
    },
  },
});
