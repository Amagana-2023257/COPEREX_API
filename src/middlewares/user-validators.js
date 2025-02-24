import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { emailExists, blockRole, userExists} from "../helpers/db-validators.js";

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre es requerido")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

  body("email")
    .trim()
    .isEmail().withMessage("El correo electrónico no es válido")
    .normalizeEmail()
    .custom(emailExists),

  body("password")
    .notEmpty().withMessage("La contraseña es requerida")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),

  body("role")
    .optional()
    .custom(blockRole),

  validarCampos,
  handleErrors,
];

export const loginValidator = [

  body("email")
    .optional()
    .trim()
    .isEmail().withMessage("El correo electrónico no es válido")
    .normalizeEmail(),

  body("username")
    .optional()
    .trim()
    .isString().withMessage("El nombre de usuario debe ser una cadena de caracteres"),

  body("password")
    .notEmpty().withMessage("La contraseña es requerida"),

  validarCampos,
  handleErrors,
];

export const getUserByIdValidator = [
  param("id")
    .isMongoId().withMessage("No es un ID válido de MongoDB")
    .custom(userExists),

  validarCampos,
  handleErrors,
];
