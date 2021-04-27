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
                    dismissible
                    :type='alertType'
                  >
                    {{alertName}}
                  </v-alert>             
                <v-form>
                  <v-text-field
                    v-validate="'required|email'"
                    append-icon="person"
                    name="email" 
                    label="Correo electronico" 
                    type="text" 
                    :error-messages="errors.collect('email')"
                    data-vv-name="email"
                    required
                    v-model="email">
                   </v-text-field>
                  <v-text-field 
                    v-validate="'required'"
                    append-icon="lock" 
                    name="password" 
                    label="Contraseña" 
                    id="password" 
                    type="password" 
                    autocomplete="off"
                     :error-messages="errors.collect('password')"
                    data-vv-name="password"
                    required
                    v-model="password">
                    </v-text-field>
                </v-form>
                    <router-link to="forgot">¿olvidaste tu contrase&ntilde;a?</router-link>
              </v-card-text>
              <v-card-actions>
                <!-- <v-spacer></v-spacer> -->
                <!-- <v-btn block color="primary" @click="login" :loading="loading">
                    Login
                    
                </v-btn> -->
                <v-btn block color="primary"  @click="login" :loading="loading">Iniciar sesion</v-btn>
              </v-card-actions>
              <div class="text-xs-center">
                <v-btn text block small :to="{name:'register'}">Registrarse</v-btn>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props:{
    alert:{
      type:Boolean,
      default: false
    },
    alertName:{
      type:String,
      default: 'su correo o su contraseña es incorrecta'
    },
    alertType:{
      type:String,
      default: 'error'
    }
  },
  data: () => ({
    loading: false,
      email: '',
      password: ''
  }),
  methods: {
    login () {
      this.$validator.validateAll().then(response =>{
        if(response){
          this.loading = true
          this.$store.dispatch('retrieveToken',{
            username:this.email,
            password:this.password,
          })
          .then(response =>{
            if(response){
              this.loading = false
              this.$router.push({name: 'mainPage'})
              location.reload();
            }
          })
          .catch(() =>{
           this.$props.alert = true
            this.loading = false
            // console.log('errorssss',error)
          })
        }
      })
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
