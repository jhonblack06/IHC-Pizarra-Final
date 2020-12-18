const joi = require('@hapi/joi')

const userNombresSchema = joi.string().max(80)
const userApellidosSchema = joi.string().max(80)
const userTelefonoSchema = joi.string().regex(/^[0-9]+$/).max(12)
const userCorreoSchema = joi.string().email().max(256)

const userIdSchema = joi.object({
  userId: joi.string().regex(/^[0-9a-fA-F]{24}$/)
})

const createUserSchema = joi.object({
  nombres: userNombresSchema.required(),
  apellidos: userApellidosSchema.required(),
  telefono: userTelefonoSchema.required(),
  correo: userCorreoSchema.required(),
})

const updateUserSchema = joi.object({
  nombres: userNombresSchema.required(),
  apellidos: userApellidosSchema.required(),
  telefono: userTelefonoSchema.required(),
  correo: userCorreoSchema.required(),
})

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
}
