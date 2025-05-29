<template>
  <div class="container-fluid py-4">
    <h1 class="h3 mb-4" style="color: white">Detail User</h1>
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
              <div class="col-md-2">Profile</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">
                <img
                  style="width: 50%"
                  :src="`http://localhost:5173/src/assets/profile/${data.profile}`"
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Created At</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.created_at }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Change At</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.changed_at }}</div>
            </div>

            <br />
            <RouterLink to="/user" class="btn btn-danger" type="button">
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
  name: "DetailUser",
  setup() {
    const data = reactive({
      id: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      profile: "",
      created_at: "",
      changed_at: "",
    });

    const route = useRoute();

    const userId = route.params.userId;

    onMounted(async () => {
      await fetch(`http://localhost:8080/user/${userId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((res) => {
          Object.assign(data, {
            id: res.id,
            username: res.username,
            email: res.email,
            password: res.password,
            phone: res.phone,
            profile: res.profile,
            created_at: res.created_at,
            changed_at: res.changed_at,
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
