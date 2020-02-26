// Method POST
// DESC: handle the estimation process
exports.handleEstimation = (req, res, next) => {
  const { price, status, surface, nbRooms, type } = req.body;
  let estimation = surface * price;
  // testing nbRooms cases
  if (nbRooms <= 2) {
    estimation = estimation + estimation * 0.05;
  } else if (nbRooms > 2 && nbRooms < 5) {
    estimation = estimation + estimation * 0.02;
  } else {
    estimation = estimation * 0.99;
  }
  // testing type
  if (type === "appartement") {
    estimation = estimation + estimation * 0.05;
  } else {
    estimation = estimation + estimation * 0.03;
  }
  // testing status
  // NDT: Nécessite des travaux
  // RAN: Refait à neuf
  if (status === "NDT") {
    estimation = estimation * 0.9;
  } else if (status === "RAN") {
    estimation = estimation + estimation * 0.12;
  }

  res.status(200).send({ success: true, data: estimation });
};
