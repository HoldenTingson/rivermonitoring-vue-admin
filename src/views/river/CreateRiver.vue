<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Tambah Titik Air</h6>
            <form>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >ID</label
                >
                <input
                  class="form-control"
                  type="height"
                  id="example-text-input"
                  v-model="data.id"
                />
              </div>
              <div v-if="idError" class="error_message">
                {{ idError }}
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
            <button class="btn btn-success" type="button" @click="createRiver">
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
import { reactive, onMounted, ref } from "vue";
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
      latitude: "0.5071",
      longitude: "101.4478",
      location: "",
    });

    const idError = ref("");
    const locationError = ref("");

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    let map;
    let marker;
    const myIcon = L.icon({
      iconUrl: "https://gobanjirclient.netlify.app/assets/blue.png",
      iconSize: [70, 70],
    });
    onMounted(() => {
      map = L.map("map").setView([0.5071, 101.4478], 16);
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

    const validateId = () => {
      let isValid = true;

      if (data.id.length != 4) {
        idError.value = "Id must be equal to 4 characters long";
        isValid = false;
      }

      return isValid;
    };
    const validateLocation = () => {
      let isValid = true;

      if (data.location.length > 50) {
        locationError.value = "Location cannot exceed 50 characters long";
        isValid = false;
      }

      return isValid;
    };

    const clearErrors = () => {
      idError.value = "";
      locationError.value = "";
    };

    const createRiver = async () => {
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

      const isIdValid = validateId();
      const isLocationValid = validateLocation();

      if (!isIdValid || !isLocationValid) {
        return;
      }

      try {
        const res = await fetch(
          "https://rivermonitoring-golang-backend-production.up.railway.app/river",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        if (res.ok) {
          await swalWithBootstrapButtons.fire({
            title: "Berhasil!",
            text: "Data river berhasil ditambahkan",
            icon: "success",
            confirmButtonColor: "#2dce89",
          });
          window.location.href = "/river";
        } else {
          throw new Error();
        }
        console.log(data);
      } catch (error) {
        await swalWithBootstrapButtons.fire({
          title: "Gagal!",
          text: "Data river gagal ditambahkan",
          icon: "error",
          confirmButtonColor: "#2dce89",
        });
        console.error("Error fetching data:", error);
      }
    };

    return {
      createRiver,
      data,
      map,
      marker,
      swalWithBootstrapButtons,
      idError,
      locationError,
      validateId,
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

<style>
.error_message {
  color: #e74c3c;
  font-size: 11px;
  margin-bottom: 10px;
}
</style>
