<template>
  <section>
    <div class="eventCard" v-for="event in updateEvents" :key="event._id">
      <header class="cardHeader">
        <h3>{{ event.loanName }} -</h3>
       
        <h4>From: {{ event.loanStartDate }}</h4>
        <h4>To: {{ event.loanEndDate }} -</h4>
        <h4 :class="event.activeWorkflow" class="statusDisplay">
          Status:
          {{ event.workflowState[event.workflowState.length - 1].status }}
        </h4>
        <div class="details-button">
        <button class="button-main" style="background: crimson" v-if="event.activeWorkflow==='Rejected'">
          Delete
        </button>
        <button class="button-main details-button" @click="showDetails(event)">
          Show Details
        </button>
        </div>
      </header>
      <div v-if="event.clicked">
        <div class="eventCardInfo">
          <div class="cardItem">
            <h3>Loan Basics</h3>
            <p>
              Loan Purpose: <span> {{ event.loanPurpose }}</span>
            </p>
          </div>
          <div class="cardItem">
            <h3>Contact</h3>
            <p>
              Contact Person: <span> {{ event.contactPerson }}</span>
            </p>
            <p>
              Contact Person Email: <span>{{ event.contactEmail }}</span>
            </p>
          </div>

          <div class="cardItem cardLoanObjects">
            <h3>
              Attached Loan Objects <span> {{ event.objects.length }} </span>
            </h3>
            <div class="loanobjectDetails">
              <div
                v-for="object in event.objectsArray"
                :key="object._id"
                class="picker-item"
              >
                <p><span>Product Family:</span>{{ object.productFamily }}</p>
                <p><span>Model:</span>{{ object.model }}</p>
                <p><span>Reference:</span> {{ object.referenceNumber }}</p>
                <p><span>Serial No:</span> {{ object.serialNumber }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="timeline">
          <h3>Approval Status</h3>
          <Timeline
            :value="event.workflowState"
            layout="horizontal"
            class="timelineScale"
          >
            <template #content="slotProps">
              <div class="timelineSlot">
                <p :class="slotProps.item.status">
                  <i class="pi pi-flag"></i>{{ slotProps.item.status }}
                </p>
                <p><i class="pi pi-user"></i>{{ slotProps.item.owner }}</p>
                <p><i class="pi pi-comment"></i>{{ slotProps.item.comment }}</p>
              </div>
            </template>
          </Timeline>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script>
// import axios from "axios";
import Timeline from "primevue/timeline";
export default {
  components: { Timeline },
  data() {
    return {
      events: null,
    };
  },
  computed: {
    updateEvents() {
      return this.$store.getters.eventGetter;
    },
  },

  methods: {
    showDetails(callback) {
      let getIds = callback.objects.map((item) => item._id);
      const payload = {
        eventId: callback._id,
        objectId: getIds,
      };
    
      if (callback.objectsArray.length <= 0) {
        this.$store.dispatch("getEventObjects", payload);
      }

      if (callback.clicked) {
        callback.clicked = false;
      } else {
        callback.clicked = true;
      }
    },
  },
  mounted() {
    this.updateEvents;
  },
};
</script>

<style>
.p-timeline {
  align-items: flex-start;
}
</style>

<style scoped>
.timeline {
  padding: 5px 10px;
  background: var(--bg-s2);
  border-radius: 5px;
  margin: 0 10px !important;
  text-align: left;
}

.timelineSlot {
  min-height: 15vh;
  max-height: 25vh;
}

.timeline p {
  background: var(--bg-s3);
  width: 10vw;
  border-radius: 5px;
  padding: 5px 5px;
  margin-top: 0;
  word-wrap: break-word;
}

.timeline p i {
  margin-right: 5px;
}

.eventCardInfo {
  display: flex;
  flex-wrap: wrap;
}

.cardItem {
  text-align: left;
  background: var(--bg-s2);
  padding: 5px 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: calc(50% - 10px);
}

.cardLoanObjects {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.cardItem span {
  background: var(--bg-s3);
  width: 10vw;
  border-radius: 5px;
  padding: 2px 10px;
}
.cardHeader h3 {
  font-size: 1.7rem;
  margin-left: 10px;
}

.cardHeader h4 {
  font-size: 1.4rem;
  margin-left: 10px;
}

.cardHeader {
  border-bottom: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
.details-button {
  
  align-self: center;
  margin-left: auto;

}

.details-button button{
  margin-right:20px;
}

.statusDisplay {
  border-radius: 6px;
  border: black 1px solid;
  padding: 0px 4px;
}

.picker-item {
  display: flex;
  padding: 0 0.5rem;

  border-radius: 4px;
  background: var(--bg-s3);
  width: calc(50% - 10px);
  flex-wrap: wrap;
}

.picker-item p {
  width: 50%;
}

.picker-item span {
  font-weight: bold;
}

.loanobjectDetails {
  display: flex;
  flex-wrap: wrap;
}

.Submitted {
  background: var(--bg-s2) !important;
}

.Rejected {
  background: var(--ac-bad) !important;
}

.Approved {
  background: var(--ac-good) !important;
}

.Reviewed {
  background: rgb(34, 240, 205) !important;
}
</style>