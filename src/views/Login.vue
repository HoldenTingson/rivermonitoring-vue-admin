<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div
                  class="pb-0 card-header text-start"
                  style="background-color: transparent !important"
                >
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form @submit.prevent>
                    <div class="mb-3">
                      <input
                        type="name"
                        placeholder="Username"
                        name="email"
                        class="form-control"
                        v-model="admin.username"
                      />
                    </div>
                    <div v-if="usernameError" class="error_message">
                      {{ usernameError }}
                    </div>
                    <div class="mb-3">
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        class="form-control"
                        v-model="admin.password"
                      />
                    </div>
                    <div v-if="passwordError" class="error_message">
                      {{ passwordError }}
                    </div>

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        @click="submit"
                        >Sign in</argon-button
                      >
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url('https://gobanjirclient.netlify.app/assets/banjir.jpeg');
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h3
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  "Selamat Datang"
                </h3>
                <p class="text-white position-relative">
                  Di Halaman Admin Banjir Pemerintah Kota Pekanbaru!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
import { useStore } from "vuex";

export default {
  name: "signin",
  components: {
    Navbar,
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  setup() {
    const admin = reactive({
      username: "",
      password: "",
    });

    const usernameError = ref("");
    const passwordError = ref("");

    const store = useStore();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const validatePassword = () => {
      let isValid = true;

      if (!admin.password) {
        passwordError.value = "Password is required";
        isValid = false;
      } else if (admin.password.length < 8) {
        passwordError.value = "Password must be at least 8 characters long";
        isValid = false;
      } else if (admin.password.length > 30) {
        passwordError.value = "Password cannot exceed 30 characters long";
        isValid = false;
      }

      return isValid;
    };
    const validateUsername = () => {
      let isValid = true;

      if (!admin.username) {
        usernameError.value = "Username is required";
        isValid = false;
      } else if (admin.username.length < 3) {
        usernameError.value = "Username must be at least 3 characters long";
        isValid = false;
      } else if (admin.username.length > 20) {
        usernameError.value = "Username cannot exceed 20 characters long";
        isValid = false;
      }

      return isValid;
    };
    const clearErrors = () => {
      passwordError.value = "";
      usernameError.value = "";
    };

    const submit = async () => {
      clearErrors();

      const isPasswordVaild = validatePassword();
      const isUsernameValid = validateUsername();

      if (!isPasswordVaild || !isUsernameValid) {
        return;
      }

      try {
        const res = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/admin/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin),
            credentials: "include",
          }
        );
        if (res.ok) {
          swalWithBootstrapButtons.fire({
            title: "Berhasil!",
            text: "Berhasil melakukan login",
            icon: "success",
            confirmButtonColor: "#2d3e50",
          });

          await store.dispatch("setAuth", true);
          window.location.href = "/river";
        } else {
          throw new Error();
        }
      } catch (error) {
        swalWithBootstrapButtons.fire({
          title: "Gagal!",
          text: "Username dengan password tidak sesuai!",
          icon: "error",
          confirmButtonColor: "#2d3e50",
        });
        console.error("Error fetching data:", error);
      }
    };

    return {
      admin,
      submit,
      swalWithBootstrapButtons,
      usernameError,
      passwordError,
      validatePassword,
      validateUsername,
      clearErrors,
    };
  },

  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
  },
};
</script>

<style>
.error_message {
  color: #e74c3c;
  font-size: 11px;
  margin-bottom: 10px;
}
</style>
