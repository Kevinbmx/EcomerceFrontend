import * as firebase from 'firebase'
import { getField, updateField } from 'vuex-map-fields';
import { productUrl, characteristicUrl, fileUrl, categoryUrl, statusProductUrl } from '../../../packages/config'

const strict = true
const state = {
    products: [],
    productObj: {
        generateUuid: '',
        id: null,
        name: '',
        modelo: '',
        quantity: '',
        brand: '',
        price: '',
        category_id: null,
        // category_id:undefined,
        peso: '',
        alto: '',
        ancho: '',
        fondo: '',
        parent_id: 0,
        // statusProduct_id:null,
        statusProduct_id: null,
        description: '',
        unidad_medida: null,
        enable_kg_per_price: false,
        enable: true
        // uniqueCode:'',
    },
    unidad_medidas: [{ id: 'unidad', label: 'unidad' }, { id: 'kg', label: 'kg' }, { id: 'docena', label: 'docena' }, { id: 'caja', label: 'caja' }],
    // unidad_medidas:['unidad','kg','docena','caja'],
    categories: [],
    status: [],
    characteristics: [
        {
            id: '',
            characteristicName: '',
            state: 'new'
        },
    ],
    files: [
        // {
        //     id:'',
        //     name:'',
        //     file:'',
        //     url:'',
        //     uuid:'',
        //     state:'new'
        // }
    ],
    fileForDelete: [],
    maxUploadImage: 4,
    userFirebase: process.env.VUE_APP_FI_USER_FIREBASE,
    // passFirebase:'secret!123',
    passFirebase: process.env.VUE_APP_FI_PASSWORK_FIREBASE,
    //para insertar en la carpeta correcta en firebase
    firebaseProductFile: process.env.VUE_APP_FI_PRODUCT_FILE_URL
}

const getters = {
    getField,
    fileGetter: (state) => {
        return state.files
    },
    ProductGetter: (state) => {
        return state.products
    },
    categoriesGetter: (state) => {
        return state.categories
    },
    statusGetter: (state) => {
        return state.status
    },
    unidad_medidaGetter: (state) => {
        return state.unidad_medidas
    },
}

