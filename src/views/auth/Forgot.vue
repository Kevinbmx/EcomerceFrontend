<template>
  <v-app id="login" class="primary">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <router-link :to="{ name: 'mainPage' }"><h1 class="flex my-4 primary--text">ni&ntilde;o tienda</h1></router-link>
                </div>  
                <v-alert
                  v-model='alert'
                  :type='alertType'>
                  {{alertName}}
                </v-alert>                        
                <h3>¿Olvidaste tu contrase&ntilde;a?</h3> 
                <v-form>
                  <!-- <label>Si has olvidado tu contrase&ntilde;a ingrese su correo electronico para resetearla</label> -->
                  <v-text-field
                    v-validate="'required|email'"
                    append-icon="person"
                    name="email" 
                    label="ingrese su correo su electronico para resetear su contraseña" 
                    type="email" 
                    :error-messages="errors.collect('email')"
                    data-vv-name="email"
                    required
                    v-model="email">
                   </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary"  @click="forgotPassport()" :loading="loading">Enviar</v-btn>
              </v-card-actions>
              <div class="text-xs-center">
                <v-btn text block small :to="{name:'login'}">Login</v-btn>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import {forgotPasswordtUrl} from '@/packages/config'
export default {
  //   props:{
  //   alert:{
  //     type:Boolean,
  //     default: false
  //   },
  //   alertName:{
  //     type:String,
  //     default: 'su correo o su contrase&ntilde;a es incorrecta'
  //   },
  //   alertType:{
  //     type:String,
  //     default: 'error'
  //   }
  // },
  data: () => ({
    alert:false,
    alertName:'sdfsdf',
    alertType:"success",
    loading: false,
    email: '',
  }),
  methods: {
    forgotPassport () {
      this.$validator.validateAll().then(response =>{
        if(response){
          this.loading = true
          this.$myApi.post(forgotPasswordtUrl, {
            email: this.email,
          })
          .then(response =>{
            if(response){
              this.loading = false
              this.$validator.reset();
              this.email = ''
              this.alertMethod(true, response.data.type, response.data.message)
            }
          }).catch(error => {
            // console.log(error)
            this.alertMethod(true, error.data.type, error.data.message)
          })
        }
      })
    },
    alertMethod($alert,$alertTypes, $alertNames){
    //   // this.$emit("alert", $alert);
    //   // this.$emit("alertType", $alertType);
    //   // this.$emit("alertName", $alertName);
    //    this.$props.alert = $alert
    //    this.$props.alertType = $alertType
    //    this.$props.alertName = $alertName
      this.alert = $alert
       this.alertType = $alertTypes
       this.alertName = $alertNames
    // this.alertNames($alert)
    // this.alertName($alertTypes)
    // this.alertTypes($alertNames)
    }
  }

};
</script>
<style scoped>
  #login {
    height: 50% !important;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 1;
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
