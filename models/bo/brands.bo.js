const BrandDAO = require("../dao/brands.dao");

module.exports.getAll = () => {
  return BrandDAO.getAll();
};

module.exports.getById = (brandId) => {
  return BrandDAO.getById(brandId).then((array) => array[0]);
};

module.exports.create = (brand) => {
  return BrandDAO.create(brand);
};

module.exports.update = (brandId, newBrand) => {
  return BrandDAO.update(brandId, newBrand);
};
