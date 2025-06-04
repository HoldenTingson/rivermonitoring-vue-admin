<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="card-header pb-0">
                <h6>Tabel Histori</h6>
                <RouterLink to="/river" class="btn btn-danger" type="button">
                  <span class="btn-inner--icon"> </span>
                  <span class="btn-inner--text">Kembali</span>
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
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                          ID
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Height
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Status
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Timestamp
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          River ID
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
                        v-for="history in historys"
                        :keys="history.id"
                      >
                        <td>
                          <div class="d-flex align-items-center px-3">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ history.id }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center px-0">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ history.height }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center-0">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ history.status }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center-0">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ history.timestamp }}
                            </p>
                          </div>
                        </td>

                        <td>
                          <div class="d-flex align-items-center-0">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ history.river_id }}
                            </p>
                          </div>
                        </td>
                        <td class="align-middle text-center">
                          <button
                            class="btn btn-danger"
                            type="button"
                            @click="deleteHistory(history.id)"
                          >
                            <span class="btn-inner-icon"> </span>
                            <span class="btn-inner-text">Hapus</span>
                          </button>
                          <RouterLink
                            class="btn btn-info"
                            type="button"
                            :to="`/historyDetail/${history.id}`"
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
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
export default {
  name: "tables",

  setup() {
    const historys = ref([]);
    const route = useRoute();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const riverId = route.params.riverId;
    const deleteHistory = async (id) => {
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
              `https://rivermonitoring-golang-backend-production.up.railway.app/history/${id}`,
              {
                method: "DELETE",
              }
            );
            historys.value = historys.value.filter(
              (carrousel) => carrousel.id !== id
            );
            swalWithBootstrapButtons.fire(
              "Berhasil!",
              "Data history berhasil dihapus",
              "success"
            );
          }
        });
    };

    onMounted(async () => {
      await fetch(
        `https://rivermonitoring-golang-backend-production.up.railway.app/history/river/${riverId}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          historys.value = data;
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return {
      deleteHistory,
      historys,
      riverId,
      swalWithBootstrapButtons,
    };
  },
  computed: {
    dataLength: function () {
      if (this.historys) {
        return this.historys.length;
      }
    },
  },
};
</script>
