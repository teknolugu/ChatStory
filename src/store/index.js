import { createStore } from 'vuex';
import VuexORM from '@vuex-orm/core';
import router from '../router';
import * as models from '@/models';
import auth, { fetchAPI } from '@/utils/auth';

const database = new VuexORM.Database();

Object.values(models).forEach((model) => {
  database.register(model);
});

export default createStore({
  plugins: [VuexORM.install(database)],
  state: () => ({
    user: null,
    isRetrieved: false,
    feed: {
      mostLiked: {
        isRetrieved: false,
        data: [],
      },
      recently: {
        isRetrieved: false,
        data: [],
      },
    },
    feedKey: {
      mostLiked: null,
      recently: null,
    },
    editor: {
      instance: null,
      showPreview: false,
    },
  }),
  getters: {
    getFeedStories: (state) => (id) => {
      const stories = state.feed[id].data.map((id) => models.Story.find(id));

      return stories;
    },
  },
  mutations: {
    updateState(state, { key, value }) {
      state[key] = value;
    },
    pushFeedStory(state, { key, value }) {
      state.feed[key].data.push(...value);
      state.feed[key].isRetrieved = true;
    },
  },
  actions: {
    fetchFeed({ commit, state }, { sortBy, nextKey }) {
      if (state.feed[sortBy].isRetrieved && !nextKey) return;

      return new Promise((resolve, reject) => {
        let query = `sortBy=${sortBy}&limit=12`;

        if (nextKey) {
          query += `&nextPageId=${JSON.stringify(nextKey)}`;
        }

        fetchAPI(`/story?${query}`)
          .then((data) => {
            const storyIds = data.stories.map(({ id }) => id);

            models.Story.insertOrUpdate({
              data: data.stories,
            });

            commit('updateState', {
              key: 'feedKey',
              value: {
                ...state.feedKey,
                [sortBy]: data.nextKey,
              },
            });
            commit('pushFeedStory', {
              key: sortBy,
              value: storyIds,
            });

            resolve(data.stories);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    retrieveData({ commit }) {
      auth.listen(async () => {
        const user = auth?.user ?? null;

        if (user) {
          try {
            const { displayName, email, localId, emailVerified } = user;
            const { username, photoURL } = await fetchAPI('/user');

            commit('updateState', {
              key: 'user',
              value: {
                id: localId,
                username,
                email,
                photoURL,
                emailVerified,
              },
            });
            commit('updateState', {
              key: 'isRetrieved',
              value: true,
            });

            const firstTime = localStorage.getItem('firstTime');

            if (firstTime === null) {
              router.push(`/story/${import.meta.env.VITE_TUTORIAL_ID}`);
              localStorage.setItem('firstTime', false);
            }
          } catch (error) {
            console.error(error);
          }
        }
      });
    },
  },
});