const mutations = {
    updateField,
    fillcategories(state, response) {
        state.categories = response
    },
    fillStatus(state, response) {
        state.status = response
    },
    addCharacteristic(state) {
        const index = state.characteristics.length
        if (index == 0 || state.characteristics[index - 1].characteristicName != '') {
            state.characteristics.push({
                id: '',
                characteristicName: '',
                state: 'new'
            })
        }
    },
    fillProducts(state, response) {
        state.products = response
    },
    fillProductById(state, response) {
        state.productObj = {
            generateUuid: '',
            id: response.id,
            name: response.name,
            modelo: response.modelo,
            brand: response.brand,
            category_id: response.category_id,
            quantity: response.quantity,
            price: response.price,
            peso: response.peso,
            alto: response.alto,
            ancho: response.ancho,
            fondo: response.fondo,
            statusProduct_id: response.statusProduct_id,
            description: response.description,
            parent_id: 0,
            unidad_medida: response.unidad_medida,
            enable_kg_per_price: response.enable_kg_per_price,
            enable: response.enable
        }
    },
    fillCharacteristicByProductId(state, response) {
        let arrayOfCharacteristic = []
        for (let index = 0; index < response.length; index++) {
            const element = response[index]
            arrayOfCharacteristic.push({
                id: element.id,
                characteristicName: element.characteristic,
                state: 'edit'
            })
        }
        state.characteristics = arrayOfCharacteristic
    },
    fillFileByProductId(state, response) {
        let arrayOfFile = []
        for (let index = 0; index < response.length; index++) {
            const element = response[index];
            arrayOfFile.push({
                id: element.id,
                name: element.name,
                file: '',
                url: element.path,
                uuid: '',
                state: 'old'
            })
        }
        state.files = arrayOfFile
    },
    putImage(state, response) {
        var element = state.files[response.index]
        var estado = 'new'
        if (element.state == 'old') {
            let objfileDelete = {
                id: element.id,
                url: element.url
            }
            state.fileForDelete.push(objfileDelete)
            estado = 'new'
        }
        element.id = ''
        element.name = ''
        element.file = response.file
        element.url = response.url
        element.uuid = response.uuid
        element.state = estado
    },
    deleteCharacteristic(state, objCharact) {
        var estado = objCharact.state
        var index = objCharact.index
        if (estado == 'edit' && state.characteristics[index].state == 'edit') {
            // console.log(index)
            state.characteristics[index].state = 'delete'
        } else if (state.characteristics[index].state == 'new' || state.characteristics[index].state == 'delete') {
            state.characteristics.splice(index, 1);
        }
    },

    //------------llenado de producto------------
    generateUuid(state, AddProductObj) {
        state.productObj.generateUuid = AddProductObj
    },
    NameProduct(state, AddProductObj) {
        state.productObj.name = AddProductObj
    },
    modeloProduct(state, AddProductObj) {
        state.productObj.modelo = AddProductObj
    },
    quantityProduct(state, AddProductObj) {
        state.productObj.quantity = AddProductObj
    },
    brandProduct(state, AddProductObj) {
        state.productObj.brand = AddProductObj
    },
    priceProduct(state, AddProductObj) {
        state.productObj.price = AddProductObj
    },
    category_idProduct(state, AddProductObj) {
        state.productObj.category_id = AddProductObj
    },
    pesoProduct(state, AddProductObj) {
        state.productObj.peso = AddProductObj
    },
    altoProduct(state, AddProductObj) {
        state.productObj.alto = AddProductObj
    },
    anchoProduct(state, AddProductObj) {
        state.productObj.ancho = AddProductObj
    },
    fondoProduct(state, AddProductObj) {
        state.productObj.fondo = AddProductObj
    },
    parent_idProduct(state, AddProductObj) {
        state.productObj.parent_id = AddProductObj
    },
    statusProduct_idProduct(state, AddProductObj) {
        state.productObj.statusProduct_id = AddProductObj
    },
    updateDescription(state, AddProductObj) {
        state.productObj.description = AddProductObj
    },
    unidad_medidaProduct(state, AddProductObj) {
        state.productObj.unidad_medida = AddProductObj
    },
    enable_kg_per_priceProduct(state, AddProductObj) {
        state.productObj.enable_kg_per_price = AddProductObj
    },
    enableProduct(state, AddProductObj) {
        state.productObj.enable = AddProductObj
    },
    //---------------------------------------------------
    //---------------adicionando imagen------------------
    deleteFileImage(state, index) {
        var element = state.files[index]
        if (element.state == 'old') {
            let objfileDelete = {
                id: element.id,
                name: element.name,
                url: element.url
            }
            state.fileForDelete.push(objfileDelete)
        }
        state.files.splice(index, 1)
    },
    CreateAndUpdateProductSubmit(state, productId) {
        state.productObj.id = productId
    },
    clearFields(state) {
        state.productObj = {
            generateUuid: '',
            id: null,
            name: '',
            modelo: '',
            quantity: '',
            brand: '',
            price: '',
            category_id: null,
            peso: '',
            alto: '',
            ancho: '',
            fondo: '',
            parent_id: 0,
            statusProduct_id: null,
            description: '',
            unidad_medida: '',
            enable_kg_per_price: false,
            enable: true
        },
            state.categories = [],
            state.status = [],
            state.characteristics = [{
                id: '',
                characteristicName: '',
                state: 'new'
            }],
            state.files = [
                {
                    id: '',
                    name: '',
                    file: '',
                    url: '',
                    uuid: '',
                    state: 'new'
                },
            ]
        state.fileForDelete = []
    },
    addFileImage() {
        state.files.push({
            id: '',
            name: '',
            file: '',
            url: '',
            uuid: '',
            state: 'new'
        })
    },
    emptyFile(state, index) {
        var element = state.files[index]
        if (element.state == 'old') {
            let objfileDelete = {
                id: element.id,
                name: element.name,
                url: element.url
            }
            state.fileForDelete.push(objfileDelete)
        }
        element.id = ''
        element.url = ''
        element.state = 'new'
        element.uuid = ''
    },
    addingImageFirebase(state, objFile) {
        var resultadoNew = state.files.filter(file => file.state === 'new');
        var element = resultadoNew[objFile.index]
        element.url = objFile.urlFirebase
        element.name = objFile.name
    },
    CreateAndUpdateCharacteristic(state, objCharact) {
        state.characteristics[objCharact.index].id = objCharact.id
    },
    createAndUpdateFileProduct(state, objFile) {
        var element = state.files[objFile.index]
        element.id = objFile.id
        element.name = objFile.name
    },
    deleteImageFirebaseAndDataBase(state) {
        state.fileForDelete = []
    },
}

