// routes/company.routes.js
import { Router } from "express";
import { 
  registerCompany, 
  getAllCompanies, 
  getCompanyById, 
  updateCompany, 
  generateExcelReport 
} from "./company.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { hasRoles } from "../middlewares/validate-roles.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Operaciones de gestión de empresas
 */


/**
 * @swagger
 * /companies/report:
 *   get:
 *     summary: Generar un reporte en Excel con todas las empresas
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *       500:
 *         description: Error en la generación del reporte
 */
router.get('/companies/report', validateJWT, hasRoles("ADMIN"), generateExcelReport);

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Registrar una nueva empresa
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la empresa
 *               impactLevel:
 *                 type: string
 *                 description: Nivel de impacto de la empresa
 *               yearsOfExperience:
 *                 type: integer
 *                 description: Años de trayectoria de la empresa
 *               category:
 *                 type: string
 *                 description: Categoría de la empresa
 *     responses:
 *       201:
 *         description: Empresa registrada exitosamente
 *       400:
 *         description: Error en el registro de la empresa
 *       500:
 *         description: Error en el servidor
 */
router.post('/companies', validateJWT, hasRoles("ADMIN"), registerCompany);

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Obtener todas las empresas con filtros
 *     tags: [Companies]
 *     parameters:
 *       - in: query
 *         name: filter
 *         required: false
 *         schema:
 *           type: string
 *           description: Filtros para la búsqueda (ej. {"category": "Tecnología"})
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *           description: Ordenar por campo (ej. "yearsOfExperience")
 *     responses:
 *       200:
 *         description: Lista de empresas
 *       500:
 *         description: Error en la obtención de las empresas
 */
router.get('/companies', validateJWT, hasRoles("ADMIN"), getAllCompanies);

/**
 * @swagger
 * /companies/{companyId}:
 *   get:
 *     summary: Obtener una empresa por ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         description: ID de la empresa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empresa encontrada
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/companies/:companyId', validateJWT, hasRoles("ADMIN"), getCompanyById);

/**
 * @swagger
 * /companies/{companyId}:
 *   put:
 *     summary: Actualizar la información de una empresa
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         description: ID de la empresa
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la empresa
 *               impactLevel:
 *                 type: string
 *                 description: Nivel de impacto de la empresa
 *               yearsOfExperience:
 *                 type: integer
 *                 description: Años de trayectoria de la empresa
 *               category:
 *                 type: string
 *                 description: Categoría de la empresa
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente
 *       400:
 *         description: Error en la actualización de la empresa
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/companies/:companyId', validateJWT, hasRoles("ADMIN"), updateCompany);



export default router;
