import { createRouter, createWebHistory } from "vue-router";
import News from "../views/news/News.vue";
import CreateNews from "../views/news/CreateNews.vue";
import EditNews from "../views/news/EditNews.vue";
import DetailNews from "../views/news/DetailNews.vue";
import Login from "../views/Login.vue";
import User from "../views/user/User.vue";
import CreateUser from "../views/user/CreateUser.vue";
import DetailUser from "../views/user/DetailUser.vue";
import Admin from "../views/admin/Admin.vue";
import CreateAdmin from "../views/admin/CreateAdmin.vue";
import DetailAdmin from "../views/admin/DetailAdmin.vue";
import Report from "../views/report/Report.vue";
import CreateReport from "../views/report/CreateReport.vue";
import DetailReport from "../views/report/DetailReport.vue";
import River from "../views/river/River.vue";
import CreateRiver from "../views/river/CreateRiver.vue";
import EditRiver from "../views/river/EditRiver.vue";
import History from "../views/river/History.vue";
import DetailHistory from "../views/river/DetailHistory.vue";
import Gallery from "../views/gallery/Gallery.vue";
import CreateGallery from "../views/gallery/CreateGallery.vue";
import EditGallery from "../views/gallery/EditGallery.vue";
import DetailGallery from "../views/gallery/DetailGallery.vue";
import Carrousel from "../views/carrousel/Carrousel.vue";
import CreateCarrousel from "../views/carrousel/CreateCarrousel.vue";
import EditCarrousel from "../views/carrousel/EditCarrousel.vue";
import DetailCarrousel from "../views/carrousel/DetailCarrousel.vue";
import store from "../store/index.js";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "/",
      redirect: "/login",
    },
    {
      path: "/river",
      name: "Titik Air",
      component: River,
      meta: { requiresAuth: true },
    },
    {
      path: "/river/create",
      name: "Form Tambah Titik Air",
      component: CreateRiver,
      meta: { requiresAuth: true },
    },
    {
      path: "/riverEdit/:riverId",
      name: "Form Edit Titik Air",
      component: EditRiver,
      meta: { requiresAuth: true },
    },
    {
      path: "/riverDetail/:riverId",
      name: "Histori Titik Air",
      component: History,
      meta: { requiresAuth: true },
    },
    {
      path: "/historyDetail/:historyId",
      name: "Detail Histori",
      component: DetailHistory,
      meta: { requiresAuth: true },
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: { requiresAuth: true },
    },
    {
      path: "/admin/create",
      name: "Form Tambah Admin",
      component: CreateAdmin,
      meta: { requiresAuth: true },
    },
    {
      path: "/adminDetail/:adminId",
      name: "Detail Admin",
      component: DetailAdmin,
      meta: { requiresAuth: true },
    },
    {
      path: "/user",
      name: "User",
      component: User,
      meta: { requiresAuth: true },
    },
    {
      path: "/user/create",
      name: "Form Tambah User",
      component: CreateUser,
      meta: { requiresAuth: true },
    },
    {
      path: "/userDetail/:userId",
      name: "Detail User",
      component: DetailUser,
      meta: { requiresAuth: true },
    },
    {
      path: "/report",
      name: "Laporan",
      component: Report,
      meta: { requiresAuth: true },
    },
    {
      path: "/report/create",
      name: "Form Tambah Laporan",
      component: CreateReport,
      meta: { requiresAuth: true },
    },
    {
      path: "/reportDetail/:reportId",
      name: "Detail Laporan",
      component: DetailReport,
      meta: { requiresAuth: true },
    },

    {
      path: "/gallery",
      name: "Galeri",
      component: Gallery,
      meta: { requiresAuth: true },
    },
    {
      path: "/gallery/create",
      name: "Form Tambah Galeri",
      component: CreateGallery,
      meta: { requiresAuth: true },
    },
    {
      path: "/galleryEdit/:galleryId",
      name: "Form Edit Galeri",
      component: EditGallery,
      meta: { requiresAuth: true },
    },
    {
      path: "/galleryDetail/:galleryId",
      name: "Detail Galeri",
      component: DetailGallery,
      meta: { requiresAuth: true },
    },
    {
      path: "/carrousel",
      name: "Carrousel",
      component: Carrousel,
      meta: { requiresAuth: true },
    },
    {
      path: "/carrousel/create",
      name: "Form Tambah Carrousel",
      component: CreateCarrousel,
      meta: { requiresAuth: true },
    },
    {
      path: "/carrouselEdit/:carrouselId",
      name: "Form Edit Carrousel",
      component: EditCarrousel,
      meta: { requiresAuth: true },
    },
    {
      path: "/carrouselDetail/:carrouselId",
      name: "Detail Carrousel",
      component: DetailCarrousel,
      meta: { requiresAuth: true },
    },
    {
      path: "/news",
      name: "News",
      component: News,
      meta: { requiresAuth: true },
    },
    {
      path: "/news/create",
      name: "Form Tambah News",
      component: CreateNews,
      meta: { requiresAuth: true },
    },
    {
      path: "/newsEdit/:newsId",
      name: "Form Edit News",
      component: EditNews,
      meta: { requiresAuth: true },
    },
    {
      path: "/newsDetail/:newsId",
      name: "Detail News",
      component: DetailNews,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.authenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
