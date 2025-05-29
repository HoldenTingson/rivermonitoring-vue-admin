<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Tambah Galeri</h6>
            <form>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Title</label
                >
                <input
                  class="form-control"
                  type="height"
                  v-model="data.title"
                  id="example-text-input"
                />
              </div>
              <div v-if="titleError" class="error_message">
                {{ titleError }}
              </div>
              <div class="form-group">
                <label class="custom-file-label" for="customFileLang"
                  >Image</label
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
              <div v-if="imageError" class="error_message">
                {{ imageError }}
              </div>
              <div class="form-group">
                <label for="example-date-input" class="form-control-label"
                  >Date</label
                >
                <input
                  class="form-control"
                  type="date"
                  v-model="data.date"
                  id="example-date-input"
                />
              </div>
            </form>
            <RouterLink to="/gallery" class="btn btn-danger" type="button">
              <span class="btn-inner--icon"><i></i></span>
              <span class="btn-inner--text">Kembali</span>
            </RouterLink>
            <button
              class="btn btn-success"
              type="button"
              style="margin-left: 10px"
              @click="createGallery"
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
  name: "CreateGallery",
  setup() {
    const data = reactive({
      title: "",
      image: "",
      date: "",
    });

    const image = reactive({
      blob: "",
      path: "../client/src/assets/gallery",
      filename: "",
    });

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const imageError = ref("");

    const titleError = ref("");

    const imagePreview = ref(null);

    const timestamp = Date.now(); // Generate a timestamp

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      imageError.value = "";
      if (!file) return;

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        imageError.value = "Image file size cannot exceed 5MB";
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        imagePreview.value = reader.result;
        image.blob = reader.result; // Store the file content as a data URL in data.content
        image.filename = `${timestamp}_${file.name}`;
        data.image = `${timestamp}_${file.name}`;
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    };

    const validateTitle = () => {
      let isValid = true;

      if (data.title.length > 30) {
        titleError.value = "Title cannot exceed 30 characters long";
        isValid = false;
      }

      return isValid;
    };
    const clearErrors = () => {
      titleError.value = "";
    };

    const createGallery = async () => {
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

      if (!validateTitle()) {
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(image),
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const res = await fetch("http://localhost:8080/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          await swalWithBootstrapButtons.fire({
            title: "Berhasil!",
            text: "Data gallery berhasil ditambahkan",
            icon: "success",
            confirmButtonColor: "#2dce89",
          });
          window.location.href = "/gallery";
        } else {
          throw new Error();
        }
        console.log(data);
      } catch (error) {
        await swalWithBootstrapButtons.fire({
          title: "Gagal!",
          text: "Data gallery gagal ditambahkan",
          icon: "error",
          confirmButtonColor: "#2dce89",
        });
        console.error("Error fetching data:", error);
      }
    };

    return {
      createGallery,
      data,
      image,
      handleFileChange,
      imagePreview,
      swalWithBootstrapButtons,
      titleError,
      imageError,
      validateTitle,
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
