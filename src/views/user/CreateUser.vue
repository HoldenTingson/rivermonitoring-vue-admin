<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Tambah User</h6>
            <form>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Username</label
                >
                <input
                  class="form-control"
                  type="username"
                  v-model="data.username"
                  id="example-username-input"
                />
              </div>
              <div v-if="usernameError" class="error_message">
                {{ usernameError }}
              </div>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Email</label
                >
                <input
                  class="form-control"
                  type="email"
                  v-model="data.email"
                  id="example-email-input"
                />
              </div>
              <div v-if="emailError" class="error_message">
                {{ emailError }}
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
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Phone</label
                >
                <input
                  class="form-control"
                  type="phone"
                  v-model="data.phone"
                  id="example-password-input"
                  @input="data.phone = data.phone.replace(/\D/g, '')"
                />
              </div>
              <div v-if="phoneError" class="error_message">
                {{ phoneError }}
              </div>
              <div class="form-group">
                <label class="custom-file-label" for="customFileLang"
                  >Profile</label
                >

                <div class="image-preview">
                  <img
                    v-if="imagePreview"
                    :src="imagePreview"
                    style="width: 30%; margin-bottom: 10px"
                  />
                </div>

                <input
                  type="file"
                  class="custom-file-input form-control"
                  id="customFileLang"
                  lang="en"
                  accept="image/*"
                  @change="handleFileChange"
                />
              </div>
              <div v-if="profileError" class="error_message">
                {{ profileError }}
              </div>
            </form>
            <RouterLink to="/user" class="btn btn-danger" type="button">
              <span class="btn-inner--icon"><i></i></span>
              <span class="btn-inner--text">Kembali</span>
            </RouterLink>
            <button
              class="btn btn-success"
              type="button"
              style="margin-left: 10px"
              @click="createUser"
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
  name: "CreateUser",
  setup() {
    const data = reactive({
      username: "",
      email: "",
      password: "",
      phone: "",
      profile: "",
    });

    const emailError = ref("");
    const usernameError = ref("");
    const passwordError = ref("");
    const phoneError = ref("");
    const profileError = ref("");

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const image = reactive({
      blob: "",
      path: "./uploads/profile",
      filename: "",
    });

    const imagePreview = ref(null);

    const timestamp = Date.now(); // Generate a timestamp

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      profileError.value = "";
      if (!file) return;

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        profileError.value = "Profile file size cannot exceed 5MB";
        event.target.value = "";
        imagePreview.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        imagePreview.value = reader.result;
        image.blob = reader.result; // Store the file content as a data URL in data.content
        image.filename = `${timestamp}_${file.name}`;
        data.profile = `${timestamp}_${file.name}`;
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    };

    // Email validation function
    const validateEmail = () => {
      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        emailError.value = "Email format is invalid";
        isValid = false;
      }

      return isValid;
    };

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

    const validatePhone = () => {
      phoneError.value = "";

      if (!data.phone) {
        phoneError.value = "Phone number is required";
        return false;
      }

      if (data.phone.length < 12) {
        phoneError.value = "Phone number must be at least 12 digits long";
        return false;
      }

      if (data.phone.length > 15) {
        phoneError.value = "Phone number cannot exceed 15 digits long";
        return false;
      }

      return true;
    };

    const clearErrors = () => {
      emailError.value = "";
      usernameError.value = "";
      passwordError.value = "";
      phoneError.value = "";
    };

    const createUser = async () => {
      clearErrors();

      if (!Object.values(data).every((value) => value !== "")) {
        swalWithBootstrapButtons.fire({
          title: "Gagal!",
          text: "Lengkapi semua field data!",
          icon: "error",
          confirmButtonColor: "#2dce89",
        });
        return;
      }

      const isEmailValid = validateEmail();
      const isUsernameValid = validateUsername();
      const isPhoneValid = validatePhone();
      const isPasswordValid = validatePassword();

      if (
        !isEmailValid ||
        !isUsernameValid ||
        !isPhoneValid ||
        !isPasswordValid
      ) {
        return;
      }

      // Only upload image if there is one
      if (image.blob) {
        try {
          const res = await fetch(
            "https://rivermonitoring-golang-backend-production.up.railway.app/admin/upload",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(image),
              credentials: "include",
            }
          );
          if (!res.ok) {
            throw new Error();
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          swalWithBootstrapButtons.fire({
            title: "Gagal!",
            text: "Gagal mengupload gambar",
            icon: "error",
            confirmButtonColor: "#2dce89",
          });
          return;
        }
      }

      try {
        const res = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/user",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        if (res.ok) {
          await swalWithBootstrapButtons.fire({
            title: "Berhasil!",
            text: "Data user berhasil ditambahkan",
            icon: "success",
            confirmButtonColor: "#2dce89",
          });
          window.location.href = "/user";
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error("Error creating user:", error);
        swalWithBootstrapButtons.fire({
          title: "Gagal!",
          text: "Data user gagal ditambahkan",
          icon: "error",
          confirmButtonColor: "#2dce89",
        });
      }
    };

    return {
      createUser,
      data,
      image,
      handleFileChange,
      imagePreview,
      swalWithBootstrapButtons,
      emailError,
      usernameError,
      profileError,
      passwordError,
      phoneError,
      validateEmail,
      validatePassword,
      validatePhone,
      validateUsername,
      clearErrors,
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
