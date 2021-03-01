<template>
  <div
    class="w-full max-w-xs text-white h-full bg-white relative"
    :class="isActive('general')"
  >
    <div
      class="bg-gray-900 text-white px-5 absolute top-0 w-full h-12 flex items-center"
      :class="isActive('navigation')"
    >
      <p>Story Title</p>
    </div>
    <div class="pb-5 px-2 space-y-2 pt-16 overflow-auto scroll h-full bg-blue-gray-800">
      <p
        class="w-full p-1 mb-4 rounded text-opacity-90 bg-opacity-60 text-white bg-gray-700 text-sm text-center"
        :class="isActive('annotation')"
      >
        One day
      </p>
      <div class="flex items-start pr-10">
        <img
          src="https://avataaars.io/?avatarStyle=Circle&topType=WinterHat1&accessoriesType=Blank&hatColor=Red&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtVNeck&clotheColor=Gray01&eyeType=Surprised&eyebrowType=FlatNatural&mouthType=Sad&skinColor=Pale"
          class="h-10 w-10 rounded-full"
          :class="isActive('profile-picture')"
        />
        <div class="ml-2">
          <p>John Doe</p>
          <p
            class="py-2 px-3 bg-gray-600 border-2 border-gray-700 rounded-xl rounded-tl-md inline-block"
            :class="isActive('character-chat')"
          >
            Hi!
          </p>
        </div>
      </div>
      <div class="flex items-start pr-10">
        <img src="" class="h-10 w-10 invisible rounded-full"/>
        <div class="ml-2">
          <p class="hidden">John Doe</p>
          <p
            class="py-2 px-3 bg-gray-600 border-2 border-gray-700 rounded-xl rounded-tl-md inline-block"
            :class="isActive('character-chat')"
          >
            Fuck you!
          </p>
          <img
            src="https://picsum.photos/400"
            class="rounded-xl max-w-full mt-1"
            :class="isActive('chat-image')"
          />
        </div>
      </div>
      <div class="flex justify-end items-start pl-10">
        <div class="mr-2 text-right">
          <p>Jonathan Doe</p>
          <p
            class="py-2 px-3 bg-primary bg-opacity-30 border-opacity-40 border-primary border-2 text-white rounded-xl rounded-tr-md inline-block"
            :class="isActive('main-character')"
          >
            What?
          </p>
        </div>
        <img
          src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Prescription02&hairColor=SilverGray&facialHairType=BeardLight&facialHairColor=Platinum&clotheType=BlazerShirt&eyeType=Squint&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Light"
          class="h-10 w-10 rounded-full"
          :class="isActive('profile-picture')"
        />
      </div>
      <div class="pl-10 text-right space-y-2 pt-2">
        <div class="option" v-for="option in options" :key="option">
          <p
            class="p-2 relative rounded-tr-md inline-block bg-green-500 border-green-500 border-2 border-opacity-40 bg-opacity-30 rounded-xl animate-pulse cursor-pointer"
            :class="isActive('option')"
          >
            {{ option }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    activeElement: {
      type: String,
      default: 'general',
    },
  },
  setup(props) {
    const options = ['Fuck you!', 'Execuse me'];

    function isActive(id) {
      return props.activeElement === id ? 'ring' : '';
    }

    return {
      options,
      isActive,
    };
  },
};
</script>
