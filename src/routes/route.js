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
const employmentLevelController = require("../controllers/employment-level-controller");
const contractCategoryController = require("../controllers/contract-category-controller");
const contractSubcategoryController = require("../controllers/contract-subcategory-controller");
const contractVariantController = require("../controllers/contract-variant-controller");
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
mainRoutes.get("/countries/:slug", authMiddleware, countryController.getOne);
mainRoutes.put("/countries/:slug", authMiddleware, countryController.update);
mainRoutes.delete("/countries/:slug", authMiddleware, countryController.destroy);
mainRoutes.delete("/countries", authMiddleware, countryController.destroyMany);

// Province
mainRoutes.get("/provinces", authMiddleware, provinceController.getAll);
mainRoutes.post("/provinces", authMiddleware, provinceController.create);
mainRoutes.get("/provinces/:slug", authMiddleware, provinceController.getOne);
mainRoutes.put("/provinces/:slug", authMiddleware, provinceController.update);
mainRoutes.delete("/provinces/:slug", authMiddleware, provinceController.destroy);
mainRoutes.delete("/provinces", authMiddleware, provinceController.destroyMany);

// City
mainRoutes.get("/cities", authMiddleware, cityController.getAll);
mainRoutes.post("/cities", authMiddleware, cityController.create);
mainRoutes.get("/cities/:slug", authMiddleware, cityController.getOne);
mainRoutes.put("/cities/:slug", authMiddleware, cityController.update);
mainRoutes.delete("/cities/:slug", authMiddleware, cityController.destroy);
mainRoutes.delete("/cities", authMiddleware, cityController.destroyMany);

// District
mainRoutes.get("/districts", authMiddleware, districtController.getAll);
mainRoutes.post("/districts", authMiddleware, districtController.create);
mainRoutes.get("/districts/:slug", authMiddleware, districtController.getOne);
mainRoutes.put("/districts/:slug", authMiddleware, districtController.update);
mainRoutes.delete("/districts/:slug", authMiddleware, districtController.destroy);
mainRoutes.delete("/districts", authMiddleware, districtController.destroyMany);

// Village
mainRoutes.get("/villages", authMiddleware, villageController.getAll);
mainRoutes.post("/villages", authMiddleware, villageController.create);
mainRoutes.get("/villages/:slug", authMiddleware, villageController.getOne);
mainRoutes.put("/villages/:slug", authMiddleware, villageController.update);
mainRoutes.delete("/villages/:slug", authMiddleware, villageController.destroy);
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

module.exports = mainRoutes;
