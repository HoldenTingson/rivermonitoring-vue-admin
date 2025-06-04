<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6">
          DATA
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/river"
          :class="getRoute() === 'river' ? 'active' : ''"
          navText="Titik Air"
        >
          <template v-slot:icon>
            <i class="ni ni-sound-wave text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/gallery"
          :class="getRoute() === 'gallery' ? 'active' : ''"
          navText="Galeri"
        >
          <template v-slot:icon>
            <i class="ni ni-image text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <!-- <li class="nav-item">
        <sidenav-item
          url="/carrousel"
          :class="getRoute() === 'carrousel' ? 'active' : ''"
          navText="Carrousel"
        >
          <template v-slot:icon>
            <i class="ni ni-palette text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li> -->
      <li class="nav-item">
        <sidenav-item
          url="/user"
          :class="getRoute() === 'user' ? 'active' : ''"
          navText="User"
        >
          <template v-slot:icon>
            <i class="ni ni-circle-08 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/admin"
          :class="getRoute() === 'admin' ? 'active' : ''"
          navText="Admin"
        >
          <template v-slot:icon>
            <i class="ni ni-circle-08 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/report"
          :class="getRoute() === 'report' ? 'active' : ''"
          navText="Laporan"
        >
          <template v-slot:icon>
            <i class="ni ni-collection text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6">
          AKUN
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item :isLogout="true" navText="Logout" @click="logout">
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";
import Swal from "sweetalert2";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavItem,
    SidenavCard,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    async logout() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Apakah anda yakin ingin logout?",
          text: "Anda akan keluar dari akun anda!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#2d3e50",
          cancelButtonColor: "#d33",
          cancelButtonText: "Tidak",
          confirmButtonText: "Ya",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await fetch(
              "https://rivermonitoring-golang-backend-production.up.railway.app/admin/logout",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              }
            );
            window.location.replace("/");
            await this.$store.dispatch("setAuth", false);
          }
        });
    },
  },
};
</script>
