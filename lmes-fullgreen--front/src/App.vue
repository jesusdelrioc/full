<template>
  <div id="app">
    <div>
  <b-nav>
    <b-nav-item><img width="70%" src="./iconos/logos/horizontal@3x.svg" alt=""></b-nav-item>
  </b-nav>
</div>
 <keep-alive>
      <router-view v-if="$route.meta.isBack"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.isBack"></router-view>
    
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* global styles to apply, you can get recomended styles at https://cosmos.leroymerlin.es/materia/ */
.md-toolbar {
  background: -webkit-linear-gradient(100deg, #5c9e4c, #78be20, #abdc9f);
}
.md-button.primary{
  background-color: #78be20 !important;
  color: white !important;
}
button:focus {
  outline:none!important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.md-tooltip{
  border-radius: 6px!important;
  background-color: #00000099!important;
  z-index: 999999!important;
  transition: .25s cubic-bezier(0,0,.2,1)!important;
  font-size: .8rem!important;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.md-tooltip::after {
  content: "";
  position: absolute;
  border-width: 6px;
  border-style: solid;
}
.md-tooltip-top::after {
  margin-left: -6px;
  top: 100%;
  left: 50%;
  border-color: #00000099 transparent transparent transparent;
}
.md-tooltip-bottom::after {
  margin-left: -6px;
  bottom: 100%;
  left: 50%;
  border-color: transparent transparent #00000099 transparent;
}
.md-tooltip-left::after {
  margin-top: -6px;
  top: 50%;
  left: 100%;
  border-color: transparent transparent transparent #00000099;
}
.md-tooltip-right::after {
  margin-top: -6px;
  top: 50%;
  right: 100%;
  border-color: transparent #00000099 transparent transparent;
}
.nav-item{
  margin: 12px auto;
}
.nav-item img{
  height: 32px;
  width: 148px;
}
.nav{
  border-bottom: 1px solid #D8D8D8;
}
</style>