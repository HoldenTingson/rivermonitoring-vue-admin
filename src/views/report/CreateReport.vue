<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Tambah Laporan</h6>
            <form>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Content</label
                >
                <input
                  class="form-control"
                  type="height"
                  value="..."
                  id="example-text-input"
                />
              </div>
              <div class="form-group">
                <label class="custom-file-label" for="customFileLang"
                  >Attachment</label
                >
                <input
                  type="file"
                  class="custom-file-input form-control"
                  id="customFileLang"
                  lang="en"
                  accept="image/*"
                />
              </div>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Name</label
                >
                <input
                  class="form-control"
                  type="name"
                  value="Nama"
                  id="example-text-input"
                />
              </div>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Email</label
                >
                <input
                  class="form-control"
                  type="email"
                  value="Email"
                  id="example-text-input"
                />
              </div>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Phone</label
                >
                <input
                  class="form-control"
                  type="phone"
                  value="Phone"
                  id="example-text-input"
                />
              </div>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >User ID</label
                >
                <input
                  class="form-control"
                  type="userid"
                  value="User ID"
                  id="example-text-input"
                />
              </div>
            </form>
            <RouterLink to="/report" class="btn btn-danger" type="button">
              <span class="btn-inner--icon"><i></i></span>
              <span class="btn-inner--text">Kembali</span>
            </RouterLink>
            <button
              class="btn btn-success"
              type="button"
              style="margin-left: 10px"
            >
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
