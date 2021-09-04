<template>
  <section>
    <div class="inputMenu eventCard" v-for="event in test" :key="event._id">
      <Timeline :value="event.workflowState" layout="horizontal">
        <template #content="slotProps">
          {{ slotProps.item.status}}
          <p>"Test"</p>
        </template>
        
      </Timeline>
      <p>{{event}}</p>
    </div>
    
  </section>
</template>

<script>
import axios from "axios";
import Timeline from "primevue/timeline";
export default {
  components: { Timeline },
  data() {
    return {
      events: null,
      test:[ { "workflowState": [ { "status": "Submitted", "owner": "test@test.de" },{ "status": "Approved", "owner": "test@test.de" },{ "status": "Rejected", "owner": "test@test.de" } ], "_id": "613273f311ffd947044c80b8", "objects": [ { "_id": "6132696eeb98870444593be1" }, { "_id": "61326996eb98870444593be3" }, { "_id": "61326a0eeb98870444593be8" } ], "loanPurpose": "Event", "loanName": "The Watch Loan Event", "contactPerson": "The Watch Guy", "contactEmail": "thewatchguy@gmail.com", "loanStartDate": "2021-09-01T00:00:00.000Z", "loanEndDate": "2021-09-07T00:00:00.000Z", "__v": 0 }, { "workflowState": [ { "status": "Submitted", "owner": "test@test.de" } ], "_id": "6132769d11ffd947044c80bf", "objects": [ { "_id": "613269adeb98870444593be4" }, { "_id": "613269deeb98870444593be7" }, { "_id": "61326a1feb98870444593be9" } ], "loanPurpose": "Photoshooting", "loanName": "Shoot that Loan Stuff", "contactPerson": "The Shooter", "contactEmail": "shooting@gmail.com", "loanStartDate": "2021-09-13T00:00:00.000Z", "loanEndDate": "2021-09-18T00:00:00.000Z", "__v": 0 }, { "workflowState": [ { "status": "Submitted", "owner": "test@test.de" } ], "_id": "613276d311ffd947044c80c6", "objects": [ { "_id": "613269adeb98870444593be4" }, { "_id": "613269deeb98870444593be7" }, { "_id": "61326a1feb98870444593be9" } ], "loanPurpose": "Event", "loanName": "Concourse of Elegance", "contactPerson": "W Smith", "contactEmail": "smith@smithandwesson.de", "loanStartDate": "2021-09-20T00:00:00.000Z", "loanEndDate": "2021-09-30T00:00:00.000Z", "__v": 0 }, { "workflowState": [ { "status": "Submitted", "owner": "test@test.de" } ], "_id": "6132771511ffd947044c80cd", "objects": [ { "_id": "613269adeb98870444593be4" }, { "_id": "613269deeb98870444593be7" }, { "_id": "61326a1feb98870444593be9" }, { "_id": "61326996eb98870444593be3" }, { "_id": "6132696eeb98870444593be1" }, { "_id": "61326982eb98870444593be2" }, { "_id": "613269d2eb98870444593be6" }, { "_id": "61326a0eeb98870444593be8" } ], "loanPurpose": "Testing", "loanName": "The Conosoir of Watches Testing", "contactPerson": "Fine Watch Maker", "contactEmail": "wmaker@smithandwesson.de", "loanStartDate": "2021-10-01T00:00:00.000Z", "loanEndDate": "2021-10-05T00:00:00.000Z", "__v": 0 } ]
      
    };
  },
  methods: {
    getEvents() {
      axios
        .get("http://localhost:3000/vloanapi/events/getevents")
        .then((res) => {
          this.events = res.data.events;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.add({
            severity: "error",
            summary: "Error while fetching events",
          });
        });
    },
  },
  mounted() {
    this.getEvents();
  },
};
</script>

<style scoped>
.eventCard {
  background: white;
}
</style>