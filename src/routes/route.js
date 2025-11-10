const express = require("express");
const languageController = require("../controllers/language-controller");
const bankController = require("../controllers/bank-controller");
const currencyController = require("../controllers/currency-controller");
const countryController = require("../controllers/country-controller");
const provinceController = require("../controllers/province-controller");
const cityController = require("../controllers/city-controller");
const districtController = require("../controllers/district-controller");
const villageController = require("../controllers/village-controller");
const schemeTagController = require("../controllers/scheme-tag-controller");
const standardController = require("../controllers/standard-controller");
const standardClauseController = require("../controllers/standard-clause-controller");
const employmentLevelController = require("../controllers/employment-level-controller");
const contractCategoryController = require("../controllers/contract-category-controller");
const contractSubcategoryController = require("../controllers/contract-subcategory-controller");
const contractVariantController = require("../controllers/contract-variant-controller");
const bpjsEmploymentController = require("../controllers/bpjs-employment-controller");
const employeeCompensationController = require("../controllers/employee-compensation-controller");
const auditTypeController = require("../controllers/audit-type-controller");
const auditPeriodController = require("../controllers/audit-period-controller");
const auditRoleController = require("../controllers/audit-role-controller");
const consultantRoleController = require("../controllers/consultant-role-controller");
const legalEntityTypeController = require("../controllers/legal-entity-type-controller");
const iafCodeController = require("../controllers/iaf-code-controller");
const processFunctionController = require("../controllers/process-function-controller");
const serviceController = require("../controllers/service-controller");
const consultancyMethodController = require("../controllers/consultancy-method-controller");
const trainingCourseController = require("../controllers/training-course-controller");
const authMiddleware = require("../middleware/auth-middleware");
const mainRoutes = express.Router();

// Language
mainRoutes.get("/languages", authMiddleware, languageController.getAll);
mainRoutes.post("/languages", authMiddleware, languageController.create);
mainRoutes.get("/languages/:slug", authMiddleware, languageController.getOne);
mainRoutes.put("/languages/:slug", authMiddleware, languageController.update);
mainRoutes.delete("/languages/:slug", authMiddleware, languageController.destroy);
mainRoutes.delete("/languages", authMiddleware, languageController.destroyMany);

// Bank
mainRoutes.get("/banks", authMiddleware, bankController.getAll);
mainRoutes.post("/banks", authMiddleware, bankController.create);
mainRoutes.get("/banks/:id", authMiddleware, bankController.getOne);
mainRoutes.put("/banks/:id", authMiddleware, bankController.update);
mainRoutes.delete("/banks/:id", authMiddleware, bankController.destroy);
mainRoutes.delete("/banks", authMiddleware, bankController.destroyMany);

// Currency
mainRoutes.get("/currencies", authMiddleware, currencyController.getAll);
mainRoutes.post("/currencies", authMiddleware, currencyController.create);
mainRoutes.get("/currencies/:id", authMiddleware, currencyController.getOne);
mainRoutes.put("/currencies/:id", authMiddleware, currencyController.update);
mainRoutes.delete("/currencies/:id", authMiddleware, currencyController.destroy);
mainRoutes.delete("/currencies", authMiddleware, currencyController.destroyMany);

// Country
mainRoutes.get("/countries", authMiddleware, countryController.getAll);
mainRoutes.post("/countries", authMiddleware, countryController.create);
mainRoutes.get("/countries/:id", authMiddleware, countryController.getOne);
mainRoutes.put("/countries/:id", authMiddleware, countryController.update);
mainRoutes.delete("/countries/:id", authMiddleware, countryController.destroy);
mainRoutes.delete("/countries", authMiddleware, countryController.destroyMany);

// Province
mainRoutes.get("/provinces", authMiddleware, provinceController.getAll);
mainRoutes.post("/provinces", authMiddleware, provinceController.create);
mainRoutes.get("/provinces/:id", authMiddleware, provinceController.getOne);
mainRoutes.put("/provinces/:id", authMiddleware, provinceController.update);
mainRoutes.delete("/provinces/:id", authMiddleware, provinceController.destroy);
mainRoutes.delete("/provinces", authMiddleware, provinceController.destroyMany);

