<template>
  <div>
    <header>My Objects</header>

    <add-object></add-object>
    <ConfirmDialog rejectClass="p-button-danger"></ConfirmDialog>
    <section>
      <DataTable :value="dummy">
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
import addObject from "./addObject.vue"
export default {
  components: {
    DataTable,
    Column,
    ConfirmDialog,
    addObject,
  },
  data() {
    return {
      dummy: [
        {
          productFamily: "Familiy A",
          model: "Model X",
          referenceNumber: "123.456",
          serialNumber: "123456",
          material: "Gold",
          releaseDate: "2021",
          timeStamp: new Date(),
        },
        {
          productFamily: "Familiy B",
          model: "Model Y",
          referenceNumber: "123.456",
          serialNumber: "123456",
          material: "Gold",
          releaseDate: "2021",
          timeStamp: new Date(),
        },

        {
          productFamily: "Familiy C",
          model: "Model Z",
          referenceNumber: "123.456",
          serialNumber: "123456",
          material: "Gold",
          releaseDate: "2021",
          timeStamp: new Date(),
        },
      ],
    };
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
          //callback to execute when user confirms the action
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


</style>