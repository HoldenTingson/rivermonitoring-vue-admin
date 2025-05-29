<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="card-header pb-0">
                <h6>Tabel News</h6>
                <RouterLink
                  to="/news/create"
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
                          Id
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Title
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Description
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Content
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Image
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Category
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Created At
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
                        v-for="newss in news"
                        :key="newss.id"
                      >
                        <td>
                          <div class="d-flex align-items-center px-3">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ newss.id }}
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
                              max-width: 200px;
                            "
                          >
                            <p class="text-sm font-weight-bold mb-0">
                              {{ newss.title }}
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
                                max-width: 200px;
                              "
                            >
                              {{ newss.description }}
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
                                max-width: 280px;
                              "
                            >
                              {{ newss.content }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center-0">
                            <p class="text-sm font-weight-bold mb-0">
                              <img
                                style="width: 50%"
                                :src="`http://localhost:5173/src/assets/news/${newss.image}`"
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
                                max-width: 400px;
                              "
                            >
                              {{ newss.category }}
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
                                max-width: 500px;
                              "
                            >
                              {{ newss.created_at }}
                            </p>
                          </div>
                        </td>
                        <td class="align-middle text-center">
                          <RouterLink
                            class="btn btn-primary"
                            type="button"
                            :to="`/newsEdit/${newss.id}`"
                            style="margin-top: 17px"
                          >
                            <span class="btn-inner--icon"> </span>
                            <span class="btn-inner--text">Edit</span>
                          </RouterLink>
                          <button
                            class="btn btn-danger"
                            type="button"
                            @click="deleteNews(newss.id)"
                            style="margin-top: 17px"
                          >
                            <span class="btn-inner-icon"> </span>
                            <span class="btn-inner-text">Hapus</span>
                          </button>
                          <RouterLink
                            class="btn btn-info"
                            type="button"
                            :to="`/newsDetail/${newss.id}`"
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
    const news = ref([]);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const deleteNews = async (id) => {
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
            fetch(`http://localhost:8080/news/${id}`, {
              method: "DELETE",
            });
            news.value = news.value.filter((news) => news.id !== id);
            swalWithBootstrapButtons.fire(
              "Berhasil!",
              "Data news berhasil dihapus",
              "success"
            );
          }
        });
    };

    onMounted(async () => {
      await fetch("http://localhost:8080/news/category", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          news.value = data;
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return {
      deleteNews,
      news,
      swalWithBootstrapButtons,
    };
  },
  computed: {
    dataLength: function () {
      if (this.news) {
        return this.news.length;
      }
    },
  },
};
</script>
