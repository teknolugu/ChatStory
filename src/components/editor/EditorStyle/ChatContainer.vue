<template>
  <div
    class="w-full max-w-xs h-full bg-white relative"
    :class="isActive('general')"
    :style="convertToCss(style.general)"
  >
    <div
      class="px-5 absolute top-0 w-full h-12 flex items-center"
      :class="isActive('navigation')"
      :style="convertToCss(style.navigation)"
    >
      <p>Story Title</p>
    </div>
    <div class="pb-5 px-2 space-y-2 pt-16 overflow-auto scroll h-full">
      <p
        class="w-full p-1 mb-4 text-sm text-center"
        :class="isActive('annotation')"
        :style="convertToCss(style.annotation)"
      >
        One day
      </p>
      <div class="flex items-start pr-10">
        <img
          src="https://avataaars.io/?avatarStyle=Circle&topType=WinterHat1&accessoriesType=Blank&hatColor=Red&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtVNeck&clotheColor=Gray01&eyeType=Surprised&eyebrowType=FlatNatural&mouthType=Sad&skinColor=Pale"
          class="h-10 w-10"
          :class="isActive('profile-picture')"
          :style="convertToCss(style.profilePicture)"
        />
        <div class="ml-2">
          <p>John Doe</p>
          <p
            class="py-2 px-3 inline-block"
            :class="isActive('character-chat')"
            :style="convertToCss(style.characterChat)"
          >
            Hi!
          </p>
        </div>
      </div>
      <div class="flex items-start pr-10">
        <img src="" class="h-10 w-10 invisible" />
        <div class="ml-2">
          <p class="hidden">John Doe</p>
          <p
            class="py-2 px-3 inline-block"
            :class="isActive('character-chat')"
            :style="convertToCss(style.characterChat)"
          >
            Fuck you!
          </p>
          <img
            src="https://picsum.photos/400"
            class="max-w-full mt-1"
            :class="isActive('chat-image')"
            :style="convertToCss(style.chatImage)"
          />
        </div>
      </div>
      <div class="flex justify-end items-start pl-10">
        <div class="mr-2 text-right">
          <p>Jonathan Doe</p>
          <p
            class="py-2 px-3 inline-block"
            :class="isActive('main-character')"
            :style="convertToCss(style.mainCharacter)"
          >
            What?
          </p>
        </div>
        <img
          src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Prescription02&hairColor=SilverGray&facialHairType=BeardLight&facialHairColor=Platinum&clotheType=BlazerShirt&eyeType=Squint&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Light"
          class="h-10 w-10"
          :class="isActive('profile-picture')"
          :style="convertToCss(style.profilePicture)"
        />
      </div>
      <div class="pl-10 text-right space-y-2 pt-2">
        <div v-for="option in options" :key="option" class="option">
          <p
            class="p-2 relative inline-block animate-pulse cursor-pointer"
            :class="isActive('option')"
            :style="convertToCss(style.option)"
          >
            {{ option }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { convertToCss } from '@/utils/helper';
import Style from '@/models/style';

export default {
  props: {
    activeElement: {
      type: String,
      default: 'general',
    },
  },
  setup(props) {
    const route = useRoute();

    const storyId = route.params.storyid;
    const options = ['Fuck you!', 'Execuse me'];

    const style = computed(() => Style.query().where('storyId', storyId).first());

    function isActive(id) {
      return props.activeElement === id ? 'ring' : '';
    }

    return {
      style,
      options,
      isActive,
      convertToCss,
    };
  },
};
</script>
