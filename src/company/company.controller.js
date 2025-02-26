import Company from './company.model.js';
import ExcelJS from 'exceljs';

/**
 * Helper: Calcula los años de experiencia a partir del año de fundación almacenado
 */
const computeExperience = (foundationYear) => {
  const currentYear = new Date().getFullYear();
  return currentYear - foundationYear;
};

const impactEnum = ['Alto', 'Medio', 'Bajo'];

/**
 * Registrar una nueva empresa
 * Se espera que en req.body.yearsOfExperience se envíe el año de fundación (por ejemplo, 1990)
 * Se almacena ese valor sin modificar y se hará el cálculo al momento de mostrar la información.
 */
export const registerCompany = async (req, res) => {
  try {
    const { name, impactLevel, yearsOfExperience, category } = req.body;

    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({
        message: 'Ya existe una empresa con este nombre',
      });
    }

    const newCompany = new Company({
      name,
      impactLevel,
      yearsOfExperience, 
      category,
    });

    await newCompany.save();

    const responseCompany = newCompany.toObject();
    responseCompany.yearsOfExperience = computeExperience(newCompany.yearsOfExperience);

    return res.status(201).json({
      message: 'Empresa registrada exitosamente',
      company: responseCompany,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al registrar la empresa',
      error: err.message,
    });
  }
};

/**
 * Obtener todas las empresas registradas con filtros y ordenamientos
 * Se transforma el campo yearsOfExperience al calcular la experiencia real (año actual - año de fundación)
 */
export const getAllCompanies = async (req, res) => {
  try {
    const { filter, sort } = req.query;

    const filters = {};
    if (filter) {
      const filterObj = JSON.parse(filter);
      for (const [key, value] of Object.entries(filterObj)) {
        filters[key] = value;
      }
    }

    let sortField = sort;
    let sortOrder = 1;
    if (sort && sort.startsWith('-')) {
      sortField = sort.slice(1);
      sortOrder = -1;
    }

    let companies;
    if (sortField === 'impactLevel') {
      companies = await Company.find(filters);
    } else {
      companies = await Company.find(filters).sort(sort ? { [sortField]: sortOrder } : {});
    }

    const transformedCompanies = companies.map((company) => {
      const companyObj = company.toObject();
      companyObj.yearsOfExperience = computeExperience(companyObj.yearsOfExperience);
      return companyObj;
    });

    if (sortField === 'impactLevel') {
      transformedCompanies.sort((a, b) => {
        const indexA = impactEnum.indexOf(a.impactLevel);
        const indexB = impactEnum.indexOf(b.impactLevel);
        return sort && sort.startsWith('-') ? indexB - indexA : indexA - indexB;
      });
    }

    return res.status(200).json(transformedCompanies);
  } catch (err) {
    return res.status(500).json({
      message: 'Error al obtener las empresas',
      error: err.message,
    });
  }
};

/**
 * Obtener una empresa por su ID y permitir la edición de la información
 * Se calcula la experiencia real antes de responder.
 */
export const getCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: 'Empresa no encontrada',
      });
    }

    const companyObj = company.toObject();
    companyObj.yearsOfExperience = computeExperience(companyObj.yearsOfExperience);

    return res.status(200).json(companyObj);
  } catch (err) {
    return res.status(500).json({
      message: 'Error al obtener la empresa',
      error: err.message,
    });
  }
};

/**
 * Editar la información de una empresa
 * Si se actualiza el campo yearsOfExperience, se espera recibir el año de fundación,
 * y se almacena ese valor sin calcular; el cálculo se hará al mostrar la información.
 */
export const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { name, impactLevel, yearsOfExperience, category } = req.body;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: 'Empresa no encontrada',
      });
    }

    company.name = name || company.name;
    company.impactLevel = impactLevel || company.impactLevel;
    company.yearsOfExperience = yearsOfExperience || company.yearsOfExperience;
    company.category = category || company.category;

    await company.save();

    const companyObj = company.toObject();
    companyObj.yearsOfExperience = computeExperience(companyObj.yearsOfExperience);

    return res.status(200).json({
      message: 'Empresa actualizada exitosamente',
      company: companyObj,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al actualizar la empresa',
      error: err.message,
    });
  }
};

/**
 * Generar un reporte en Excel de las empresas con filtros y ordenamientos
 * Antes de agregar cada fila, se calcula la experiencia real a partir del año de fundación.
 */
export const generateExcelReport = async (req, res) => {
  try {
    const { filter, sort } = req.query;
    const filters = {};

    if (filter) {
      const filterObj = JSON.parse(filter);
      for (const [key, value] of Object.entries(filterObj)) {
        filters[key] = value;
      }
    }

    let sortField = sort;
    let sortOrder = 1; 
    if (sort && sort.startsWith('-')) {
      sortField = sort.slice(1); 
      sortOrder = -1; 
    }

    let companies;
    if (sortField === 'impactLevel') {
      companies = await Company.find(filters);
    } else {
      companies = await Company.find(filters).sort(sort ? { [sortField]: sortOrder } : {});
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Empresas');

    worksheet.columns = [
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Nivel de Impacto', key: 'impactLevel', width: 20 },
      { header: 'Años de Trayectoria', key: 'yearsOfExperience', width: 20 },
      { header: 'Categoría', key: 'category', width: 30 },
    ];

    const transformedCompanies = companies.map((company) => {
      const companyObj = company.toObject();
      companyObj.yearsOfExperience = computeExperience(companyObj.yearsOfExperience);
      return companyObj;
    });

    if (sortField === 'impactLevel') {
      transformedCompanies.sort((a, b) => {
        const indexA = impactEnum.indexOf(a.impactLevel);
        const indexB = impactEnum.indexOf(b.impactLevel);
        return sort && sort.startsWith('-') ? indexB - indexA : indexA - indexB;
      });
    }

    transformedCompanies.forEach((company) => {
      worksheet.addRow({
        name: company.name,
        impactLevel: company.impactLevel,
        yearsOfExperience: company.yearsOfExperience,
        category: company.category,
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="empresas.xlsx"'
    );

    await workbook.xlsx.write(res);
    return res.end();
  } catch (err) {
    return res.status(500).json({
      message: 'Error al generar el reporte',
      error: err.message,
    });
  }
};
