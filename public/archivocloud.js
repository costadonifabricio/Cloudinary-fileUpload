const formularioCloudinary = document.getElementById("formularioCloudinary");
const result = document.getElementById("resultado");
const load = document.getElementById("loader");
const contImages = document.getElementById("containerImages")

const deleteImage = async (e) => {
  e.preventDefault();

  const id = e.target.dataset.id

  const response = await fetch(`/api/deleteImageDB/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
}).then(res => {
  console.log(res);
  if (res.status === 200 || res.status === 201) {
    insertImages();
    return res.json()
  } else {
    const deletedImageError = res.json();
    return {
      msg: "Error al eliminar la imagen",
      deletedImageError
    }
  }
})

  console.log(response);
}

function insertImages () {
  const allImages = fetch("http://localhost:4000/api/")
    .then(async res => {
      const response = await res.json()
      if (res.status === 404) {
        return {status: 404, msg: response}
      }
      return response
    })
    .then(res => {
      contImages.innerHTML = ""
      if (res.status === 404) {
        contImages.innerHTML = `<p>${res.msg}</p>`
      } else {
        res.forEach(image => {
          contImages.innerHTML += `
          <div class="divImage d-flex align-items-center justify-content-between ms-3 me-3">
            <img 
              src="${image.url}"
              class="imageHeight"
              alt="image"
            >
            <div class="divButtons d-flex flex-column align-items-center justify-content-center">
              <a href="${image.url}" target="_blank" class="w-100 mb-1">
                <button class="w-100 btn btn-primary">URL</button>
              </a>
              <button class="btn btn-danger w-100" data-id="${image.id}" onClick=deleteImage(event)>DELETE</button> 
            </div>
          </div>`
        })
      }
    })
}

insertImages();

formularioCloudinary.addEventListener("submit", async (e) => {
    e.preventDefault();

    load.classList.add("spinner-border")
  
    const fileToUpload = await new FormData(formularioCloudinary)
  
    const nuevoArchivo = await fetch("http://localhost:4000/api/submitFileCloudinary", {
      method: "POST",
      body: fileToUpload
    })
    .then((response) => {
      if (response.status !== 201 && response.status !== 200) {
        result.innerHTML = "Se ha producido un error al subir tu imagen, por favor, intentalo nuevamente"
      } else {
        return response.json()
      }
    })
    .then((res) => {
      if (res.newImage.url.length) {
        load.classList.remove("spinner-border")
        insertImages()
      }
    })
  });
  