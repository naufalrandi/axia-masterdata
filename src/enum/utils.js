const HIERARCHY = Object.freeze({
  EXECUTIVE: "Executive",
  DIRECTORATE: "Directorate",
  DIVISION: "Division",
  DEPARTMENT: "Department",
  UNIT: "Unit",
});

const asArray = (obj) => Object.keys(obj).map((key) => obj[key]);

module.exports = {
  HIERARCHY,
  asArray,
};
