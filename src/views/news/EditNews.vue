<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Edit News</h6>
            <form>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >ID</label
                >
                <input
                  class="form-control"
                  type="height"
                  v-model="data.id"
                  id="example-text-input"
                  readonly
                />
              </div>
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
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea
                  class="form-control"
                  type="description"
                  id="exampleFormControlTextarea1"
                  rows="10"
                  v-model="data.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Content</label>
                <textarea
                  class="form-control"
                  type="content"
                  id="exampleFormControlTextarea1"
                  rows="10
                        "
                  v-model="data.content"
                ></textarea>
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
                  <img
                    v-else
                    :src="`http://localhost:5173/src/assets/news/${data.image}`"
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
              <div class="form-group">
                <label for="example-date-input" class="form-control-label"
                  >Category</label
                >
                <input
                  class="form-control"
                  type="height"
                  v-model="data.category"
                  id="example-text-input"
                />
              </div>
              <div class="form-group">
                <label for="example-email-input" class="form-control-label"
                  >Created At</label
                >
                <input
                  class="form-control"
                  type="location"
                  v-model="data.created_at"
                  id="example-email-input"
                  readonly
                />
              </div>
            </form>
            <RouterLink
              to="/news"
              class="btn btn-danger"
              type="button"
              style="margin-right: 10px"
            >
              <span class="btn-inner--icon"><i></i></span>
              <span class="btn-inner--text">Kembali</span>
            </RouterLink>
            <button class="btn btn-success" type="button" @click="editNews">
              <span class="btn-inner--icon"><i class=""></i></span>
              <span class="btn-inner--text">Edit</span>
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
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";

export default {
  name: "EditNews",
  setup() {
    const data = reactive({
      id: "",
      title: "",
      content: "",
      description: "",
      image: "",
      category: "",
      created_at: "",
    });

    const image = reactive({
      blob: "",
      path: "../client/src/assets/news",
      filename: "",
    });

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const imagePreview = ref(null);

    const timestamp = Date.now(); // Generate a timestamp

    const handleFileChange = (event) => {
      const file = event.target.files[0]; // Get the first selected file

      const reader = new FileReader();
      reader.onload = () => {
        imagePreview.value = reader.result;
        image.blob = reader.result; // Store the file content as a data URL in data.content
        image.filename = `${timestamp}_${file.name}`;
        data.image = `${timestamp}_${file.name}`;
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    };

    const route = useRoute();

    const newsId = route.params.newsId;

    const editNews = async () => {
      if (!Object.values(data).every((value) => value !== "")) {
        swalWithBootstrapButtons.fire({
          title: "Gagal!",
          text: "Lengkapi semua field data!",
          icon: "error",
          confirmButtonColor: "#2d3e50",
        });
        return;
      }

      if (image.blob !== "") {
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
      }
      try {
        const res = await fetch(`http://localhost:8080/news/${newsId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          await swalWithBootstrapButtons.fire({
            title: "Berhasil!",
            text: "Data news berhasil diedit",
            icon: "success",
            confirmButtonColor: "#2d3e50",
          });

          window.location.href = "/news";
        } else {
          throw new Error();
        }
      } catch (error) {
        swalWithBootstrapButtons.fire({
          title: "Gagal!",
          text: "Tidak ada data yang diedit",
          icon: "error",
          confirmButtonColor: "#2d3e50",
        });
        console.error("Error fetching data:", error);
      }
    };

    onMounted(async () => {
      await fetch(`http://localhost:8080/news/${newsId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((res) => {
          Object.assign(data, {
            id: res.id,
            title: res.title,
            content: res.content,
            description: res.description,
            image: res.image,
            category: res.category,
            created_at: res.created_at,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return {
      editNews,
      data,
      handleFileChange,
      image,
      imagePreview,
      swalWithBootstrapButtons,
    };
  },
};
</script>
