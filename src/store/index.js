import { createStore } from 'vuex';
import VuexORM from '@vuex-orm/core';
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
      mostUpvoted: {
        isRetrieved: false,
        data: [],
      },
      recently: {
        isRetrieved: false,
        data: [],
      },
    },
    feedKey: {
      mostUpvoted: null,
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
    fetchFeed({ commit, state }, { sortBy, loadMore }) {
      return new Promise((resolve, reject) => {
        fetchAPI(`/story?sortBy=${sortBy}`)
          .then(({ nextKey, stories }) => {
            const storyIds = stories.map(({ id }) => id);

            models.Story.insertOrUpdate({
              data: stories,
            });

            commit('updateState', {
              key: 'feedKey',
              value: {
                ...state.feedKey,
                [sortBy]: nextKey,
              },
            });
            commit('pushFeedStory', {
              key: sortBy,
              value: storyIds,
            });

            resolve(stories);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    retrieveData({ commit }) {
      auth.listen(async (user) => {
        if (user) {
          try {
            const { displayName, email, emailVerified, photoUrl } = user;
            const { username } = await fetchAPI('/user');

            commit('updateState', {
              key: 'user',
              value: {
                username,
                email,
                photoUrl,
                emailVerified,
              },
            });
            commit('updateState', {
              key: 'isRetrieved',
              value: true,
            });
          } catch (error) {
            console.error(error);
          }
        }
      });
    },
  },
});
