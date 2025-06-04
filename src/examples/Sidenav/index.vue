<template>
  <div
    v-bind="$attrs"
    v-show="this.$store.state.layout === 'default'"
    class="min-height-300 position-absolute w-100"
    :class="`${this.$store.state.darkMode ? 'bg-transparent' : 'bg-success'}`"
  />
  <aside
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    :class="`${
      this.$store.state.isRTL
        ? 'me-3 rotate-caret fixed-end'
        : 'fixed-start ms-3'
    } 
    ${
      this.$store.state.layout === 'landing'
        ? 'bg-transparent shadow-none'
        : ' '
    } ${this.$store.state.sidebarType}`"
    id="sidenav-main"
    style="z-index: 100 !important"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <div class="m-0 navbar-brand">
        <img
          src="https://gobanjirclient.netlify.app/assets/bpbdriau.png"
          class="navbar-brand-img h-100"
          alt="main_logo"
        />
        <span
          class="ms-2 font-weight-bold me-2"
          style="margin-left: 15px !important"
          >Go Banjir</span
        >
      </div>
    </div>

    <sidenav-list :cardBg="custom_class" />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct-dark.png";
import logoWhite from "@/assets/img/logo-ct.png";

export default {
  name: "index",
  components: {
    SidenavList,
  },
  data() {
    return {
      logo,
      logoWhite,
    };
  },
  props: ["custom_class", "layout"],
};
</script>
