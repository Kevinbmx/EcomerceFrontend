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
                <!-- <h3>Escribe tu contra¿Olvidaste tu contrase&ntilde;a?</h3>  -->
                <v-form>
                  <!-- <label>Si has olvidado tu contrase&ntilde;a ingrese su correo electronico para resetearla</label> -->
                  <v-text-field
                    v-validate="'required|min:6'"
                    name="password"
                    label="Contraseña"
                    id="password"
                    v-model="password"
                    :error-messages="errors.collect('password')"
                    type="password"
                    ref="password"
                    required
                    >
                  </v-text-field>

                  <v-text-field
                  v-validate="'required|confirmed:password|min:6'"
                    name="password_confirmation"
                    label="Confirmar contraseña"
                    id="password_confirmation"
                    v-model="confirmPassword"
                    :error-messages="errors.collect('password_confirmation')"
                    type="password"
                    :rules="[comparePasswords]"
                    data-vv-as="password">
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary"  @click="resetPassport()" :loading="loading">Enviar</v-btn>
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
  import {resetPasswordUrl} from '@/packages/config'
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
    password:'',
    confirmPassword: '',
  }),
  computed: {
    comparePasswords () {
      return this.password === this.confirmPassword || "Passwords do not match"
    },
  },
  methods: {
    resetPassport () {
      this.$validator.validateAll().then(response =>{
        if(response){
          this.loading = true
          this.$myApi.post(resetPasswordUrl, {
            token : this.$route.params.token,
            password: this.password,
            password_confirmation : this.confirmPassword
          })
          .then(response =>{
            if(response){
              this.loading = false
              this.$validator.reset();
              this.email = ''
              this.$router.push({ name: 'login', params: {
              alertName: response.data.message , alertType:response.data.type , alert:true} })
              // this.alertMethod(true, response.data.type, response.data.message)
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
