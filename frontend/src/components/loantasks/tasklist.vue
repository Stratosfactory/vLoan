<template>
  <section class="cardScreen">
    <div class="taskCard" v-for="task in getEventTasks" :key="task._id">
      <h2 class="taskName">{{ task.loanName }}</h2>
      <div class="statusBar">
        <div class="statusBarItem">
          <i class="pi pi-bookmark"></i>
          <p>{{task.loanPurpose}}</p>
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
          <i class="pi pi-info-circle"></i>
          <p>{{ task.activeWorkflow }}</p>
        </div>
      </div>
      <div>
      <i class="pi pi-arrow-down expander"></i>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    getEventTasks() {
      return this.$store.getters.getEventTasks;
    },
  },
  mounted() {
    this.$store.dispatch("getEventTasks");
  },
};
</script>

<style scoped>
.cardScreen {
  display: flex;
  flex-wrap: wrap;
}

.taskCard {
  width: 32%;
  display: flex;
  flex-direction: column;
  background: var(--bg-s3);
  margin: 10px 10px;
  padding: 10px 10px;
  border: 1px solid var(--bg-s1);
  border-radius: 5px;
  align-content: center;
  justify-content: center;
}

.taskName {
  text-align: left;
  border-bottom: var(--bg-s1) 1px solid;
}

.statusBar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

}

.statusBarItem {
  background: var(--bg-s2);
  border-radius: 5px;
  border: var(--bg-s1) 1px solid;
  width: 200px;
  margin: 5px 5px;
  padding: 5px 5px;
  flex-wrap: wrap;
}

.statusBarItem i {
  font-size: 1.5rem;
  background: white;
  border-radius: 70%;
  padding: 5px 5px;
}
.expander {
  color:var(--bg-s3);
  background: var(--bg-s1);
  padding:10px 10px;
  border-radius: 70%;
  cursor: pointer;
}
</style>