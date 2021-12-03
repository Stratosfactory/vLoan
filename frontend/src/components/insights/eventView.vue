<template>
 <div class="calView">
  <FullCalendar :options="calendarOptions" />
  
  <event-panel :title="eventObject.title" :loanType="eventObject.type" @togglePanel="togglePanel" v-if="panelVisible"></event-panel>
  </div>
</template>

<script>
import "@fullcalendar/core/vdom"; // solve problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import eventPanel from "./eventPanel.vue"

export default {
  components: {
    FullCalendar,eventPanel
  },
  data() {
    return {
      panelVisible:false,
      eventObject:{
        title:null,
        type:null,
        
      },
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
        selectable: false,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        events: null,
       
        
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
  
  methods:{
    async getEvents(payload){
       await this.$store.dispatch("getEvents",payload)
    },
    async setEvents(payload){
        this.getEvents(payload)
        .then(()=>{
          let eventArr = this.$store.getters.eventCalendarGetter
          for(let event of eventArr){
            event["color"] ="crimson" 
          }
          this.calendarOptions.events = eventArr
        })
    },
    handleEventClick(info){
     this.eventObject.title = info.event.title
     this.eventObject.type = info.event
     this.togglePanel(true)
     
    },
    togglePanel(bool){
      this.panelVisible = bool
    }
  },
  async mounted (){
    this.setEvents()
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