<template>
  <div class="container-fluid py-4">
    <h1 class="h3 mb-4" style="color: white">Detail News</h1>
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
              <div class="col-md-9">{{ data.title }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Description</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">
                {{ data.description }}
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Content</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">
                {{ data.content }}
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Image</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">
                <img
                  style="width: 50%"
                  :src="`http://localhost:5173/src/assets/news/${data.image}`"
                />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Category</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.category }}</div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-2">Created At</div>
              <div class="col-md-1">:</div>
              <div class="col-md-9">{{ data.created_at }}</div>
            </div>
            <br />
            <RouterLink to="/news" class="btn btn-danger" type="button">
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
  name: "DetailNews",
  setup() {
    const data = reactive({
      id: "",
      title: "",
      content: "",
      description: "",
      image: "",
      category: "",
      created_at: "",
    });

    const route = useRoute();

    const newsId = route.params.newsId;

    onMounted(async () => {
      await fetch(`http://localhost:8080/news/${newsId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((res) => {
          Object.assign(data, {
            id: res.id,
            title: res.title,
            content: res.content,
            description: res.description,
            image: res.image,
            category: res.category,
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
