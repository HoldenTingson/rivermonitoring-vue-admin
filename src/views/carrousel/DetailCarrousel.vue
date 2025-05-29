<template>
  <div class="container-fluid py-4">
    <h1 class="h3 mb-4" style="color: white">Detail Carrousel</h1>
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
              <div class="col-md-2">Description</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">
                {{ data.desc }}
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Image</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">
                <img
                  style="width: 50%"
                  :src="`http://localhost:5173/src/assets/carrousel/${data.image}`"
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
            <RouterLink to="/carrousel" class="btn btn-danger" type="button">
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
      desc: "",
      image: "",
      date: "",
    });

    const route = useRoute();

    const carrouselId = route.params.carrouselId;

    onMounted(async () => {
      await fetch(`http://localhost:8080/carrousel/${carrouselId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((res) => {
          Object.assign(data, {
            id: res.id,
            title: res.title,
            desc: res.desc,
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
