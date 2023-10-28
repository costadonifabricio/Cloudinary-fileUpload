const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileToUpload = new FormData(formulario)

  const nuevoArchivo = await fetch("http://localhost:4000/api/submitFileExpress", {
    method: "POST",
    body: fileToUpload
  })
  .then((response) => response.json())
  .then((res) => alert(res.msg))

  if (!nuevoArchivo) {
    return { msg: "Error al subir el archivo!!" }
  } else {
    return { msg: "Archivo subido correctamente" }
  }
});
