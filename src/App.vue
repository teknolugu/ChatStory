<template>
  <div class="app text-gray-800">
    <app-nav v-if="!excludeNav.includes($route.name)"></app-nav>
    <main>
      <router-view></router-view>
    </main>
    <ui-dialog></ui-dialog>
  </div>
</template>
<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import AppNav from './components/app/AppNav.vue';
import Story from './models/story';
import { nodesData } from './utils/shared';

export default {
  components: { AppNav },
  setup() {
    const store = useStore();
    const excludeNav = ['edit-story'];

    Story.insert({
      data: {
        id: 'test',
        title: 'My story',
        description: 'this is my story',
        bannerImage: 'https://picsum.photos/600',
        characters: [
          {
            id: '1yssPZWt2u59Hag2j6iIP',
            name: 'Sophia',
            profileUrl:
              'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Prescription02&hairColor=SilverGray&facialHairType=BeardLight&facialHairColor=Platinum&clotheType=BlazerShirt&eyeType=Squint&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Light',
          },
          {
            id: 'MHAC5I8Vvnp7UMIYMyucL',
            name: 'Random',
            profileUrl: 'https://ui-avatars.com/api/?name=Random',
          },
        ],
        nodes: nodesData,
        style: {},
        setting: {},
      },
    }).then((data) => {
      console.log(data, Story.query().withAll().first());
    });

    onMounted(() => {
      store.dispatch('retrieveData');
    });

    return {
      excludeNav,
    };
  },
};
</script>
