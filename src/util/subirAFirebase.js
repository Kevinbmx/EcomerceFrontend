import * as firebase from "firebase";
const subirImagenAFirebase = function (imagen, rutaCarrusel) {
    return new Promise((resolve, reject) => {
        const element = imagen;
        var storageRef = firebase.storage().ref();
        // var listOfUrl = []
        // console.log('esto es una prueba que entra', imagen)
        // for (let i = 0; i < element.length; i++) {
        const uuid = element.uuid;
        var metadata = {
            contentType: element.file[0].type,
        };
        const filename = element.file[0].name;
        const ext = filename.slice(filename.lastIndexOf("."));
        var uploadTask = storageRef
            .child(
                rutaCarrusel + "/" + uuid + ext
            )
            .put(element.file[0], metadata);

        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        // console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        // console.log('Upload is running');
                        break;
                }
            },
            function (error) {
                switch (error.code) {
                    case "storage/unauthorized":
                        // User doesn't have permission to access the object
                        break;

                    case "storage/canceled":
                        // User canceled the upload
                        break;

                    case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            function complete() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(function (downloadURL) {
                        let objectFile = {
                            name: uuid + ext,
                            urlFirebase: downloadURL,
                        };
                        // //   console.log('tama;o Imagen', state.maxUploadImage-1)

                        // console.log('File available at', downloadURL);
                        console.log(objectFile)
                        // listOfUrl.push(objectFile)
                        resolve(objectFile);
                    }).catch(error => {
                        reject(error)
                    });
            }
        );
        // }
        // console.log('lista de url', listOfUrl);
        // resolve(listOfUrl);
    })
}
const borrarImagenAFirebase = function (pathName, rutaCarrusel) {
    return new Promise((resolve, reject) => {
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var desertRef = storageRef.child(
            rutaCarrusel + '/' +
            pathName
        );
        desertRef
            .delete()
            .then(function () {
                // console.log('se elimino correctamente de firebase su imagen')
                resolve(true);
            })
            .catch((error) => {
                reject(error)
                // Uh-oh, an error occurred!
            });
    })
}

export default {
    subirImagenAFirebase,
    borrarImagenAFirebase
};
