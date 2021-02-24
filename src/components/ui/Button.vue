<template>
  <component
    :is="tag"
    role="button"
    class="ui-button"
    :class="[
      variants[variant],
      icon ? 'p-2' : 'py-2 px-4',
      round ? 'rounded-full' : 'rounded-xl',
      { 'pointer-events-none opacity-70': disabled },
    ]"
    v-bind="{ disabled, ...$attrs }"
  >
    <span class="flex justify-center h-full items-center">
      <slot></slot>
    </span>
  </component>
</template>
<script>
export default {
  props: {
    icon: Boolean,
    disabled: Boolean,
    round: Boolean,
    tag: {
      type: String,
      default: 'button',
    },
    variant: {
      type: String,
      default: 'default',
    },
  },
  setup() {
    const variants = {
      default: 'bg-gray-100 hover:bg-gray-200',
      primary: 'bg-primary text-white hover:bg-blue-600',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    return {
      variants,
    };
  },
};
</script>
