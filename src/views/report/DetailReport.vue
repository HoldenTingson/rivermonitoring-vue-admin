<template>
  <div class="container-fluid py-4">
    <h1 class="h3 mb-4" style="color: white">Detail Laporan</h1>
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
              <div class="col-md-2">Title</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.content }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Content</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">
                <img
                  style="width: 50%"
                  :src="`https://rivermonitoring-golang-backend-production.up.railway.app/uploads/report/${data.attachment}`"
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Name</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.name }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Email</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.email }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Phone</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.phone }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">User ID</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.user_id }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Created At</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.created_at }}</div>
            </div>
            <br />
            <RouterLink to="/report" class="btn btn-danger" type="button">
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
  name: "DetailReport",
  setup() {
    const data = reactive({
      id: "",
      content: "",
      attachment: "",
      name: "",
      email: "",
      phone: "",
      user_id: "",
      created_at: "",
    });

    const route = useRoute();

    const reportId = route.params.reportId;

    onMounted(async () => {
      await fetch(
        `https://rivermonitoring-golang-backend-production.up.railway.app/report/${reportId}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((res) => {
          Object.assign(data, {
            id: res.id,
            content: res.content,
            attachment: res.attachment,
            name: res.name,
            email: res.email,
            phone: res.phone,
            user_id: res.user_id,
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
