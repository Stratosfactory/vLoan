<template>
 <div class="calView">
  <FullCalendar :options="calendarOptions" />
  <p>{{calendarOptions.events}}</p>
  </div>
</template>

<script>
import "@fullcalendar/core/vdom"; // solve problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        locale: "de",
        weekNumbers: true,
        initialView: "dayGridMonth",
        height: "80vh",
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        events: this.$store.getters.eventCalendarGetter,
        eventBackgroundColor:"crimson",
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
       filterInputs: {
        loanName: null,
        loanPurpose: null,
        loanStatus: null,
        loanStartDate: null,
        loanEndDate: null,
      },
  
    };
  },
  computed:{
    eventGetter(){
      return this.$store.getters.eventCalendarGetter
    }
  },
  methods:{
    getEvents(payload){
      this.$store.dispatch("getEvents",payload)
    }
  },
  mounted(){
    this.getEvents()
  }
};
</script>


<style scoped>
.calView{
  border: 1px solid black;
  background: var(--bg-s2);
  padding: 5px 5px;
  border-radius: 5px;
}
</style>