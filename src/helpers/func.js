const model = require("../models/index");
const modelAdministrative = require("../models/administrative/index");
const { ResponseError } = require("../errors/response-error");
const jwt = require("jsonwebtoken");
const { Op, where } = require("sequelize");
const CryptoJS = require("crypto-js");
require("dotenv");

const {
  JWT_ISSUER = "AxiaVibes",
  JWT_SECRET = "AxiaVibes54312",
  JWT_REFRESH_SECRET = "AxiaVibes54312rEFresh",
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} = process.env;

function generateToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: JWT_ISSUER,
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
    issuer: JWT_ISSUER,
  });
}

async function verifyToken(token) {
  const invalidToken = await modelAdministrative.InvalidToken.findOne({
    where: { token },
  });

  if (invalidToken)
    return next(new ResponseError(401, "Token has been invalidated"));

  return jwt.verify(token, JWT_SECRET, {
    issuer: JWT_ISSUER,
  });
}

function verifyRefreshToken(token) {
  if (!token) return next(new ResponseError(401, "Unauthenticated"));
  return jwt.verify(token, JWT_REFRESH_SECRET, { issuer: JWT_ISSUER });
}

function pagination(data, page, limit) {
  const { count: totalItems, rows: datas } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems,
    data: datas,
    totalPages,
    currentPage,
  };
}

function paginationData(query) {
  let { page, size, sortBy, orderby, search } = query;
  sortBy = sortBy ?? "createdAt";
  orderby = orderby ?? "desc";
  search = search ?? "";
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;

  return {
    ...query,
    limit,
    offset,
    orderby,
    sortBy,
    search,
  };
}

function generateSlug(val) {
  return val
    .toLowerCase()
    .trim()
    .replace(/--+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-");
}

function searchData(fields, search) {
  if (!Array.isArray(fields)) fields = [];
  const result = {
    [Op.or]: fields.map((item) => ({
      [item]: {
        [Op.iLike]: `%${search}%`,
      },
    })),
  };

  return result;
}

async function getIdModel(modelName) {
  const result = await model[modelName].findOne({
    order: [["id", "DESC"]],
  });

  return result?.id ? parseInt(result.id) + 1 : 1;
}

function encryptData(data) {
  const stringData = typeof data === "string" ? data : JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringData, process.env.JWT_SECRET).toString();
}

function decryptData(encryptedData) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.JWT_SECRET);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString); // otomatis parse JSON
  } catch (error) {
    console.error("Failed to decrypt data:", error.message);
    return null;
  }
}

function checkStatus(statuses, status, key = null) {
  if (!statuses.includes(status))
    throw new Error(
      `${key || "Status"} must be one of: ${statuses.join(", ")}`
    );
}

async function generateContractVariantCode(contractSubcategoryId) {
  const lastVariant = await model.ContractVariant.findOne({
    where: { contractSubcategoryId },
    order: [["code", "DESC"]],
  });

  return lastVariant ? parseInt(lastVariant.code) + 1 : 1;
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  pagination,
  paginationData,
  generateSlug,
  searchData,
  getIdModel,
  encryptData,
  decryptData,
  checkStatus,
  generateContractVariantCode,
};
