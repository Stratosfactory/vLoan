<template>
  <section>
    <div class="addNew">
      <button class="button-main">Schedule Loan</button>
    </div>
    <div class="inputMenu">
      <div class="menuitem">
        <label>Event Purpose</label>
        <select>
          <option>Event</option>
          <option>Photoshooting</option>
          <option>Testing</option>
        </select>
      </div>
      <div class="menuitem">
        <label>Loan Name (e.g. Event name)</label>
        <input />
      </div>
      <div class="menuitem">
        <label>Contact Persons name</label>
        <input />
      </div>
      <div class="menuitem">
        <label>Contact Persons email</label>
        <input />
      </div>

      <div class="menuitem">
        <label>Loan Start Date</label>
        <input type="date" />
      </div>

      <div class="menuitem">
        <label>Loan End Date</label>
        <input type="date" />
      </div>
      <div class="menuitem picker">
        <PickList v-model="pickerData" dataKey="_id">
          <template #item="slotProps">
            <div class="picker-item">
              <p><span>Family:</span> {{ slotProps.item.productFamily }}</p>
              <p><span>Reference:</span>{{ slotProps.item.referenceNumber }}</p>
              <p><span>Serial No:</span> {{ slotProps.item.serialNumber }}</p>
              <p><span>Name:</span> {{ slotProps.item.model }}</p>
            </div>
          </template>
        </PickList>
      </div>
    </div>
  </section>
</template>

<script>
import PickList from "primevue/picklist";

import axios from "axios";
export default {
  components: {
    PickList,
  },
  data() {
    return {
      pickerData: [[], []],
    };
  },
  methods: {
    getObjects() {
      axios
        .get("http://localhost:3000/vloanapi/objects/getobject")
        .then((res) => {
          this.pickerData[0] = res.data.objects;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.add({
            severity: "error",
            summary: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getObjects();
  },
};
</script>

<style scoped>
.picker {
  width: 80%;
  margin: auto;
}

.picker-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid black;
  border-radius: 4px;
  background: var(--bg-s2);
}

.picker-item p {
  margin: 0 1% 0 1%;
  width: 47%;
  text-align: left;
}

.picker-item p span {
  font-weight: bold;
}
</style>