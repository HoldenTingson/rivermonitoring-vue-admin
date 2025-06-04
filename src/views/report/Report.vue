<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="card-header pb-0">
                <h6>Tabel Laporan</h6>
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
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Content
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Attachment
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 pe-8"
                        >
                          Name
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 pe-8"
                        >
                          Email
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          Phone
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                          User ID
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
                        v-for="report in reports"
                        :key="report.id"
                      >
                        <td>
                          <div class="d-flex align-items-center px-3">
                            <p class="text-sm font-weight-bold mb-0">
                              {{ report.id }}
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
                              max-width: 100px;
                            "
                          >
                            <p class="text-sm font-weight-bold mb-0">
                              {{ report.content }}
                            </p>
                          </div>
                        </td>

                        <td>
                          <div class="d-flex align-items-center-0">
                            <p class="text-sm font-weight-bold mb-0">
                              <img
                                style="width: 100%"
                                :src="`https://rivermonitoring-golang-backend-production.up.railway.app/uploads/report/${report.attachment}`"
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
                                max-width: 200px;
                              "
                            >
                              {{ report.name }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center-0">
                            <p
                              class="text-sm font-weight-bold mb-0"
                              style="
                                display: -webkit-box !important;
                                -webkit-line-clamp: 3;
                                -webkit-box-orient: vertical;
                                white-space: normal;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                max-width: 200px;
                              "
                            >
                              {{ report.email }}
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
                                max-width: 100px;
                              "
                            >
                              {{ report.phone }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center-0">
                            <p
                              class="text-sm font-weight-bold mb-0"
                              style="
                                display: -webkit-box !important;
                                -webkit-line-clamp: 3;
                                -webkit-box-orient: vertical;
                                white-space: normal;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                max-width: 100px;
                              "
                            >
                              {{ report.user_id }}
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
                              {{ report.created_at }}
                            </p>
                          </div>
                        </td>
                        <td class="align-middle text-center">
                          <button
                            class="btn btn-danger"
                            type="button"
                            @click="deleteReport(report.id)"
                          >
                            <span class="btn-inner-icon"> </span>
                            <span class="btn-inner-text">Hapus</span>
                          </button>
                          <RouterLink
                            class="btn btn-info"
                            type="button"
                            :to="`/reportDetail/${report.id}`"
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
    const reports = ref([]);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const deleteReport = async (id) => {
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
              `https://rivermonitoring-golang-backend-production.up.railway.app/report/${id}`,
              {
                method: "DELETE",
              }
            );
            reports.value = reports.value.filter((news) => news.id !== id);
            swalWithBootstrapButtons.fire(
              "Berhasil!",
              "Data report berhasil dihapus",
              "success"
            );
          }
        });
    };

    onMounted(async () => {
      await fetch(
        "https://rivermonitoring-golang-backend-production.up.railway.app/report",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          reports.value = data;
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return {
      deleteReport,
      reports,
      swalWithBootstrapButtons,
    };
  },
  computed: {
    dataLength: function () {
      if (this.reports) {
        return this.reports.length;
      }
    },
  },
};
</script>
