import Company from './company.model.js';
import ExcelJS from 'exceljs';

/**
 * Registrar una nueva empresa
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

    return res.status(201).json({
      message: 'Empresa registrada exitosamente',
      company: newCompany,
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
 */
export const getAllCompanies = async (req, res) => {
  try {
    const { filter, sort } = req.query;

    // Construcción de los filtros de búsqueda
    const filters = {};
    if (filter) {
      const filterObj = JSON.parse(filter);
      for (const [key, value] of Object.entries(filterObj)) {
        filters[key] = value;
      }
    }

    const companies = await Company.find(filters).sort(sort ? { [sort]: 1 } : {});

    return res.status(200).json(companies);
  } catch (err) {
    return res.status(500).json({
      message: 'Error al obtener las empresas',
      error: err.message,
    });
  }
};

/**
 * Obtener una empresa por su ID y permitir la edición de la información
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

    return res.status(200).json(company);
  } catch (err) {
    return res.status(500).json({
      message: 'Error al obtener la empresa',
      error: err.message,
    });
  }
};

/**
 * Editar la información de una empresa
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

    return res.status(200).json({
      message: 'Empresa actualizada exitosamente',
      company,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al actualizar la empresa',
      error: err.message,
    });
  }
};

/**
 * Generar un reporte en formato Excel con todas las empresas
 */
export const generateExcelReport = async (req, res) => {
    try {
      const companies = await Company.find(); // Obtiene todas las empresas
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Empresas');
  
      worksheet.columns = [
        { header: 'Nombre', key: 'name', width: 30 },
        { header: 'Nivel de Impacto', key: 'impactLevel', width: 20 },
        { header: 'Años de Trayectoria', key: 'yearsOfExperience', width: 20 },
        { header: 'Categoría', key: 'category', width: 30 },
      ];
  
      companies.forEach((company) => {
        worksheet.addRow({
          name: company.name,
          impactLevel: company.impactLevel,
          yearsOfExperience: company.yearsOfExperience,
          category: company.category,
        });
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=empresas.xlsx');
      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      return res.status(500).json({
        message: 'Error al generar el reporte',
        error: err.message,
      });
    }
  };
  