<template>
  <div>
    <div class="selecciona">
      <h1>Selecciona tu tienda</h1>
      <div class="input">
      <input type="text" v-model="searchUp" placeholder="Buscar"/>
      </div>
    </div>
    <div  v-for="(item, i) in filteredTiendas" :key="i">
      <router-link :to="{name: 'secciones', params: { id: item.desc_store, id1: item.id_store  }}">
        <div class="tiendas">
        <h1>{{ item.id_store}} <b>{{ item.desc_store}}</b></h1>
        <img src="../../iconos/icon/chevron/right@3x.svg" alt="">
        </div>
        </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Tiendas",
  data() {
    return {
      search: "",
      items: [],
    };
  },
  created() {
    axios.get(`http://deslmwselk101:3005/fullgreen/v1/stores`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.items = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  computed: {
    filteredTiendas: function() {
      return Object.values(
        this.items.reduce(
          (prev, next) => Object.assign(prev, { [next.desc_store]: next }),
          {}
        )
      ).filter(item => {
        return (
          item.desc_store.match(this.search)
        );
      });
    },
    searchUp: {
      get() {
        return this.search;
      },
      set(search) {
        this.search = search.toUpperCase();
      }
    }
  },
  methods: {
    getData(id) {
      let data = this.items;
      return data.filter(item => {
        return item.desc_store === id;
        return item.id_store === id1;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.selecciona{
  padding:15px 16px 22px;
  text-align: left;
  background: #F7F7F7;
  border-bottom: 1px solid #D8D8D8;
}
.selecciona h1 {
  height: 40px;
  color: #202020;
  font-family: "Leroy Merlin Sans";
  font-size: 28px;
}
input{
  height: 33px;
  width: 100%;
  outline: 0;
  border-width: 0 0 1px;
  background: #F7F7F7;
  border-color: #D8D8D8;
  font-family: "Leroy Merlin Sans"
}
input:hover{
  border-color: #78BE20;
}
.tiendas{
  padding: 24px 16px;
  border-bottom: 1px solid #D8D8D8;
  display: flex;
  font-family: "Leroy Merlin Sans Regular";
}
.tiendas h1{
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
.tiendas img{
  float: right;
}
</style>
