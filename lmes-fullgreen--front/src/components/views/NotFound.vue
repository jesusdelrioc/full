<template>
      <div class="not-found">
        <div class="md-display-4 not-found-logo">
          <div><img src="../../assets/LogoData.png"></div>
        </div>
        <h1 class="md-display-4">404</h1>
        <h1>No se ha encontrado la página: fullgreen{{$route.path}}</h1>
        <div class="not-found">
          <img src="../../assets/LMLogo.png">
          <img src="../../assets/LogoAdeo.png">
        </div>
      </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found-logo{
  display: inline-flex;
}
.not-found-logo img{
  height: 25vh;
}
.not-found-logo div img{
  height: 10vh;
}
.not-found{
  padding: 5%;
  overflow-wrap: break-word;
  color: gray;
}
</style>
<style>
.not-found{
  text-align: center;
}
</style>
