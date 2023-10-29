import { ImgModel } from "../models/Image.js";
import cloudinary from 'cloudinary';
import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


async function createImgs (url) {
    try {
      const newImage = await ImgModel.create({
        url: url
      })
  
      if (!newImage) {
        throw {
          status: 404,
          message: "No se ha podido crear la ImgModel.",
        };
      }
  
      const response = {
        msg: "Se ha creado la ImgModel correctamente",
        newImage
      }
  
      return response
    } catch (err) {
      console.error(err);
    }
  }

export const ctrlFile = {
    getImages: async (req, res) => {
        try {
          const allImages = await ImgModel.findAll();
    
          if (!allImages || allImages.length === 0) {
            throw {
              status: 404,
              message: "No hay imagenes",
            };
          }
    
          return res.json(allImages);
        } catch (err) {
          res
            .status(err.status || 500)
            .json(err.message || "Error interno del servidor");
        }
      },
      submitFileExpressFileupload: async (req, res) => {
        try {
          if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No se han recibido los archivos!")
          }
    
          let file = req.files.file
          let path = `${__dirname}/../files/${file.name}`
          file.mv(path, (err) => {
            if (err) return res.status(500).send(err)
    
            res.send({msg: "Archivo subido correctamente!"})
          })
        } catch (err) {
          console.error(err);
        }
      },
      submitFileCloudinary: async (req, res) => {
        try {
          if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No se han recibido los archivos!")
          }
    
          let file = req.files.fileC
          let path = join(__dirname, "../files", file.name)
          file.mv(path, (err) => {
            if (err) return res.status(500).send(err)
            cloudinary.uploader.upload(path, async (error, result) => {
              if (error) {
                console.error('Error:', error);
                res.status(404).send({ msg: "No se ha podido subir correctamente la imagen", error })
              } else {
                console.log('Resultado:', result);
                const createdImage = await createImgs(result.url)
                res.status(201).send(createdImage);
              }
            })
          })
        } catch (err) {
          console.error(err);
        }
      },
      deleteImageOfDB: async (req, res) => {
        const { id } = req.params;
        try {
          const deletedImage = await ImgModel.destroy({where: {id: id}})
    
          if (!deletedImage) {
            throw {
              status: 404,
              message: "No se ha podido eliminar la ImgModel.",
            };
          }
      
        const response = {
          msg: "Se ha eliminado la ImgModel correctamente", 
          deletedImage
        }
    
        return res.status(200).send(response)
        } catch (err) {
          console.error(err);
        }
      }
}
