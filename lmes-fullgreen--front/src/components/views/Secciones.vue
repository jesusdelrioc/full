<template>
  <div>
    <div class="secciones">
      <div class="tiendas">
        <router-link class="titulo" :to="'/'">
          <h1>TIENDAS</h1>
        </router-link>
        <img height="15px" src="../../iconos/icon/chevron/right@3x.svg" alt />
        <h1 class="tienda">{{ $route.params.id1 }}. {{ $route.params.id}}</h1>
      </div>
      <h2>Selecciona tu sección</h2>
    </div>
    <div v-for="(item, i) in secciones" :key="i">
      <router-link :to="{name: 'acciones', params: { id2:item.id_section , id3:item.desc_section}} ">
        <div class="select">
        <h1>{{item.id_section}}<b> {{item.desc_section}} </b></h1>
        <img src="../../iconos/icon/chevron/right@3x.svg" alt="">
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      secciones:[]
    };
  },
  created() {
    axios.get(`http://deslmwselk101:3005/fullgreen/v1/sections`)
    .then(response => {
      this.secciones = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    getData(id) {
      let data = this.secciones;
      return data.filter(item => {
        return item.desc_store === id1;
        return item.cod_store === id;
        // return item.id_section === id2;
        // return item.desc_section === id3;
      });
    }
  }
};
</script>
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
.tiendas{
  display:flex;
    align-items: center;
}
.secciones{
  padding:16px;
  text-align: left;
  background: #F7F7F7;
  border-bottom: 1px solid #D8D8D8;
}
.secciones h2{
  margin-top: 16px;
  font-size: 28px;
  font-family: "Leroy Merlin Sans";
}
.titulo h1{
  font-size: 13px;
  color: #78BE20;
  margin: 0px 8px;
  font-family: "Leroy Merlin Sans SemiBold";
}
.tienda{
  font-size: 19px;
  font-family: "Leroy Merlin Sans Light";
  margin: 0px 8px;
}
.select{
  padding: 24px 16px;
  border-bottom: 1px solid #D8D8D8;
  display: flex;
}
.select h1{
  width: 100%!important;
  width: auto;
  font-size: 16px;
  text-align: left;
  color: #9B9B9B;
  font-family: "Leroy Merlin Sans";
}
b{
  color: #202020;
  font-weight:normal;
}
.select img{
  float: right;
}
</style>
