<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="card-header pb-0">
                <h6>Tabel Titik Air</h6>
                <RouterLink
                  to="/river/create"
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
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                        >
                          ID
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Location
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Latitude
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Longitude
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
                          class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
                        >
                          Connection
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
                        v-for="river in rivers"
                        :key="river.id"
                      >
                        <td>
                          <div class="d-flex align-items-center px-2">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ river.id }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center px-0">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ river.location }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center-0">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ river.latitude }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center-0">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ river.longitude }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center-0">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ river.height }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center-0">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ river.status }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div
                            class="d-flex align-items-center justify-content-center"
                          >
                            <span
                              class="badge"
                              :class="{
                                'bg-success':
                                  sensorStatuses[river.id] === 'Terhubung',
                                'bg-danger':
                                  !sensorStatuses[river.id] ||
                                  sensorStatuses[river.id] === 'Terputus',
                              }"
                            >
                              {{
                                sensorStatuses[river.id]
                                  ? sensorStatuses[river.id]
                                  : "Terputus"
                              }}
                            </span>
                          </div>
                        </td>
                        <td class="align-middle text-center">
                          <button
                            class="btn"
                            :class="{
                              'btn-dark':
                                !sensorStatuses[river.id] ||
                                sensorStatuses[river.id] === 'Terputus',
                              'btn-warning':
                                sensorStatuses[river.id] === 'Terhubung',
                            }"
                            type="button"
                            @click="connectRiver(river.id)"
                            style="margin-top: 17px"
                          >
                            <span class="btn-inner-icon"> </span>
                            <span class="btn-inner-text">
                              {{
                                sensorStatuses[river.id] === "Terhubung"
                                  ? "Refresh"
                                  : "Hubungkan"
                              }}
                            </span>
                          </button>
                          <RouterLink
                            class="btn btn-primary"
                            type="button"
                            :to="
                              isSensorConnected(river.id)
                                ? '#'
                                : `/riverEdit/${river.id}`
                            "
                            :class="{ disabled: isSensorConnected(river.id) }"
                            style="margin-top: 17px"
                            :title="
                              isSensorConnected(river.id)
                                ? 'Edit tidak tersedia saat sensor terhubung'
                                : ''
                            "
                          >
                            <span class="btn-inner--icon"> </span>
                            <span class="btn-inner--text">Edit</span>
                          </RouterLink>
                          <button
                            class="btn btn-danger"
                            type="button"
                            @click="deleteRiver(river.id)"
                            :disabled="isSensorConnected(river.id)"
                            style="margin-top: 17px"
                            :title="
                              isSensorConnected(river.id)
                                ? 'Hapus tidak tersedia saat sensor terhubung'
                                : ''
                            "
                          >
                            <span class="btn-inner-icon"> </span>
                            <span class="btn-inner--text">Hapus</span>
                          </button>
                          <RouterLink
                            class="btn btn-info"
                            type="button"
                            :to="`/riverDetail/${river.id}`"
                            style="margin-top: 17px"
                          >
                            <span class="btn-inner-icon"> </span>
                            <span class="btn-inner--text">Histori</span>
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

.btn.disabled {
  pointer-events: none;
  cursor: not-allowed;
}
</style>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Swal from "sweetalert2";
export default {
  name: "tables",

  setup() {
    const rivers = ref([]);
    const sensorStatuses = ref({});
    const statusCheckInterval = ref(null);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    // Function to check sensor status for all rivers
    const checkSensorStatuses = async () => {
      for (const river of rivers.value) {
        try {
          const response = await fetch(
            `https://rivermonitoring-golang-backend-production.up.railway.app/river/status/${river.id}`,
            {
              method: "GET",
            }
          );

          if (response.ok) {
            const data = await response.json();
            sensorStatuses.value[river.id] = data.status;
          }
        } catch (error) {
          console.error(`Error checking status for sensor ${river.id}:`, error);
        }
      }
    };

    // Helper function to check if sensor is connected
    const isSensorConnected = (riverId) => {
      return sensorStatuses.value[riverId] === "Terhubung";
    };

    const deleteRiver = async (id) => {
      // Check if sensor is connected before proceeding
      if (isSensorConnected(id)) {
        swalWithBootstrapButtons.fire(
          "Tidak dapat menghapus",
          "Data river tidak dapat dihapus saat sensor terhubung. Harap putuskan koneksi sensor terlebih dahulu.",
          "warning"
        );
        return;
      }

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
              `https://rivermonitoring-golang-backend-production.up.railway.app/river/${id}`,
              {
                method: "DELETE",
              }
            );
            rivers.value = rivers.value.filter(
              (carrousel) => carrousel.id !== id
            );
            swalWithBootstrapButtons.fire(
              "Berhasil!",
              "Data river berhasil dihapus",
              "success"
            );
          }
        });
    };

    const connectRiver = async (id) => {
      const currentStatus = sensorStatuses.value[id];
      const actionText =
        currentStatus === "Terhubung"
          ? "menyegarkan status koneksi"
          : "menghubungkan data ini dengan sensor";

      swalWithBootstrapButtons
        .fire({
          title: `Apakah anda ingin ${actionText}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#2d3e50",
          cancelButtonColor: "#d33",
          cancelButtonText: "Tidak",
          confirmButtonText: "Ya",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await fetch(
                `https://rivermonitoring-golang-backend-production.up.railway.app/river/connect/${id}`,
                {
                  method: "GET",
                }
              );

              if (!response.ok) {
                throw new Error("Gagal menghubungkan data river");
              }

              const data = await response.json();
              sensorStatuses.value[id] = data.status;

              // Show appropriate message based on status
              let message = "Data river berhasil terdaftar";
              let icon = "success";

              if (data.status === "Terhubung") {
                message = "Sensor sudah terhubung dan aktif";
              } else if (data.message.includes("not active")) {
                message =
                  "Sensor terdaftar tapi tidak aktif. Pastikan perangkat ESP32 terhubung dengan internet";
                icon = "warning";
              }

              swalWithBootstrapButtons.fire("Status Koneksi!", message, icon);

              // Refresh status after connection attempt
              await checkSensorStatuses();
            } catch (error) {
              swalWithBootstrapButtons.fire(
                "Gagal!",
                "Data river gagal terhubung dengan sensor",
                "error"
              );
            }
          }
        });
    };

    onMounted(async () => {
      try {
        const response = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/river",
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          rivers.value = data;

          // Check initial sensor statuses
          await checkSensorStatuses();

          // Set up periodic status check every 10 seconds
          statusCheckInterval.value = setInterval(checkSensorStatuses, 3000);
        }
      } catch (error) {
        console.error("Error fetching river data:", error);
      }
    });

    onBeforeUnmount(() => {
      // Clear interval when component is destroyed
      if (statusCheckInterval.value) {
        clearInterval(statusCheckInterval.value);
      }
    });

    return {
      deleteRiver,
      connectRiver,
      rivers,
      sensorStatuses,
      swalWithBootstrapButtons,
      isSensorConnected,
    };
  },
  computed: {
    dataLength: function () {
      if (this.rivers) {
        return this.rivers.length;
      }
    },
  },
};
</script>
