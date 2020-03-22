<template>
  <div class="todo">
    <!-- <pre>{{$data}}</pre> -->
    <div class="secciones">
      <div class="acciones">
        <a class="titulo" href="javascript:history.go(-1)">
          <h1>{{ $route.params.id1 }} {{ $route.params.id }}</h1>
        </a>
        <img height="15px" src="../../iconos/icon/chevron/right@3x.svg" alt />
        <h1 class="accion">{{ $route.params.id2 }}. {{ $route.params.id3 }}</h1>
      </div>
      <h2>ACCIONES</h2>
    </div>
    <div>
      <div id="myNav" class="overlay">
        <div class="extension">
          <img class="closebtn" @click="closeNav" src="../../iconos/icon/close@3x.svg" alt />
          <h1>Realiza las acciones propuestas para el TOP 10 referencias con mayor potencial.</h1>
          <div class="cargo">
            <h2>Acciones Vendedor</h2>
          </div>
          <div class="cargo">
            <h2>Acciones Jefe de sector</h2>
          </div>
        </div>

        <div v-for="(item, i) in items" :key="i" class="overlay-content">
          <div class="desacciones" v-if="$route.params.id === item.desc_store && $route.params.id2 == item.cod_section">
            <div class="referencia">
              <h2>REF: {{item.cod_reference}}</h2>
              <p>/ GAMA {{item.cod_range}}</p>
            </div>
            <h2>{{item.desc_reference}}</h2>
            <span class="potencial">
              <p>Potencial a la media:</p>
              <b>{{item.num_potential_global}} €</b>
            </span>
          </div>
        </div>
        <div class="salir">
        <img @click="closeNav" src="../../iconos/icon/close@3x.svg" alt />
        <p>Salir</p>
        </div>
      </div>
      <b-card tag="article" style="margin:0 auto; max-width: 20rem;" class="mb-2">
        <b-card-text v-for="(item, i) in filteredTiendas" :key="i" @click="openNav">
          <div v-if="$route.params.id2 === item.cod_section || $route.params.id === item.desc_store" class="tarjeta">
            <h2>{{item.desc_store}}</h2>
            <h2>{{item.desc_reference}}</h2>
            <h2>{{item.cod_section}}</h2>
            <h3>SUMATORIO DE POTENCIALES</h3>
            <div class="caja">
              <b-container class="bv-example-row">
                <b-row>
                  <b-col>
                    <p class="media">A la media</p>
                    <p class="number">{{item.num_potential_global}}</p>
                  </b-col>
                  <!-- <b-col>
                    <p class="media">Al líder</p>
                    <p class="number">{{item.num_potential_global}}</p>
                  </b-col>-->
                </b-row>
              </b-container>
            </div>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    axios
      .get(`http://deslmwselk101:3005/fullgreen/v1/potential`)
      .then(response => {
        this.items = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  computed: {
    filteredTiendas: function() {
      const formattedData = this.items.reduce(
        (previousValue, { desc_store, num_potential_global }) => {
          if (!previousValue[desc_store]) {
            previousValue[desc_store] = {
              desc_store,
              num_potential_global,
              totalQuantity: 0
            };
          }
          (previousValue[desc_store].totalQuantity += +num_potential_global),
            desc_store;
          return previousValue;
        },
        {}
      );
      console.log(Object.values(formattedData));
      return (
        Object.values(formattedData)
          .filter(item => {
            return item.desc_store.match(this.search);
          })
      );
    },
    totalRevenue: function() {
      return items.num_potential_global.reduce((obj, year) => {
        obj[year.year] = year.values.reduce((total, month) => {
          return total + parseInt(month.revenue);
        }, 0);
        return obj;
      }, {});
      console.log("holaa");
    }
  },
  methods: {
    openNav: function() {
      document.getElementById("myNav").style.width = "100%";
    },
    closeNav: function() {
      document.getElementById("myNav").style.width = "0%";
    },
    getData(id) {
      let data = this.items;
      return data.filter(item => {
        return item.desc_store === id;
        return item.cod_store === id1;
        return item.id_section === id2;
        return item.desc_section === id3;
      });
    }
  }
};
</script>
<style scoped>
.todo {
  background: #f7f7f7;
}
.secciones {
  padding: 16px;
  text-align: left;
  background: #f7f7f7;
}
.titulo h1 {
  font-size: 13px;
  color: #78be20;
  margin: 0px 8px;
  font-family: "Leroy Merlin Sans SemiBold";
}
.acciones {
  display: flex;
  align-items: center;
}
.accion {
  font-size: 19px;
  font-family: "Leroy Merlin Sans Light";
  margin: 0px 8px;
}
.secciones h2 {
  margin-top: 16px;
  font-size: 28px;
  font-family: "Leroy Merlin Sans";
}
.card {
  border: none;
  box-shadow: rgba(205, 205, 205, 0.5) -1px 0px 4px 0px;
  margin: 16px !important;
  max-width: 100% !important;
}
.tarjeta h2 {
  font-size: 16px;
  text-align: left;
  font-family: "Leroy Merlin Sans";
}
.tarjeta h3 {
  font-family: "Leroy Merlin Sans SemiBold";
  text-align: left;
  font-size: 13px;
  margin-top: 16px;
  color: #9b9b9b;
}
.tarjeta p {
  font-family: "Leroy Merlin Sans SemiBold";
  text-align: left;
  font-size: 13px;
  color: #9b9b9b;
}
.caja {
  background: #f7f7f7;
}
.caja p {
  color: #202020;
  margin: 0px;
}
.caja .media {
  font-size: 13px;
  font-family: "Leroy Merlin Sans";
}
.caja .number {
  font-size: 22px;
  font-family: "Leroy Merlin Sans";
}
.col {
  margin: 9px 0px;
}

body {
  font-family: "Lato", sans-serif;
}

.overlay {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
}

.overlay-content {
  position: relative;
  width: 100%;
  text-align: center;
}

.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #818181;
  display: block;
}

