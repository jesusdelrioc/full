<template>
  <div class="container-fluid loginForm">
    <div class="login-box">
      <div class="body">
        <img src="../../assets/LMLogo.png" class="lm-left-icon">
        <img src="../../assets/LogoData.png" class="lm-right-icon">

        <div class="brand">
          <div class="logo">
            <svg width="200px" height="200px" >
              <path stroke="#78be20" stroke-width="0" fill="#ff004e" d="M140.773,59.227C137.316,55.771,130.055,50,100,50
              s-37.317,5.771-40.774,9.227C55.77,62.684,49.999,69.104,50,100c-0.001,30.896,5.77,37.316,9.227,40.773
              C62.683,144.229,69.103,150,100,150c30.895,0,37.317-5.771,40.772-9.227C144.229,137.316,150,130.896,150,100
              S144.229,62.683,140.773,59.227z"/>
        
              <path stroke="#78be20" stroke-width="0" fill="#ff004e" d="M140.773,59.227C137.316,55.771,130.055,50,100,50
              s-37.317,5.771-40.774,9.227C55.77,62.684,49.999,69.104,50,100c-0.001,30.896,5.77,37.316,9.227,40.773
              C62.683,144.229,69.103,150,100,150c30.895,0,37.317-5.771,40.772-9.227C144.229,137.316,150,130.896,150,100
              S144.229,62.683,140.773,59.227z"/>
        
              <path stroke="#175ca6" stroke-width="0" fill="#ff004e" d="M140.773,59.227C137.316,55.771,130.055,50,100,50
              s-37.317,5.771-40.774,9.227C55.77,62.684,49.999,69.104,50,100c-0.001,30.896,5.77,37.316,9.227,40.773
              C62.683,144.229,69.103,150,100,150c30.895,0,37.317-5.771,40.772-9.227C144.229,137.316,150,130.896,150,100
              S144.229,62.683,140.773,59.227z"/>
            </svg>
          </div>
        </div>
        <p class="title"><strong>Login</strong></p>
        
        <div class="col-12">
          <div class="form-group">
            <md-field class="input-group mb-3">
              <div class="input-group-prepend input-group-text">
                <md-icon>person</md-icon>
              </div>
              <label style="padding-left: 60px"
                >Introduce tu LDAP</label>
              <md-input type="text" v-model="username" style="padding-left: 10px"
                @change="loginErrors.user=false; loginErrors.wrongCredentials=false;"
                @keyup.enter="login()"/>
              <small v-if="loginErrors.user" class="err-msg col-12"><md-icon class="err-icon">error</md-icon>Debes indicar un LDAP</small>
            </md-field>
          </div>
          <br>

          <div class="form-group">
            <div class="input-group mb-3">
              <md-field>
                <div class="input-group-text">
                  <md-icon>vpn_key</md-icon>
                </div>
                <label style="padding-left: 60px"
                >Introduce tu contraseña</label>
                <md-input v-model="password" type="password" style="padding-left: 10px"
                @change="loginErrors.password=false; loginErrors.wrongCredentials=false;"
                @keyup.enter="login()"></md-input>
                <small v-if="loginErrors.password" class="err-msg col-12"><md-icon class="err-icon">error</md-icon>Debes indicar un contraseña</small>
              </md-field>
            </div>
          </div>
          <br>

          <div class="text-center login-btn input-group">
            <small v-if="loginErrors.wrongCredentials" class="err-msg-up col-10">
              <md-icon class="err-icon">error</md-icon>{{loginErrors.wrongCredentials}}
            </small>
            <button type="submit" class="btn btn-success col-10" @click="login()">
              <strong>Entrar</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
var axios = require("axios");
export default {
  name: "login",
  data: () =>({
      apptitle: "Fullgreen",
      username: "",
      password: "",
      passIsVisible: false,
      loginErrors: { password: false, user: false, wrongCredentials: false },
      publicPath: process.env.BASE_URL,
      hoverPass: false
  }),
  methods: {
    userValid() {
      return this.username.trim().length > 0;
    },
    passValid() {
      return this.password.trim().length > 0;
    },
    login() {
      if (this.userValid() && this.passValid()) {
        // call to service
        this.loginCall();
      } else {
        this.loginErrors.user = !this.userValid();
        this.loginErrors.password = !this.passValid();
      }
    },
    loginCall(){
        var api_url=this.$store.state.config.config.API_URL;
        let options = {
          'Content-Type': "application/json"
        };
        let user;
        axios.post(api_url + "/v1/login", 
        {
          username: this.username.trim(),
          password: this.password.trim()
        },
        { headers: options })
        .then(response => {
          if (response.status == 200) {
            user = {logged:true};
            sessionStorage.setItem("fullgreen_login", btoa(JSON.stringify(user)));
            this.$router.push({name: 'CV'});//cargar_CV_tras_login
          } else {
              user = {logged:false};
              this.loginErrors.wrongCredentials="Se ha producido un error, inténtelo más tarde";
            }
        })
        .catch(err => {
          if (err.message.includes("403")) {
            this.loginErrors.wrongCredentials="Usuario o contraseña incorrectos";
          } else {
            this.loginErrors.wrongCredentials="Error de conexión, inténtelo más tarde";
          }
      });
    }
  }
};
</script>



