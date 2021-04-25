<template>
    <div id="pageIndexModule">
      <v-container grid-list-xl fluid>
        <v-app id="inspire">
            <v-card   
            >
                <v-card-title>
                    Module
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
                        :items="this.modules"
                        :search="search"
                        :items-per-page-options='[10,25,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]'
                    >
                       <template v-slot:body="{ items }">
                           <tbody>
                                <tr v-for="item in items" :key="item.id">
                                    <td class="text-xs-left">{{ item.name }}</td>
                                    <td class="layout px-0">
                                        <v-btn 
                                            title="editar"
                                            v-if="hasPermission(actualizarModuloVar)"    
                                            text  icon color="primary" :to="{name: 'editModule',params: {id:item.id}}">
                                            <v-icon small>
                                                edit
                                            </v-icon>
                                        </v-btn>
                                        <v-btn 
                                            title="borrar"
                                            v-if="hasPermission(eliminarModuloVar)"
                                            text  icon color="red"  @click="openDialog(item.id)">
                                            <v-icon small>
                                                delete
                                            </v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                           </tbody>
                        </template>
                    </v-data-table>
                </v-card-text>
                <v-card-text>
                    <v-fab-transition>
                        <v-btn  
                        v-if="hasPermission(crearModuloVar)"
                        dark
                        :to="{ name: 'createModule' }"
                        right
                        fixed
                        bottom
                        title="nuevo modelo"
                        fab color="primary">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                    </v-fab-transition>
                </v-card-text>
                <v-dialog v-if="hasPermission(eliminarModuloVar)" v-model="dialog" persistent max-width="400px">
                    <v-card>
                        <v-card-title>
                        <span class="headline">¿Quieres eliminar este Modulo?</span>
                        </v-card-title>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDialog()">cerrar</v-btn>
                        <v-btn color="red" :loading="loading" text @click="deleteModule()">confirmar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-app>
    </v-container>
   
</div>
</template>
<script>
import {crearModulo,listarModulo,actualizarModulo,eliminarModulo} from '@/packages/libreriaDeAccesos'
import {moduleUrl} from '../../../packages/config'
import { mapGetters } from 'vuex'
    export default {
        name: 'ModuleIndex',
        data () {
            return {
                search: '',
                headers: [
                    {
                    text: 'nombre de modulo',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                    },
                    { text: 'Actions', value: 'name', sortable: false }
                ],
                modules:[],
                module_id:'',
                dialog:false,
                listarModuloVar : listarModulo,
                crearModuloVar : crearModulo,
                actualizarModuloVar : actualizarModulo,
                eliminarModuloVar : eliminarModulo,
                loading : false
            }
        },
        created(){
            this.getAllModule()
        },
        computed:{
            ...mapGetters([
                'hasPermission',
            ]),
        },
        methods: {
            getAllModule(){
                this.$myApi.get(moduleUrl)
                .then(response => {
                    if(response.data.hasPermission){
                        this.modules= response.data.module.data
                    }else{
                         this.$router.push({ name: 'withoutAccess' })
                    }
                });
            },
            deleteModule(){
                this.loading = true
                this.$myApi.delete(moduleUrl+'/'+ this.module_id)
                .then(response => {
                    if(response.data.hasPermission){
                        this.getAllModule()
                        this.closeDialog()
                        this.loading = false
                    }
                    else{
                        this.$router.push({ name: 'withoutAccess' })
                    }
                });
            },
            openDialog(id){
                this.module_id = id;
                this.dialog = true;
            },
            closeDialog(){
                this.module_id ='';
                this.dialog = false;
            }
        }
    }
</script>
