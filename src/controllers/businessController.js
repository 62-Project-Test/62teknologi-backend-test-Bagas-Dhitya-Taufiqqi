const Business = require("../models/businessModel");

function addBusiness(req, res) {
  const {
    id,
    alias,
    name,
    image_url,
    is_closed,
    url,
    review_count,
    rating,
    coordinates,
    price,
    location,
    phone,
    display_phone,
    distance,
  } = req.body;

  const businessData = {
    id,
    alias,
    name,
    image_url,
    is_closed,
    url,
    review_count,
    rating,
    coordinates,
    price,
    location,
    phone,
    display_phone,
    distance,
  };

  Business.addBusiness(businessData, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Error adding business :", error });
    }
    res.status(201).json(result);
  });
}

function editBusiness(req, res) {
  const { id } = req.params;
  const { name, category, location } = req.body;

  Business.editBusiness(id, { name, category, location }, (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error updating business :", error });
    }
    res.status(200).json(result);
  });
}

function deleteBusiness(req, res) {
  const { id } = req.params;

  Business.deleteBusiness(id, (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error deleting business :", error });
    }
    res.status(200).json(result);
  });
}

function searchBusiness(req, res) {
  const params = req.query;

  Business.searchBusiness(params, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error searching for businesses :", error });
    }
    res.status(200).json(results);
  });
}

module.exports = {
  addBusiness,
  editBusiness,
  deleteBusiness,
  searchBusiness,
};
