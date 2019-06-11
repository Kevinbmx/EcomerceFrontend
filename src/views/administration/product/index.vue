<template>
    <div id="pageIndexCategory">
      <v-container grid-list-xl fluid>
        <v-app id="inspire">
            <v-card   
            >
                <v-card-title>
                    Products
                    <v-divider
                        class="mx-2"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    ></v-text-field>
                </v-card-title>
                <v-card-text >
                    <v-data-table
                        :headers="headers"
                        :items="ProductGetter"
                        :search="search"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.name }}</td>
                            <td class="text-xs-right">{{ props.item.modelo }}</td>
                            <td class="text-xs-right">{{ props.item.quantity }}</td>
                            <td class="text-xs-right">{{ props.item.brand }}</td>
                            <td class="text-xs-right">{{ props.item.price }}</td>
                            <td class="text-xs-right">{{ props.item.peso }}</td>
                            <td class="text-xs-right">{{ props.item.alto }}</td>
                            <td class="text-xs-right">{{ props.item.ancho }}</td>
                            <td class="text-xs-right">{{ props.item.fondo }}</td>
                            <td class="justify-center layout px-0">
                                <v-btn flat  icon color="primary" :to="{name: 'editProduct',params: {id:props.item.id}}">
                                    <v-icon small>
                                        edit
                                    </v-icon>
                                </v-btn>
                                <v-btn flat  icon color="red" :to="{name: 'editProduct',params: {id:props.item.id}}">
                                    <v-icon
                                        small
                                    >
                                        delete
                                    </v-icon>
                                </v-btn>
                                </td>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                        </v-alert>
                    </v-data-table>
                </v-card-text>
                <v-card-text style="position: relative">
                    <v-fab-transition>
                        <v-tooltip top>
                        <v-btn  dark
                                :to="{ name: 'createProduct' }"
                                right
                                fixed
                                bottom
                                fab slot="activator" color="primary">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                        <span>new Product</span>
                        </v-tooltip>
                    </v-fab-transition>
                </v-card-text>
            </v-card>
      
        </v-app>
    </v-container>
          <!-- <div style=" position: relative">
            <v-fab-transition>
                        <v-tooltip bottom>
                        <v-btn  dark
                                absolute
                                top
                                fixed
                                right
                                fab slot="activator" color="indigo">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                        <span>new Product</span>
                        </v-tooltip>
                    </v-fab-transition>
                    </div> -->
</div>
</template>
<script>
import { mapGetters } from 'vuex'
    export default {
        name: 'ProductIndex',
        data () {
        return {
            search: '',
            headers: [
                {
                text: 'Products',
                align: 'left',
                sortable: false,
                value: 'name'
                },
                { text: 'Modelo', value: 'modelo' },
                { text: 'Cantidad', value: 'quantity' },
                { text: 'Marca', value: 'brand' },
                { text: 'Precio', value: 'price' },
                { text: 'Peso', value: 'peso' },
                { text: 'Alto', value: 'alto' },
                { text: 'Ancho', value: 'ancho' },
                { text: 'Fondo', value: 'fondo' },
                 { text: 'Actions', value: 'name', sortable: false }
            ],
            
            }
        },
        components: {
        },
        created(){
            this.fillProducts();
        },
        computed:{
            ...mapGetters([
                'ProductGetter',
            ]),
        },
        mounted(){
            // this.removeCollapse();
        },
        methods: {
           fillProducts(){
               this.$store.dispatch('fillProducts',this.$store.state.auth.token)
           }
     
         

      }
    }
</script>
