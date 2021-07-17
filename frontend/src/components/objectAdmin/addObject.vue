<template>
     <section>
       <div class="addNew">
      <button class="button-main" @click="displayMenu">Add New</button>
      </div>
      <div class="inputMenu" v-if="menuDisplayed">
        <div class="menuitem">
          <label> Product Family
          </label>
          <select>
            <option></option>
          </select>
        </div>
        <div class="menuitem">
          <label>Model
          </label>
          <select>
            <option></option>
          </select>
        </div>
        <div class="menuitem">
          <label> Reference Number
          </label>
          <input>
        </div>
        <div class="menuitem">
          <label> Serial Number
          </label>
          <input>
        </div>
        <div class="menuitem">
          <label>Material
          </label>
          <select>
            <option></option>
          </select>
        </div>
      <div class="menuitem">
          <label> Release Date
          </label>
          <input>
        </div>
        <div class="menuitem">
          <label> Added On
          </label>
          <input disabled :placeholder="new Date()">
        </div>
      </div>
    </section>
</template>

<script>
export default {
data(){
  return{
    menuDisplayed:false,
  }
},
methods:{
  displayMenu(){
    this.menuDisplayed? this.menuDisplayed=false : this.menuDisplayed=true;
  }
}


}
</script>

<style scoped>
.addNew{
  display: flex;
  padding:5px 5px 20px 5px;
}

.inputMenu{
  display:flex;
  flex-wrap: wrap;
  border: 1px solid var(--bg-s1);
  padding: 10px 10px 10px 10px;
  border-radius: 3px;
 box-shadow: 2px 5px 16px 2px var(--bg-s1);
 margin: 20px 0 20px 0;
 
  
}
.menuitem{
  display: flex;
  flex-direction: column;
  width: 42%;
  margin-right:6vw;
  padding:10px 10px 10px 10px
  
}

.menuitem label{
  align-self: flex-start;
}

@media only screen and (max-width: 700px) {
  .menuitem{
    width: 100%;
  }
}
</style>