<template>
  <section class="cardScreen">
    <div
      :class="[task.clicked ? 'gridExpanded' : 'gridCollapsed', 'taskCard']"
      v-for="task in getEventTasks"
      :key="task._id"
    >
      <div class="taskName">
        <h2>{{ task.loanName }}</h2>
        <i
          class="pi pi-ellipsis-v expander"
          @click="viewEvent(task.loanName)"
        ></i>
      </div>
      <div class="statusBar">
        <div class="statusBarItem">
          <i class="pi pi-bookmark"></i>
          <p>{{ task.loanPurpose }}</p>
        </div>
        <div class="statusBarItem">
          <i class="pi pi-calendar"></i>
          <p>{{ task.loanStartDate }} - {{ task.loanEndDate }}</p>
        </div>
        <div class="statusBarItem">
          <i class="pi pi-tags"></i>
          <p>{{ task.objects.length }} Objekte</p>
        </div>
        <div class="statusBarItem">
          <i class="pi pi-id-card"></i>
          <p>{{ task.contactPerson }}</p>
        </div>

        <div class="statusBarItem">
          <i class="pi pi-flag"></i>
          <p>{{ task.activeWorkflow }}</p>
        </div>
      </div>
      <div class="expander">
        <i
          class="pi pi-arrow-right"
          @click="
            task.clicked ? (task.clicked = false) : (task.clicked = true);
            setObject(task._id);
          "
        ></i>
      </div>

      <div class="actionBar" v-if="task.clicked">
        <div class="actionBarItem">
          <h4>Process Workflow</h4>
          <form>
            <p>Workflow Actions</p>
            <div class="choice">
              <label>Reject</label>
              <input
                type="radio"
                id="reject"
                name="workflow"
                value="Rejected"
                v-model="choices[task._id]['workflow']"
              />
            </div>
            <div class="choice">
              <label>{{task.workflowOptions[0]}}</label>
              <input
                type="radio"
                id="proceed"
                name="workflow"
                :value="task.workflowOptions[1]"
                v-model="choices[task._id]['workflow']"
              />
            </div>
            <p>Comment</p>
            <textarea
              rows="10"
              cols="35"
              v-model="choices[task._id]['comment']"
            ></textarea>
            <p>Submit</p>
            <button class="button-main" @click.prevent="submit(task._id)">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  
  </section>
</template>

<script>
export default {
  data() {
    return {
      choices: {},
    };
  },
  computed: {
     getEventTasks() {
       return this.$store.getters.getEventTasks;
    },
  },
  methods: {
    viewEvent(loanName) {
      console.log(loanName);
      this.$router.push({
        name: "Lending Platform",
        params: { loanName },
      });
    },

    submit(id) {
      let payload = {
        id: id,
        workflow: this.choices[id].workflow,
        comment: this.choices[id].comment,
      };

      this.$store.dispatch("submitWorkflow",payload);
    },
    setObject(id) {
      this.choices[id] = {};
      console.log()
    },
  },
  created() {

    if(this.getEventTasks){
      for (let task of this.getEventTasks){
        task.clicked = false
      }
    }

    this.$store.dispatch("getEventTasks")
  
    
  },
};
</script>

<style scoped>
.cardScreen {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.taskCard {
  background: var(--bg-s3);
  margin: 10px 10px;
  padding: 10px 10px;
  border: 1px solid var(--bg-s1);
  border-radius: 5px;
}
.gridCollapsed {
  width: 40vw;
  display: grid;
  grid-template-columns: 90% 10%;
  grid-template-rows: minmax(min-content, max-content);
  grid-template-areas:
    "header header"
    "statusBar expanderIcon";
}

.gridExpanded {
  width: 90vw;
  display: grid;
  column-gap: 1%;
  grid-template-columns: 40% 10% 48%;
  grid-template-rows: minmax(min-content, max-content);
  grid-template-areas:
    "header header header"
    "statusBar expanderIcon actionBar";

  animation: ease-out 0.7s expand forwards;
}

@keyframes expand {
  from {
    width: 60%;
  }
  to {
    width: 100%;
  }
}

.taskName {
  text-align: left;
  border-bottom: var(--bg-s1) 1px solid;
  grid-area: header;
  display: flex;
  align-items: center;
}
.taskName i {
  border: 1px solid;
  background: var(--bg-s1);
  color: white;
  padding: 5px 5px;
  border-radius: 70%;
  cursor: pointer;
}

.statusBar {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  grid-area: statusBar;
}

.statusBarItem {
  background: var(--bg-s2);
  border-radius: 5px;
  border: var(--bg-s1) 1px solid;
  width: 45%;
  margin: 5px 5px;
  padding: 5px 5px;
  flex-wrap: wrap;
  overflow-wrap: break-word;
}

.statusBarItem i {
  font-size: 1.5rem;
  background: white;
  border-radius: 70%;
  padding: 5px 5px;
}
.expander {
  grid-area: expanderIcon;
  display: flex;
  align-items: center;
  margin-left: auto;
}

.expander i {
  color: var(--bg-s3);
  background: var(--bg-s1);
  padding: 10px 10px;
  border-radius: 70%;
  cursor: pointer;
}

.actionBar {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  grid-area: actionBar;
  grid-row: 2 / 4;
  margin: 5px 5px;
  height: auto;
}

.actionBarItem {
  background: var(--bg-s2);
  border-radius: 5px;
  border: var(--bg-s1) 1px solid;

  padding: 5px 5px;
  flex-wrap: wrap;
}

.actionBarItem p {
  background: var(--bg-s3);
  padding: 2px 2px;
  border-radius: 5px;
}

h4 {
  border-bottom: 1px solid black;
}



textarea {
  width: 100%;
  height: 100px;
}

.choice {
  text-align: left;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  margin-left: 5%;
  width: 45%;
}
.choice label {
  width: 90%;
}

.detailsTab {
  grid-area: detailsTab;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detailsTab i {
  color: var(--bg-s3);
  background: var(--bg-s1);
  padding: 5px 5px;
  border-radius: 5px;
}
</style>