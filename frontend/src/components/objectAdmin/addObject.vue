<template>
  <section>
    <div class="addNew">
      <button class="button-main" @click="displayMenu">Add New</button>
    </div>
    <div class="inputMenu" v-show="menuClicked">
      <div class="menuitem">
        <label> Product Family </label>
        <select v-model="inputValues['Product Family']">
          <option v-for="value in dropdownValues" :key="value.index">
            {{ value.family }}
          </option>
        </select>
      </div>
      <div class="menuitem">
        <label>Model </label>
        <select v-model="inputValues['Model']">
          <option v-for="models in filterModel[0].models" :key="models.index">
            {{ models }}
          </option>
        </select>
      </div>
      <div class="menuitem">
        <label> Reference Number </label>
        <input v-model="inputValues['Reference Number']" />
      </div>
      <div class="menuitem">
        <label> Serial Number </label>
        <input v-model="inputValues['Serial Number']" />
      </div>
      <div class="menuitem">
        <label>Material </label>
        <select v-model="inputValues['Material']">
          <option>Gold</option>
          <option>Silver</option>
          <option>Iron</option>
        </select>
      </div>
      <div class="menuitem">
        <label> Release Date </label>
        <input v-model="inputValues['Release Date']" />
      </div>
      <div class="menuitem">
        <label> Added On </label>
        <input disabled :value="new Date().toLocaleDateString()" />
      </div>
      <div class="menuitem menubutton">
        <button class="button-secondary" @click="submitObject()">Submit</button>
      </div>
     
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dropdownValues: [
        {
          family: "Family A",
          models: ["Model A.001", "Model A.002", "Model A.003"],
        },
        {
          family: "Family B",
          models: ["Model B.001", "Model B.002", "Model B.003"],
        },
        {
          family: "Family C",
          models: ["Model C.001", "Model C.002", "Model C.003"],
        },
      ],
      inputValues: {
        "Product Family": null,
        Model: null,
        "Reference Number": null,
        "Serial Number": null,
        Material: null,
        "Release Date": null,
        "Added On": new Date(),
      },
      menuClicked: false,
    };
  },
  methods: {
    displayMenu() {
      if (this.menuClicked) {
        this.menuClicked = false;
      } else {
        this.menuClicked = true;
      }
    },
    submitObject() {
      axios
        .put("http://localhost:3000/vloanapi/objects/addobject", {
          email: "test@test.com",
          productFamily: this.inputValues["Product Family"],
          model: this.inputValues["Model"],
          referenceNumber: this.inputValues["Reference Number"],
          releaseDate: this.inputValues["Release Date"],
          serialNumber: this.inputValues["Serial Number"],
          material: this.inputValues["Material"],
        })
        .then((res)=>{
          this.$toast.add({ severity: "success", summary: res.data.message });
          this.$emit("objectAdded")
        })
        .catch((err) => {
          console.log(err);
          this.$toast.add({ severity: "error", summary: err.response.data.message });
        });
    },
  },
  computed: {
    filterModel() {
      let input = this.inputValues["Product Family"];
      let arr = this.dropdownValues;
      let filteredArr = arr.filter((object) => {
        return object.family === input;
      });

      filteredArr.length === 0 ? (filteredArr = "-") : "";
      return filteredArr;
    },
  },
};
</script>

<style scoped>


</style>

