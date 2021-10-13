<template>
  <section>
    <div class="addNew">
      <button class="button-main" @click="displayMenu()">Schedule Loan</button>
    </div>
    <div class="inputMenu" v-if="menuClicked">
      <div class="menuitem">
        <label>Loan Purpose</label>
        <select v-model="inputValues.loanPurpose">
          <option>Event</option>
          <option>Photoshooting</option>
          <option>Testing</option>
        </select>
      </div>
      <div class="menuitem">
        <label>Loan Name (e.g. Event name)</label>
        <input v-model="inputValues.loanName" />
      </div>
      <div class="menuitem">
        <label>Contact Persons name</label>
        <input v-model="inputValues.contactPerson" />
      </div>
      <div class="menuitem">
        <label>Contact Persons email</label>
        <input v-model="inputValues.contactEmail" />
      </div>

      <div class="menuitem">
        <label>Loan Start Date</label>
        <input type="date" v-model="inputValues.loanStart" />
      </div>

      <div class="menuitem">
        <label>Loan End Date</label>
        <input type="date" v-model="inputValues.loanEnd" />
      </div>

      <div class="menuitem picker-outter">
        <label>Select Objects</label>
        <div class="picker">
          <PickList v-model="pickerData" dataKey="_id">
            <template #item="slotProps">
              <div class="picker-item">
                <p><span>Family:</span> {{ slotProps.item.productFamily }}</p>
                <p>
                  <span>Reference:</span>{{ slotProps.item.referenceNumber }}
                </p>
                <p><span>Serial No:</span> {{ slotProps.item.serialNumber }}</p>
                <p><span>Name:</span> {{ slotProps.item.model }}</p>
              </div>
            </template>
          </PickList>
        </div>
      </div>
      <div class="menuitem menubutton">
        <button class="button-secondary" @click="submitObject()">Submit</button>
      </div>
    
    </div>
  </section>
</template>

<script>
import PickList from "primevue/picklist";


export default {
  components: {
    PickList,
  },
  data() {
    return {
      pickerData: ["", []],
      menuClicked: false,
      inputValues: {
        loanPurpose: null,
        loanName: null,
        contactPerson: null,
        contactEmail: null,
        loanStart: null,
        loanEnd: null,
      },
    };
  },
 
  
  methods: {
    getObjects() {
      this.$store.dispatch("getObjects");
      this.pickerData[0] = this.$store.getters.objectGetter
    },
    displayMenu() {
      if (this.menuClicked) {
        this.menuClicked = false;
      } else {
        this.menuClicked = true;
      }
    },
    submitObject() {
      const payload = {
          loanPurpose: this.inputValues.loanPurpose,
          loanName: this.inputValues.loanName,
          contactPerson: this.inputValues.contactPerson,
          contactEmail: this.inputValues.contactEmail,
          loanStart: this.inputValues.loanStart,
          loanEnd: this.inputValues.loanEnd,
          objects: this.pickerData[1],
        }

      this.$store.dispatch("createEvent",payload)
    },
  },
  mounted() {
    this.getObjects();
  },
};
</script>

<style scoped>
.picker-outter {
  width: 200%;
}
.picker {
  width: 100%;
  margin: auto;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px 4px 4px 4px;
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