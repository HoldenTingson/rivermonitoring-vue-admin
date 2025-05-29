<template>
  <div class="container-fluid py-4">
    <h1 class="h3 mb-4" style="color: white">Detail Galeri</h1>
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
              <div class="col-md-9">
                {{ data.title }}
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Image</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">
                <img
                  style="width: 50%"
                  :src="`http://localhost:5173/src/assets/gallery/${data.image}`"
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Date</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.date }}</div>
            </div>
            <br />
            <RouterLink to="/gallery" class="btn btn-danger" type="button">
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
  name: "DetailGallery",
  setup() {
    const data = reactive({
      id: "",
      title: "",
      image: "",
      date: "",
    });

    const route = useRoute();

    const galleryId = route.params.galleryId;

    onMounted(async () => {
      await fetch(`http://localhost:8080/gallery/${galleryId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((res) => {
          Object.assign(data, {
            id: res.id,
            title: res.title,
            image: res.image,
            date: res.date,
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
