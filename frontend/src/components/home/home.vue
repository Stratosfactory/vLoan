<template>
  <div class="home">
     <img src="..\..\assets\Vloan.svg">
     <p class="logoTitle">_vLoan</p>
     <footer>
       <img src="..\..\assets\cinderstries.svg">
       <p>by cinderstries</p>
     </footer>
     
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
img{
  width:50vh;
  height: 50vh;

}

.home{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 98vh;
  
  
}



.logoTitle{
  font-family: 'Chakra Petch', sans-serif;
  font-size: 6rem;
}

footer{
  opacity: 0.5;
}

footer img{
  height: 100px;
}

</style>