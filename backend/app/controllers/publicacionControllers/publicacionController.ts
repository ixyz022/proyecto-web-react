import db from '../../models'
import { PublicacionInterface } from '../../interfaces/types'
import { v4 as uuidv4 } from 'uuid'
import * as v from "./verificacionPublicacion"

const publicacion = db.Publicacion

export const getPublicaciones = async (): Promise<PublicacionInterface[]> => {
  const publicaciones = await publicacion.findAll({ where: {} })
  return publicaciones
}

export const VerifUserXProducto =  async (param: any): Promise<boolean> => {
  const verifRut = await v.isRutUsuario(param.userRut)
  const verifId = await v.isIdProducto(param.idProducto)
  if (!verifRut) {
    throw new Error("Rut es incorrecto")
  }
  if (!verifId) {
    throw new Error("Id es incorrecto")
  }
  return true
}

export const postPublicacion = (object: any): PublicacionInterface  => {
  const newEntry: PublicacionInterface = {
    idPublicacion: uuidv4(),
    rutUsuario: v.parseRutUsuario(object.rutUsuario),
    idProducto: v.parseIdProducto(object.idProducto),
    fotoPublicacion: v.parseFotoPublicacion(object.fotoPublicacion),
    precioPublicacion: v.parsePrecioPublicacion(object.precioPublicacion),
    estadoPublicacion: v.parseEstadoPublicacion(object.estadoPublicacion),
    tituloPublicacion: v.parseTituloPublicacion(object.tituloPublicacion),
    descripcionPublicacion: v.parseDescripcionPublicacion(object.descripcionPublicacion),
  }
  return newEntry
}