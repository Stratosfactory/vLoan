<template>
  <div>
    <header>My Objects</header>
    <main>
      <DataTable :value="dummy">
        <Column field="productFamily" header="Product Family" :sortable="true"></Column>
        <Column field="model" header="Model" :sortable="true"></Column>
        <Column field="referenceNumber" header="Reference Number" :sortable="true"></Column>
        <Column field="serialNumber" header="Serial Number" :sortable="true"></Column>
        <Column field="material" header="Material" :sortable="true"></Column>
        <Column field="releaseDate" header="Release Date" :sortable="true"></Column>
        <Column field="timeStamp" header="Added On" :sortable="true"> </Column>
        
      </DataTable>
    </main>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  components: {
    DataTable,
    Column,
  },
  data(){
    return{
      dummy:[
        {productFamily:"Familiy A",
        model:"Model X",
        referenceNumber:"123.456",
        serialNumber:"123456",
        material:"Gold",
        releaseDate:"2021",
        timeStamp:new Date(),
        

        
        },
         {productFamily:"Familiy B",
        model:"Model Y",
        referenceNumber:"123.456",
        serialNumber:"123456",
        material:"Gold",
        releaseDate:"2021",
        timeStamp:new Date(),
        

        
        },

         {productFamily:"Familiy C",
        model:"Model Z",
        referenceNumber:"123.456",
        serialNumber:"123456",
        material:"Gold",
        releaseDate:"2021",
        timeStamp:new Date(),
        

        
        }

      ]
    }
  }
};
</script>

<style>
</style>