// City
mainRoutes.get("/cities", authMiddleware, cityController.getAll);
mainRoutes.post("/cities", authMiddleware, cityController.create);
mainRoutes.get("/cities/:id", authMiddleware, cityController.getOne);
mainRoutes.put("/cities/:id", authMiddleware, cityController.update);
mainRoutes.delete("/cities/:id", authMiddleware, cityController.destroy);
mainRoutes.delete("/cities", authMiddleware, cityController.destroyMany);

// District
mainRoutes.get("/districts", authMiddleware, districtController.getAll);
mainRoutes.post("/districts", authMiddleware, districtController.create);
mainRoutes.get("/districts/:id", authMiddleware, districtController.getOne);
mainRoutes.put("/districts/:id", authMiddleware, districtController.update);
mainRoutes.delete("/districts/:id", authMiddleware, districtController.destroy);
mainRoutes.delete("/districts", authMiddleware, districtController.destroyMany);

// Village
mainRoutes.get("/villages", authMiddleware, villageController.getAll);
mainRoutes.post("/villages", authMiddleware, villageController.create);
mainRoutes.get("/villages/:id", authMiddleware, villageController.getOne);
mainRoutes.put("/villages/:id", authMiddleware, villageController.update);
mainRoutes.delete("/villages/:id", authMiddleware, villageController.destroy);
mainRoutes.delete("/villages", authMiddleware, villageController.destroyMany);

// Scheme Tag
mainRoutes.get("/scheme-tags", authMiddleware, schemeTagController.getAll);
mainRoutes.post("/scheme-tags", authMiddleware, schemeTagController.create);
mainRoutes.get("/scheme-tags/:id", authMiddleware, schemeTagController.getOne);
mainRoutes.put("/scheme-tags/:id", authMiddleware, schemeTagController.update);
mainRoutes.delete("/scheme-tags/:id", authMiddleware, schemeTagController.destroy);
mainRoutes.delete("/scheme-tags", authMiddleware, schemeTagController.destroyMany);

// Standard
mainRoutes.get("/standards", authMiddleware, standardController.getAll);
mainRoutes.post("/standards", authMiddleware, standardController.create);
mainRoutes.get("/standards/:id", authMiddleware, standardController.getOne);
mainRoutes.put("/standards/:id", authMiddleware, standardController.update);
mainRoutes.delete("/standards/:id", authMiddleware, standardController.destroy);
mainRoutes.delete("/standards", authMiddleware, standardController.destroyMany);

// Standard Clause
mainRoutes.get("/standard-clauses", authMiddleware, standardClauseController.getAll);
mainRoutes.post("/standard-clauses", authMiddleware, standardClauseController.createMany);
mainRoutes.get("/standard-clauses/:id", authMiddleware, standardClauseController.getOne);
mainRoutes.put("/standard-clauses/:id", authMiddleware, standardClauseController.update);
mainRoutes.delete("/standard-clauses/:id", authMiddleware, standardClauseController.destroy);
mainRoutes.delete("/standard-clauses", authMiddleware, standardClauseController.destroyMany);

// Employment Level
mainRoutes.get("/employment-level", authMiddleware, employmentLevelController.getAll);
mainRoutes.post("/employment-level", authMiddleware, employmentLevelController.create);
mainRoutes.get("/employment-level/:id", authMiddleware, employmentLevelController.getOne);
mainRoutes.put("/employment-level/:id", authMiddleware, employmentLevelController.update);
mainRoutes.delete("/employment-level/:id", authMiddleware, employmentLevelController.destroy);
mainRoutes.delete("/employment-level", authMiddleware, employmentLevelController.destroyMany);

// Contract Category
mainRoutes.get("/contract-categories", authMiddleware, contractCategoryController.getAll);
mainRoutes.post("/contract-categories", authMiddleware, contractCategoryController.create);
mainRoutes.get("/contract-categories/:id", authMiddleware, contractCategoryController.getOne);
mainRoutes.put("/contract-categories/:id", authMiddleware, contractCategoryController.update);
mainRoutes.delete("/contract-categories/:id", authMiddleware, contractCategoryController.destroy);
mainRoutes.delete("/contract-categories", authMiddleware, contractCategoryController.destroyMany);

