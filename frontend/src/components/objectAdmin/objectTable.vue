<template>
  <div>
     
    <div class="responseDisplay"></div>
    <ConfirmDialog rejectClass="p-button-danger"></ConfirmDialog>
    <section>
      <DataTable :value="setObjects">
        <Column
          field="productFamily"
          header="Product Family"
          :sortable="true"
        ></Column>
        <Column field="model" header="Model" :sortable="true"></Column>
        <Column
          field="referenceNumber"
          header="Reference Number"
          :sortable="true"
        ></Column>
        <Column
          field="serialNumber"
          header="Serial Number"
          :sortable="true"
        ></Column>
        <Column field="material" header="Material" :sortable="true"></Column>
        <Column
          field="releaseDate"
          header="Release Date"
          :sortable="true"
        ></Column>
        <Column field="timeStamp" header="Added On" :sortable="true"> </Column>
        <Column field="email" header="Created By" :sortable="true"> </Column>
        <Column :exportable="false">
          <template #body="slotProps">
            <button @click="deleteEntry(slotProps)" class="deleteButton-inline">
              DELETE
            </button>
          </template>
        </Column>
      </DataTable>
    </section>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import axios from "axios";
export default {
  components: {
    DataTable,
    Column,
    ConfirmDialog,
  },
  data() {
    return {};
  },
  computed: {
    setObjects() {
      return this.$store.getters.objectGetter;
    },
  },
  methods: {
    deleteEntry(data) {
      console.log(data);
      this.$confirm.require({
        message: `Are you sure you want to delete object '${data.data.serialNumber}' ?`,
        header: "Please confirm",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "overlayDelete",
        accept: () => {
          axios
            .post("http://localhost:3000/vloanapi/objects/deleteobject", {
              _id: data.data._id,
            })
            .then(() => {
              this.getObjects();
            })
            .catch((err) => {
              console.log(err);
              this.$toast.add({
                severity: "error",
                summary: err.response.data.message,
              });
            });
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    },
  },
};
</script>

<style scoped>
.responseDisplay{
    margin-top:1vh;
}
</style>