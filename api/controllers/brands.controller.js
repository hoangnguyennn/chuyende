const BrandBO = require("../../models/bo/brands.bo");
const nanoid = require("../../utils/nanoid");
const logger = require("../../utils/logger");

module.exports.index = async (req, res) => {
  try {
    const brands = await BrandBO.getAll();

    return res.status(200).json({
      data: brands,
      total: brands.length,
      status: true
    });
  } catch (e) {
    logger.error(e);
    return res.status(400).json({
      message: "Have error",
      status: false
    });
  }
};

module.exports.detail = async (req, res) => {
  const { brandId } = req.params;
  try {
    const brand = await BrandBO.getById(brandId);

    if (brand) {
      return res.status(200).json({
        data: brand,
        status: true
      });
    }

    return res.status(400).json({
      message: "Not found",
      status: false
    });
  } catch (e) {
    logger.error(e);
    return res.status(400).json({
      message: "Have error",
      status: false
    });
  }
};

module.exports.create = async (req, res) => {
  const brand = req.body;
  try {
    brand.id = nanoid();
    const result = await BrandBO.create(brand);

    if (result.affectedRows) {
      return res.status(200).json({
        data: brand,
        status: true
      });
    }

    return res.status(400).json({
      status: false
    });
  } catch (e) {
    return res.status(400).json({
      message: "Have error",
      status: false
    });
  }
};

module.exports.update = async (req, res) => {
  const { brandId } = req.params;
  const brand = req.body;

  try {
    brand.id = brandId;
    const result = await BrandBO.update(brandId, brand);

    if (result.affectedRows) {
      return res.status(200).json({
        data: brand,
        status: true
      });
    }

    return res.status(400).json({
      status: false
    });
  } catch (e) {
    logger.error(e);
    return res.status(400).json({
      message: "Have error",
      status: false
    });
  }
};
