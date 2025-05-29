<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="card-header pb-0">
                <h6>Tabel Admin</h6>
                <RouterLink
                  to="/admin/create"
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
                          Username
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
                      <tr v-for="admin in admins" :key="admin.id">
                        <td>
                          <div class="d-flex align-items-center px-3">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ admin.id }}
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
                              {{ admin.username }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center-0">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ admin.created_at }}
                            </p>
                          </div>
                        </td>

                        <td class="align-middle text-center">
                          <button
                            class="btn btn-danger"
                            type="button"
                            @click="deleteAdmin(admin.id)"
                          >
                            <span class="btn-inner--icon"
                              ><i class=""></i
                            ></span>
                            <span class="btn-inner--text">Hapus</span>
                          </button>
                          <RouterLink
                            :to="`/adminDetail/${admin.id}`"
                            class="btn btn-info"
                            type="button"
                          >
                            <span class="btn-inner--icon"></span>
                            <span class="btn-inner--text">Detail</span>
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
    const admins = ref([]);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const deleteAdmin = async (id) => {
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
            fetch(`http://localhost:8080/admin/${id}`, {
              method: "DELETE",
            });
            admins.value = admins.value.filter((admin) => admin.id !== id);
            swalWithBootstrapButtons.fire(
              "Berhasil!",
              "Data admin berhasil dihapus",
              "success"
            );
          }
        });
    };

    onMounted(async () => {
      await fetch("http://localhost:8080/admin/admin", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          admins.value = data;
        })

        .catch((error) => {
          console.error(error);
        });
    });

    return {
      deleteAdmin,
      admins,
      swalWithBootstrapButtons,
    };
  },
  computed: {
    dataLength: function () {
      if (this.admins) {
        return this.admins.length;
      }
    },
  },
};
</script>
