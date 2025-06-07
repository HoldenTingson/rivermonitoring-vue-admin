<template>
  <div class="container-fluid py-4">
    <h1 class="h3 mb-4 text-gray-800" style="color: white">Detail Histori</h1>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <br />
            <div class="row">
              <div class="col-md-2">ID</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.id }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Height</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.height }} cm</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Status</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.status }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Timestamp</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.timestamp }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">River ID</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.river_id }}</div>
            </div>
            <br />
            <RouterLink
              :to="`/riverDetail/${data.river_id}`"
              class="btn btn-danger"
              type="button"
            >
              <span class="btn-inner--icon"><i></i></span>
              <span class="btn-inner--text">Kembali</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "DetailHistory",
  setup() {
    const data = reactive({
      id: "",
      height: "",
      status: "",
      timestamp: "",
      river_id: "",
    });

    const route = useRoute();

    const historyId = route.params.historyId;

    onMounted(async () => {
      await fetch(
        `https://rivermonitoring-golang-backend-production.up.railway.app/history/${historyId}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((res) => {
          Object.assign(data, {
            id: res.id,
            height: res.height,
            status: res.status,
            timestamp: res.timestamp,
            river_id: res.river_id,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return {
      data,
    };
  },
};
</script>
