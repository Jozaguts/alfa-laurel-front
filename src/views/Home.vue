<template >
 <div  class="bg-alfa">


   <div class="buttons-container">
    <div class="d-flex flex-column flex-md-row flex-lg-row justify-lg-space-around justify-md-space-around">
      <v-btn
        dark
        to="/login"
      >
        Iniciar Sesion
      </v-btn>
      <v-btn
        dark
        to="/examen"
      >
        Examen
      </v-btn>
    </div>
   </div>

 </div>
</template>
<style scoped>
.buttons-container{
  position: absolute;
  width: 100vw;
  bottom: 1rem;
  left: 0;
}
  .bg-alfa {
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../assets/alfa-laurel.jpg");
    background-size: cover;
    width: 100vw;
    height: 100vh;
  }
</style>