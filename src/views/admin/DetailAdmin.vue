<template>
  <div class="container-fluid py-4">
    <h1 class="h3 mb-4" style="color: white">Detail Admin</h1>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-2">ID</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.id }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Username</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.username }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Created At</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.created_at }}</div>
            </div>
            <br />
            <RouterLink to="/admin" class="btn btn-danger" type="button">
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
  name: "DetailAdmin",
  setup() {
    const data = reactive({
      id: "",
      username: "",
      created_at: "",
    });

    const route = useRoute();

    const adminId = route.params.adminId;

    onMounted(async () => {
      await fetch(`http://localhost:8080/admin/${adminId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((res) => {
          Object.assign(data, {
            id: res.id,
            username: res.username,
            created_at: res.created_at,
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
