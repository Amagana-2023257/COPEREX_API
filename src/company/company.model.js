// models/company.model.js
import mongoose from 'mongoose';

const impactEnum = ['Alto', 'Medio', 'Bajo']

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - name
 *         - impactLevel
 *         - yearsOfExperience
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de la empresa
 *         impactLevel:
 *           type: string
 *           description: Nivel de impacto de la empresa (Ej. Alto, Medio, Bajo)
 *         yearsOfExperience:
 *           type: number
 *           description: Años de trayectoria de la empresa
 *         category:
 *           type: string
 *           description: Categoría empresarial de la empresa (Ej. Tecnología, Alimentos, etc.)
 *         status:
 *           type: boolean
 *           description: Estado de la empresa (activa o inactiva)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la empresa
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización de la empresa
 */
const companySchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    impactLevel: { 
        type: String, 
        required: true, 
        enum: impactEnum
    },
    yearsOfExperience: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    status: { 
        type: Boolean, 
        default: true 
    }, 
  },
  { timestamps: true }
);

const Company = mongoose.model('Company', companySchema);

export default Company;
