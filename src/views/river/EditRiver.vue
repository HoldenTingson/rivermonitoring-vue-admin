<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Edit Titik Air</h6>
            <form>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >ID
                </label>
                <input
                  class="form-control"
                  type="height"
                  id="example-text-input"
                  v-model="data.id"
                  readonly
                />
              </div>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Location</label
                >
                <input
                  class="form-control"
                  type="height"
                  id="example-text-input"
                  v-model="data.location"
                  required
                />
              </div>
              <div v-if="locationError" class="error_message">
                {{ locationError }}
              </div>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Map</label
                >
                <div id="map" style="height: 400px"></div>
              </div>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Height</label
                >
                <input
                  class="form-control"
                  type="height"
                  v-model="data.height"
                  id="example-text-input"
                  readonly
                />
              </div>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Status</label
                >
                <input
                  class="form-control"
                  type="height"
                  v-model="data.status"
                  id="example-text-input"
                  readonly
                />
              </div>
              <!-- <div class="form-group">
                <label for="example-search-input" class="form-control-label"
                  >Content</label
                >
                <input
                  class="form-control"
                  type="status"
                  id="example-search-input"
                />
              </div> -->
            </form>
            <RouterLink
              to="/river"
              class="btn btn-danger"
              type="button"
              style="margin-right: 10px"
            >
              <span class="btn-inner--icon"><i></i></span>
              <span class="btn-inner--text">Kembali</span>
            </RouterLink>
            <button class="btn btn-success" type="button" @click="editRiver">
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
import {
  LMap,
  LTileLayer,
  LIcon,
  LMarker,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

export default {
  name: "CreateRiver",
  setup() {
    const data = reactive({
      id: "",
      latitude: "",
      longitude: "",
      location: "",
      height: "",
      status: "",
    });

    const locationError = ref("");

    let map;
    let marker;
    const myIcon = L.icon({
      iconUrl: "https://gobanjirclient.netlify.app/assets/blue.png",
      iconSize: [70, 70],
    });

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const route = useRoute();

    const riverId = route.params.riverId;

    const validateLocation = () => {
      let isValid = true;

      if (data.location.length > 50) {
        locationError.value = "Location cannot exceed 50 characters long";
        isValid = false;
      }

      return isValid;
    };

    const clearErrors = () => {
      locationError.value = "";
    };

    const editRiver = async () => {
      clearErrors();

      if (!Object.values(data).every((value) => value !== "")) {
        swalWithBootstrapButtons.fire({
          title: "Gagal!",
          text: "Lengkapi semua field data!",
          icon: "error",
          confirmButtonColor: "#2d3e50",
        });
        return;
      }

      if (!validateLocation()) {
        return;
      }
      try {
        const res = await fetch(
          `https://rivermonitoring-golang-backend-production.up.railway.app/river/${riverId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        if (res.ok) {
          await swalWithBootstrapButtons.fire({
            title: "Berhasil!",
            text: "Data river berhasil diedit",
            icon: "success",
            confirmButtonColor: "#2d3e50",
          });

          window.location.href = "/river";
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
      await fetch(
        `https://rivermonitoring-golang-backend-production.up.railway.app/river/${riverId}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((res) => {
          Object.assign(data, {
            id: res.id,
            latitude: res.latitude,
            longitude: res.longitude,
            location: res.location,
            height: res.height,
            status: res.status,
          });
        })
        .catch((error) => {
          console.error(error);
        });

      map = L.map("map").setView([data.latitude, data.longitude], 16);
      L.tileLayer(
        "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=5103da353f1446208a040c5349ed4c51",
        {
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      ).addTo(map);

      marker = L.marker([data.latitude, data.longitude], {
        icon: myIcon,
        draggable: true,
      }).addTo(map);

      marker.on("move", (event) => {
        const latlng = event.target.getLatLng();
        data.latitude = latlng.lat.toString();
        data.longitude = latlng.lng.toString();

        map.setView(latlng, map.getZoom());
      });
    });

    return {
      editRiver,
      data,
      map,
      marker,
      swalWithBootstrapButtons,
      locationError,
      validateLocation,
      clearErrors,
    };
  },
  components: {
    LMap,
    LTileLayer,
    LIcon,
    LMarker,
    LPopup,
  },
};
</script>