// Contract Subcategory
mainRoutes.get("/contract-subcategories", authMiddleware, contractSubcategoryController.getAll);
mainRoutes.post("/contract-subcategories", authMiddleware, contractSubcategoryController.create);
mainRoutes.get("/contract-subcategories/:id", authMiddleware, contractSubcategoryController.getOne);
mainRoutes.put("/contract-subcategories/:id", authMiddleware, contractSubcategoryController.update);
mainRoutes.delete("/contract-subcategories/:id", authMiddleware, contractSubcategoryController.destroy);
mainRoutes.delete("/contract-subcategories", authMiddleware, contractSubcategoryController.destroyMany);

// Contract Variant
mainRoutes.get("/contract-variants", authMiddleware, contractVariantController.getAll);
mainRoutes.post("/contract-variants", authMiddleware, contractVariantController.create);
mainRoutes.get("/contract-variants/:id", authMiddleware, contractVariantController.getOne);
mainRoutes.put("/contract-variants/:id", authMiddleware, contractVariantController.update);
mainRoutes.delete("/contract-variants/:id", authMiddleware, contractVariantController.destroy);
mainRoutes.delete("/contract-variants", authMiddleware, contractVariantController.destroyMany);

// BPJS Employment
mainRoutes.get("/bpjs-employment", authMiddleware, bpjsEmploymentController.getAll);
mainRoutes.post("/bpjs-employment", authMiddleware, bpjsEmploymentController.create);
mainRoutes.get("/bpjs-employment/:id", authMiddleware, bpjsEmploymentController.getOne);
mainRoutes.put("/bpjs-employment/:id", authMiddleware, bpjsEmploymentController.update);
mainRoutes.delete("/bpjs-employment/:id", authMiddleware, bpjsEmploymentController.destroy);
mainRoutes.delete("/bpjs-employment", authMiddleware, bpjsEmploymentController.destroyMany);

// Employee Compensation
mainRoutes.get("/employee-compensation", authMiddleware, employeeCompensationController.getAll);
mainRoutes.post("/employee-compensation", authMiddleware, employeeCompensationController.create);
mainRoutes.get("/employee-compensation/:id", authMiddleware, employeeCompensationController.getOne);
mainRoutes.put("/employee-compensation/:id", authMiddleware, employeeCompensationController.update);
mainRoutes.delete("/employee-compensation/:id", authMiddleware, employeeCompensationController.destroy);
mainRoutes.delete("/employee-compensation", authMiddleware, employeeCompensationController.destroyMany);

// Audit Type
mainRoutes.get("/audit-types", authMiddleware, auditTypeController.getAll);
mainRoutes.post("/audit-types", authMiddleware, auditTypeController.create);
mainRoutes.get("/audit-types/:id", authMiddleware, auditTypeController.getOne);
mainRoutes.put("/audit-types/:id", authMiddleware, auditTypeController.update);
mainRoutes.delete("/audit-types/:id", authMiddleware, auditTypeController.destroy);
mainRoutes.delete("/audit-types", authMiddleware, auditTypeController.destroyMany);

// Audit Period
mainRoutes.get("/audit-periods", authMiddleware, auditPeriodController.getAll);
mainRoutes.post("/audit-periods", authMiddleware, auditPeriodController.create);
mainRoutes.get("/audit-periods/:id", authMiddleware, auditPeriodController.getOne);
mainRoutes.put("/audit-periods/:id", authMiddleware, auditPeriodController.update);
mainRoutes.delete("/audit-periods/:id", authMiddleware, auditPeriodController.destroy);
mainRoutes.delete("/audit-periods", authMiddleware, auditPeriodController.destroyMany);

// Audit Role
mainRoutes.get("/audit-roles", authMiddleware, auditRoleController.getAll);
mainRoutes.post("/audit-roles", authMiddleware, auditRoleController.create);
mainRoutes.get("/audit-roles/:id", authMiddleware, auditRoleController.getOne);
mainRoutes.put("/audit-roles/:id", authMiddleware, auditRoleController.update);
mainRoutes.delete("/audit-roles/:id", authMiddleware, auditRoleController.destroy);
mainRoutes.delete("/audit-roles", authMiddleware, auditRoleController.destroyMany);

