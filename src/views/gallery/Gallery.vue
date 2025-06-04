<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="card-header pb-0">
                <h6>Tabel Galeri</h6>
                <RouterLink
                  to="/gallery/create"
                  class="btn btn-success"
                  type="button"
                >
                  <span class="btn-inner--icon"> </span>
                  <span class="btn-inner--text">Tambah</span>
                </RouterLink>
              </div>
              <div
                class="card-body px-0 pt-0"
                :class="{
                  'pb-0': dataLength > 0,
                }"
              >
                <div class="table-responsive p-0">
                  <table
                    class="table align-items-center justify-content-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4"
                        >
                          ID
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 pe-10"
                        >
                          Title
                        </th>

                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Image
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 pe-8"
                        >
                          Date
                        </th>

                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
                        >
                          Action
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        style="height: 50px"
                        v-for="gallery in gallerys"
                        :key="gallery.id"
                      >
                        <td>
                          <div class="d-flex align-items-center px-3">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ gallery.id }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div
                            class="d-flex align-items-center px-0"
                            style="
                              display: -webkit-box !important;
                              -webkit-line-clamp: 5;
                              -webkit-box-orient: vertical;
                              white-space: normal;
                              overflow: auto;
                              text-overflow: ellipsis;
                              max-width: 500px;
                            "
                          >
                            <p class="text-sm font-weight-bold mb-0">
                              {{ gallery.title }}
                            </p>
                          </div>
                        </td>

                        <td>
                          <div class="d-flex align-items-center">
                            <p class="text-sm font-weight-bold mb-0">
                              <img
                                style="width: 50%"
                                :src="`https://rivermonitoring-golang-backend-production.up.railway.app/uploads/gallery/${gallery.image}`"
                              />
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center-0">
                            <p
                              class="text-sm font-weight-bold mb-0"
                              style="
                                display: -webkit-box !important;
                                -webkit-line-clamp: 5;
                                -webkit-box-orient: vertical;
                                white-space: normal;
                                overflow: auto;
                                text-overflow: ellipsis;
                                max-width: 600px;
                              "
                            >
                              {{ gallery.date }}
                            </p>
                          </div>
                        </td>
                        <td class="align-middle text-center">
                          <RouterLink
                            class="btn btn-primary"
                            type="button"
                            :to="`/galleryEdit/${gallery.id}`"
                            style="margin-top: 17px"
                          >
                            <span class="btn-inner--icon"> </span>
                            <span class="btn-inner--text">Edit</span>
                          </RouterLink>
                          <button
                            class="btn btn-danger"
                            type="button"
                            @click="deleteGallery(gallery.id)"
                            style="margin-top: 17px"
                          >
                            <span class="btn-inner-icon"> </span>
                            <span class="btn-inner-text">Hapus</span>
                          </button>
                          <RouterLink
                            class="btn btn-info"
                            type="button"
                            :to="`/galleryDetail/${gallery.id}`"
                            style="margin-top: 17px"
                          >
                            <span class="btn-inner-icon"> </span>
                            <span class="btn-inner-text">Detail</span>
                          </RouterLink>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-primary,
.btn-danger,
.btn-info {
  margin-left: 5px;
}
</style>

<script>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
export default {
  name: "tables",

  setup() {
    const gallerys = ref([]);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const deleteGallery = async (id) => {
      swalWithBootstrapButtons
        .fire({
          title: "Apakah anda yakin ingin menghapus data ini?",
          text: "Data ini tidak dapat ditampilkan lagi!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#2d3e50",
          cancelButtonColor: "#d33",
          cancelButtonText: "Tidak",
          confirmButtonText: "Ya",
        })
        .then((result) => {
          if (result.isConfirmed) {
            fetch(
              `https://rivermonitoring-golang-backend-production.up.railway.app/gallery/${id}`,
              {
                method: "DELETE",
              }
            );
            gallerys.value = gallerys.value.filter(
              (gallery) => gallery.id !== id
            );
            swalWithBootstrapButtons.fire(
              "Berhasil!",
              "Data gallery berhasil dihapus",
              "success"
            );
          }
        });
    };

    onMounted(async () => {
      await fetch(
        "https://rivermonitoring-golang-backend-production.up.railway.app/gallery",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          gallerys.value = data;
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return {
      deleteGallery,
      gallerys,
      swalWithBootstrapButtons,
    };
  },
  computed: {
    dataLength: function () {
      if (this.gallerys) {
        return this.gallerys.length;
      }
    },
  },
};
</script>
