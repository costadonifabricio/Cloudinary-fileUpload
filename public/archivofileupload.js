const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const fileToUpload = new FormData(formulario);

    const response = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: fileToUpload,
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.msg);
    } else {
      throw new Error("Error al subir el archivo!!");
    }
  } catch (error) {
    console.error(error);
    alert("Error al subir el archivo!!");
  }
});