const actions = {
    fillcategories(context) {
        this.$myApi.get(categoryUrl)
            .then(response => {
                context.commit('fillcategories', response.data.CategoryTree)
            })
    },
    fillStatus(context) {
        this.$myApi.get(statusProductUrl)
            .then(response => {
                context.commit('fillStatus', response.data)
            })
    },
    fillProducts(context) {
        return new Promise((resolve, reject) => {
            this.$myApi.get(productUrl)
                .then(response => {
                    resolve(response.data.hasPermission)
                    context.commit('fillProducts', response.data.productWithUser)
                })
                .catch(error => {
                    // console.log(error)
                    reject(error)
                })
        })
    },
    fillProductById(context, object) {
        return new Promise((resolve, reject) => {
            // console.log('estoy en llenado de producto', object)
            var id = object.id
            this.$myApi.get(productUrl + '/' + id)
                .then(response => {
                    resolve(response.data.hasPermission)
                    context.commit('fillProductById', response.data.ProductById)
                })
                .catch(error => {
                    // console.log(error)
                    reject(error)
                })
        })
    },
    fillCharacteristicByProductId(context, object) {
        var id = object.id
        this.$myApi.get(characteristicUrl + '/' + id)
            .then(response => {
                context.commit('fillCharacteristicByProductId', response.data)
            })
            .catch(() => {
                // console.log(error)
            })
    },
    fillFileByProductId(context, object) {
        var id = object.id
        this.$myApi.get(fileUrl + '/' + id)
            .then(response => {
                context.commit('fillFileByProductId', response.data)
            })
            .catch(() => {
                // console.log(error)
            })
    },
    addFile(context, objFile) {
        context.commit('addFile', objFile)
    },
    deleteCharacteristic(context, objcharacteristic) {
        context.commit('deleteCharacteristic', objcharacteristic)
    },

    deleteFileImage(context, number) {
        context.commit('deleteFileImage', number)
    },
    addFileImage(context) {
        context.commit('addFileImage')
    },
    emptyFile(context, index) {
        context.commit('emptyFile', index)
    },
    //creando en la base de datos
    CreateAndUpdateProductSubmit(context, object) {
        return new Promise((resolve) => {
            var method = object.method
            var id = object.productId
            var url = productUrl
            if (method == 'put') {
                url = productUrl + '/' + id
            }
            // console.log('number one')
            // console.log(auth)
            const data = state.productObj
            this.$myApi.post(url, {
                name: data.name,
                modelo: data.modelo,
                quantity: data.quantity,
                brand: data.brand,
                price: data.price,
                category_id: data.category_id,
                peso: data.peso,
                alto: data.alto,
                ancho: data.ancho,
                fondo: data.fondo,
                parent_id: 0,
                description: data.description,
                statusProduct_id: data.statusProduct_id,
                unidad_medida: data.unidad_medida,
                enable_kg_per_price: data.enable_kg_per_price,
                enable: data.enable

            }).then(response => {
                // console.log('producto registrado con exito', response)
                if (response.data.saved) {
                    context.commit('CreateAndUpdateProductSubmit', response.data.product_id)
                    resolve(true)
                }
                // console.log(ex)
            }).catch(() => {
                // console.log(ex)
            })

        })
    },
    //add image in farebase

    async uploadImageFirebase(context, fileForInsert) {
        return new Promise((resolve) => {
            for (let index = 0; index < fileForInsert.length; index++) {
                const element = fileForInsert[index];
                if (element.url == '' && element.uuid == '') {
                    resolve(false)
                    // return
                } else {
                    firebase.auth().signInWithEmailAndPassword(state.userFirebase, state.passFirebase)
                        .then(() => {
                            const uuid = element.uuid;
                            var storageRef = firebase.storage().ref();
                            var metadata = {
                                contentType: element.file[0].type
                            }
                            const filename = element.file[0].name
                            const ext = filename.slice(filename.lastIndexOf('.'))
                            var uploadTask = storageRef.child(state.firebaseProductFile + '/' + uuid + ext).put(element.file[0], metadata);
                            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                                function (snapshot) {
                                    switch (snapshot.state) {
                                        case firebase.storage.TaskState.PAUSED:
                                            // console.log('Upload is paused');
                                            break;
                                        case firebase.storage.TaskState.RUNNING:
                                            // console.log('Upload is running');
                                            break;
                                    }
                                }, function (error) {
                                    switch (error.code) {
                                        case 'storage/unauthorized':
                                            // User doesn't have permission to access the object
                                            break;

                                        case 'storage/canceled':
                                            // User canceled the upload
                                            break;

                                        case 'storage/unknown':
                                            // Unknown error occurred, inspect error.serverResponse
                                            break;
                                    }
                                }, function complete() {
                                    // Upload completed successfully, now we can get the download URL
                                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                        let objectFile = {
                                            index: index,
                                            name: uuid + ext,
                                            urlFirebase: downloadURL
                                        }
                                        context.commit('addingImageFirebase', objectFile)
                                        // console.log('File available at', downloadURL);
                                        if (fileForInsert.length == index + 1) {
                                            resolve(true)
                                        }
                                    });
                                }
                            )
                        })
                }
            }
        })
    },

    addingImageFirebase(context) {
        return new Promise((resolve) => {
            var resultadoNew = state.files.filter(file => file.state === 'new');
            // console.log('entro a ingresar imagen',resultadoNew, context)
            if (resultadoNew.length > 0) {
                context.dispatch('uploadImageFirebase', resultadoNew).then((response) => {
                    resolve(response)
                })
            } else {
                //es true ya sea aqui o enl a parte de arribita por que necesita pasar a insertar o actualizar las imagenes
                resolve(true)
            }
        })
    },
    CreateAndUpdateCharacteristic(context) {
        try {
            var url = ''
            // console.log('entra a caracteristica', context)
            for (let index = 0; index < state.characteristics.length; index++) {
                const element = state.characteristics[index];
                if (element.characteristicName != '') {
                    if (element.state == 'edit' || element.state == 'new') {
                        if (element.state == 'edit') {
                            url = characteristicUrl + '/' + element.id
                        } else if (element.state == 'new') {
                            url = characteristicUrl
                        }
                        this.$myApi.post(url, {
                            product_id: state.productObj.id,
                            characteristic: element.characteristicName
                        }).then(response => {
                            let objCharact = {
                                id: response.data.id,
                                index: index
                            }
                            context.commit('CreateAndUpdateCharacteristic', objCharact)
                            // console.log('caracteristica '+response.data.type+' con exito', response.data )
                        })
                    } else {
                        url = characteristicUrl + '/' + element.id
                        this.$myApi.delete(url)
                    }
                }
            }
        } catch (ex) {
            // console.log(ex)
        }
    },
    createAndUpdateFileProduct(context) {
        try {
            var url = fileUrl
            for (let index = 0; index < state.files.length; index++) {
                const element = state.files[index];
                if (element.state == 'update' || element.state == 'new') {
                    if (element.state == 'update') {
                        url = url + '/' + element.id
                    }
                    this.$myApi.post(url, {
                        product_id: state.productObj.id,
                        name: element.name,
                        path: element.url
                    }).then(response => {
                        let objCharact = {
                            id: response.id,
                            name: response.name,
                            index: index
                        }
                        context.commit('createAndUpdateFileProduct', objCharact)
                        // console.log('imagenes registradas con exito',response.data.saved)
                    })
                }
            }
        } catch (ex) {
            // console.log(ex)
        }
    },
    deleteImageFirebaseAndDataBase(context) {
        if (state.fileForDelete.length > 0) {
            firebase.auth().signInWithEmailAndPassword(state.userFirebase, state.passFirebase)
                .then(() => {
                    for (let index = 0; index < state.fileForDelete.length; index++) {
                        const element = state.fileForDelete[index];
                        var storage = firebase.storage();
                        var storageRef = storage.ref();
                        var desertRef = storageRef.child('/' + state.firebaseProductFile + '/' + element.name);
                        desertRef.delete().then(function () {
                        }).catch(() => {
                            return
                            // Uh-oh, an error occurred!
                        });
                        this.$myApi.delete(fileUrl + '/' + element.id)
                    }
                    context.commit('deleteImageFirebaseAndDataBase')
                })
        }
    },
    putImage(context, object) {
        context.commit('putImage', object)
    },
    clearFields(context) {
        context.commit('clearFields')
    },

    addCharacteristic(context) {
        context.commit('addCharacteristic')
    },
}
export default {
    strict, state, getters, mutations, actions
}