// Consultant Role
mainRoutes.get("/consultant-roles", authMiddleware, consultantRoleController.getAll);
mainRoutes.post("/consultant-roles", authMiddleware, consultantRoleController.create);
mainRoutes.get("/consultant-roles/:id", authMiddleware, consultantRoleController.getOne);
mainRoutes.put("/consultant-roles/:id", authMiddleware, consultantRoleController.update);
mainRoutes.delete("/consultant-roles/:id", authMiddleware, consultantRoleController.destroy);
mainRoutes.delete("/consultant-roles", authMiddleware, consultantRoleController.destroyMany);

// Legal Entity Type
mainRoutes.get("/legal-entity-types", authMiddleware, legalEntityTypeController.getAll);
mainRoutes.post("/legal-entity-types", authMiddleware, legalEntityTypeController.create);
mainRoutes.get("/legal-entity-types/:id", authMiddleware, legalEntityTypeController.getOne);
mainRoutes.put("/legal-entity-types/:id", authMiddleware, legalEntityTypeController.update);
mainRoutes.delete("/legal-entity-types/:id", authMiddleware, legalEntityTypeController.destroy);
mainRoutes.delete("/legal-entity-types", authMiddleware, legalEntityTypeController.destroyMany);

// IAF Code
mainRoutes.get("/iaf-codes", authMiddleware, iafCodeController.getAll);
mainRoutes.post("/iaf-codes", authMiddleware, iafCodeController.create);
mainRoutes.get("/iaf-codes/:id", authMiddleware, iafCodeController.getOne);
mainRoutes.put("/iaf-codes/:id", authMiddleware, iafCodeController.update);
mainRoutes.delete("/iaf-codes/:id", authMiddleware, iafCodeController.destroy);
mainRoutes.delete("/iaf-codes", authMiddleware, iafCodeController.destroyMany);

// Process Function
mainRoutes.get("/process-functions", authMiddleware, processFunctionController.getAll);
mainRoutes.post("/process-functions", authMiddleware, processFunctionController.create);
mainRoutes.get("/process-functions/:id", authMiddleware, processFunctionController.getOne);
mainRoutes.put("/process-functions/:id", authMiddleware, processFunctionController.update);
mainRoutes.delete("/process-functions/:id", authMiddleware, processFunctionController.destroy);
mainRoutes.delete("/process-functions", authMiddleware, processFunctionController.destroyMany);

// Service
mainRoutes.get("/services", authMiddleware, serviceController.getAll);
mainRoutes.post("/services", authMiddleware, serviceController.create);
mainRoutes.get("/services/:id", authMiddleware, serviceController.getOne);
mainRoutes.put("/services/:id", authMiddleware, serviceController.update);
mainRoutes.delete("/services/:id", authMiddleware, serviceController.destroy);
mainRoutes.delete("/services", authMiddleware, serviceController.destroyMany);

// Consultancy Method
mainRoutes.get("/consultancy-methods", authMiddleware, consultancyMethodController.getAll);
mainRoutes.post("/consultancy-methods", authMiddleware, consultancyMethodController.create);
mainRoutes.get("/consultancy-methods/:id", authMiddleware, consultancyMethodController.getOne);
mainRoutes.put("/consultancy-methods/:id", authMiddleware, consultancyMethodController.update);
mainRoutes.delete("/consultancy-methods/:id", authMiddleware, consultancyMethodController.destroy);
mainRoutes.delete("/consultancy-methods", authMiddleware, consultancyMethodController.destroyMany);

// Training Course
mainRoutes.get("/training-courses", authMiddleware, trainingCourseController.getAll);
mainRoutes.post("/training-courses", authMiddleware, trainingCourseController.create);
mainRoutes.get("/training-courses/:id", authMiddleware, trainingCourseController.getOne);
mainRoutes.put("/training-courses/:id", authMiddleware, trainingCourseController.update);
mainRoutes.delete("/training-courses/:id", authMiddleware, trainingCourseController.destroy);
mainRoutes.delete("/training-courses", authMiddleware, trainingCourseController.destroyMany);

module.exports = mainRoutes;
