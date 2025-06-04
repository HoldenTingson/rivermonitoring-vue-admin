<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Tambah Admin</h6>
            <form>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Username</label
                >
                <input
                  class="form-control"
                  type="username"
                  v-model="data.username"
                  id="example-text-input"
                />
              </div>
              <div v-if="usernameError" class="error_message">
                {{ usernameError }}
              </div>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Password</label
                >
                <input
                  class="form-control"
                  type="password"
                  v-model="data.password"
                  id="example-text-input"
                />
              </div>
              <div v-if="passwordError" class="error_message">
                {{ passwordError }}
              </div>
            </form>
            <RouterLink to="/admin" class="btn btn-danger" type="button">
              <span class="btn-inner--icon"><i></i></span>
              <span class="btn-inner--text">Kembali</span>
            </RouterLink>
            <button
              class="btn btn-success"
              type="button"
              style="margin-left: 10px"
              @click="createAdmin"
            >
              <span class="btn-inner--icon"><i class=""></i></span>
              <span class="btn-inner--text">Tambah</span>
            </button>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table
                class="table align-items-center justify-content-center mb-0"
              >
                <thead></thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
export default {
  name: "CreateAdmin",
  setup() {
    const data = reactive({
      username: "",
      password: "",
    });

    const usernameError = ref("");
    const passwordError = ref("");

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const validatePassword = () => {
      let isValid = true;

      if (!data.password) {
        passwordError.value = "Password is required";
        isValid = false;
      } else if (data.password.length < 8) {
        passwordError.value = "Password must be at least 8 characters long";
        isValid = false;
      } else if (data.password.length > 30) {
        passwordError.value = "Password cannot exceed 30 characters long";
        isValid = false;
      }

      return isValid;
    };
    const validateUsername = () => {
      let isValid = true;

      if (!data.username) {
        usernameError.value = "Username is required";
        isValid = false;
      } else if (data.username.length < 3) {
        usernameError.value = "Username must be at least 3 characters long";
        isValid = false;
      } else if (data.username.length > 20) {
        usernameError.value = "Username cannot exceed 20 characters long";
        isValid = false;
      }

      return isValid;
    };
    const clearErrors = () => {
      passwordError.value = "";
      usernameError.value = "";
    };

    const createAdmin = async () => {
      clearErrors();

      const isPasswordVaild = validatePassword();
      const isUsernameValid = validateUsername();

      if (!isPasswordVaild || !isUsernameValid) {
        return;
      }

      try {
        const res = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/admin/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        if (res.ok) {
          await swalWithBootstrapButtons.fire({
            title: "Berhasil!",
            text: "Data admin berhasil ditambahkan",
            icon: "success",
            confirmButtonColor: "#2dce89",
          });
          window.location.href = "/admin";
        } else {
          throw new Error();
        }
      } catch (error) {
        swalWithBootstrapButtons.fire({
          title: "Gagal!",
          text: "Data admin gagal ditambahkan",
          icon: "error",
          confirmButtonColor: "#2dce89",
        });
      }
    };

    return {
      createAdmin,
      data,
      swalWithBootstrapButtons,
      validatePassword,
      validateUsername,
      clearErrors,
      usernameError,
      passwordError,
    };
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
