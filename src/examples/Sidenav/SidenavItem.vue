<template>
  <router-link v-if="!isLogout" :to="url" class="nav-link" v-bind="$attrs">
    <div
      class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center"
    >
      <slot name="icon"></slot>
    </div>
    <span
      class="nav-link-text"
      :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
      >{{ navText }}</span
    >
  </router-link>
  <a
    v-else
    href="#"
    class="nav-link"
    @click.prevent="$emit('click')"
    v-bind="$attrs"
  >
    <div
      class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center"
    >
      <slot name="icon"></slot>
    </div>
    <span
      class="nav-link-text"
      :class="this.$store.state.isRTL ? ' me-1' : 'ms-1'"
      >{{ navText }}</span
    >
  </a>
</template>

<script>
export default {
  name: "sidenav-item",
  props: {
    url: {
      type: String,
      required: false,
      default: "#",
    },
    navText: {
      type: String,
      required: true,
    },
    isLogout: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
