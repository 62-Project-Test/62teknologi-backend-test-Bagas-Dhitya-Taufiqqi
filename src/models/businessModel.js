const connection = require("../../dbConfig");

function addBusiness(data, callback) {
  const INSERT_QUERY = `
    INSERT INTO businesses (
      id, alias, name, image_url, is_closed, url, review_count, rating,
      latitude, longitude, price, address1, address2, address3, city,
      zip_code, country, state, phone, display_phone, distance
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const {
    id,
    alias,
    name,
    image_url,
    is_closed,
    url,
    review_count,
    rating,
    price,
    location,
    phone,
    display_phone,
    distance,
  } = data;

  const {
    latitude,
    longitude,
    address1,
    address2,
    address3,
    city,
    zip_code,
    country,
    state,
  } = location;

  connection.query(
    INSERT_QUERY,
    [
      id,
      alias,
      name,
      image_url,
      is_closed,
      url,
      review_count,
      rating,
      latitude,
      longitude,
      price,
      address1,
      address2,
      address3,
      city,
      zip_code,
      country,
      state,
      phone,
      display_phone,
      distance,
    ],
    (error, results, fields) => {
      if (error) {
        console.log("error : ", error);
        return callback(error, null);
      }
      callback(null, { businessId: results.insertId });
    }
  );
}

function editBusiness(id, data, callback) {
  const UPDATE_QUERY = `UPDATE businesses SET name = ?, category = ?, location = ? WHERE id = ?`;
  connection.query(
    UPDATE_QUERY,
    [data.name, data.category, data.location, id],
    (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, { message: "Business updated successfully" });
    }
  );
}

function deleteBusiness(id, callback) {
  const DELETE_QUERY = `DELETE FROM businesses WHERE id = ?`;
  connection.query(DELETE_QUERY, [id], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, { message: "Business deleted successfully" });
  });
}

function searchBusiness(params, callback) {
  const { term, location, coordinates, categories, pagination } = params;

  const { latitude, longitude } = coordinates || {};
  const { limit, offset } = pagination || {};

  let query = `SELECT * FROM businesses WHERE 1=1`;
  const queryParams = [];

  if (term) {
    query += ` AND term = ?`;
    queryParams.push(term);
  }
  if (location) {
    query += ` AND location = ?`;
    queryParams.push(location);
  }
  if (latitude !== undefined && longitude !== undefined) {
    query += ` AND latitude = ? AND longitude = ?`;
    queryParams.push(latitude, longitude);
  }
  if (limit !== undefined && offset !== undefined) {
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);
  }
  if (categories) {
    query += ` AND category IN (?)`;
    queryParams.push(categories.split(","));
  }

  connection.query(query, queryParams, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
}

module.exports = {
  addBusiness,
  editBusiness,
  deleteBusiness,
  searchBusiness,
};