<style scoped>
.lm-left-icon{
  padding-top: 10px;
  position: absolute;
  left: 3%;
  top: 0%;
  max-width: 120px;
  max-height: 82px;
}
.lm-right-icon{
  padding-top: 10px;
  position: absolute;
  right: 3%;
  top: 0%;
  max-width: 120px;
  max-height: 82px;
}
.login-box {
  width: 380px;
  margin: 50px auto 30px auto;  
  border: 1px solid green;
  background: rgba(255, 255, 255, 0.7);
  min-height: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}
  .login-box>.body {
    padding: 20px;
    border-top: 0;
    color: #666;
  }
    .login-box>.body>.title{
      margin: 0;
      text-align: center;
      padding: 0 20px 20px 20px;
      font-size: 20px;
    }

.login-btn {
  display: grid;
  padding: 20px 0px;
  justify-items: center;
}

.err-input {
  border: 2px solid red;
}
  .err-msg {
    padding-left: 50px;
    color: red;
    position: absolute;
    top: 100%;
  }
  .err-msg-up {
    color: red;
    position: absolute;
    bottom: calc(100% - 10px);
  }
    .err-icon{
      color: red!important;
      font-size: 15px!important;
      vertical-align: sub;
    }

.loginForm {
  background: linear-gradient(45deg, #abdc9f, #f7f7f7, #80c0fc, #f7f7f7, #abdc9f, #f7f7f7);
  background-size: 750% 100%;
  width: 100%;
  height: 100vh;
  display: flex;
  place-items: center;
  overflow: auto;
  justify-content: center;
  padding: 0;

  -webkit-animation: AnimationName 40s linear infinite;
  -moz-animation: AnimationName 40s linear infinite;
  animation: AnimationName 40s linear infinite;
}
@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    25%{background-position:25% 50%}
    50%{background-position:50% 50%}
    75%{background-position:75% 50%}
    100%{background-position:100% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    25%{background-position:25% 50%}
    50%{background-position:50% 50%}
    75%{background-position:75% 50%}
    100%{background-position:100% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    25%{background-position:25% 50%}
    50%{background-position:50% 50%}
    75%{background-position:75% 50%}
    100%{background-position:100% 50%}
}

.brand {
  width: 200px;
  height: 200px;
  position: relative;
  margin: 0 auto;
}
.brand:before {
  background-size: 100% 100%;
  content: "Fullgreen";
  line-height: 205px;
  color: #78be20;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  position: absolute;
  z-index: 99999 !important;
}

.logo{
  animation: 5s linear infinite;
  animation-name: rotate-0;
  animation-delay: 0s;
  transform-origin: 50% 50%;
  transform: rotate(0deg);
}
svg path{
  position:absolute;
  fill:none;
  stroke-width:2;
  top:0;
  left:0;
  transform-origin: 50% 50%;
  transform: rotate(0deg) ;
  animation: 4s linear infinite;
}
.logo svg path:nth-child(1) {
  opacity: 1;
  animation-name: rotate-1;
  animation-delay: .5s;
}
.logo svg path:nth-child(2) {
  opacity: .5;
  animation-name: rotate-2;
  animation-delay: .6s;
}
.logo svg path:nth-child(3) {
  opacity: .8;
  animation-name: rotate-3;
  animation-delay: .7s;
}
@keyframes scale-1 {
  0% {transform: scale(1);}
  50% {transform: scale(.9);}
  100% {transform: scale(1);} 
}
@keyframes rotate-0 {
  from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
} 
@keyframes rotate-1 {
  from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
@keyframes rotate-2 {
  from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
}
@keyframes rotate-3 {
  from { transform: rotate(0deg); }
    to { transform: rotate(0deg); }
}

</style>