.overlay a:hover,
.overlay a:focus {
  color: black;
}

.overlay .closebtn {
  position: absolute;
  top: 16px;
  right: 16px;
}
.extension {
  padding: 16px 16px 32px;
  text-align: left;
  border-bottom: 1px solid #d8d8d8;
}
.extension h1 {
  font-family: "Leroy Merlin Sans SemiBold";
  font-size: 19px;
  margin: 44px 0px 16px;
  line-height: 28px;
}
.cargo {
  background: #f7f7f7;
  margin: 8px 0;
}
.cargo h2 {
  font-size: 13px;
  font-family: "Leroy Merlin Sans SemiBold";
  color: #78be20;
  padding: 8px;
}
.desacciones {
  border-bottom: 1px solid #d8d8d8;
  margin: 16px;
}
.desacciones h2 {
  font-family: "Leroy Merlin Sans", Regular;
  font-size: 16px;
  color: #202020;
  text-align: left;
}
.desacciones p {
  font-family: "Leroy Merlin Sans Light";
  color: #202020;
  font-size: 16px;
  text-align: left;
}
.referencia {
  display: flex;
  margin: 24px 0px 0px;
}
.referencia h2 {
  font-size: 16px;
  font-family: "Leroy Merlin Sans SemiBold";
  color: #202020;
}
.referencia p {
  font-size: 13px;
  font-family: "Leroy Merlin Sans", Regular;
  color: #9b9b9b;
}
.potencial {
  margin: 16px 0px 24px;
  display: flex;
}
.potencial p {
  font-family: "Leroy Merlin Sans Light";
  color: #202020;
  font-size: 16px;
  text-align: left;
}
.potencial::before,
.media:before {
  content: "";
  border-color: transparent #78be20;
  border-style: solid;
  border-width: 0.35em 0 0.35em 0.45em;
  display: block;
  height: 0px;
  margin: 7px 4px;
}
.potencial b {
  color: #202020;
  font-family: "Leroy Merlin Sans SemiBold";
}
.salir{
  margin: 31px auto;
  text-align: center;
}
.salir img{
  width: 20px;
}
.salir p{
  font-size: 13px;
  font-family: 'Leroy Merlin Sans SemiBold';
  color: #78BE20;
}
@media screen and (max-height: 450px) {
  .overlay a {
    font-size: 20px;
  }
  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
}
</style>
