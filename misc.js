function verifyShape(obj, keys) {
  let out = true;
  keys.forEach(key => {
    if (!obj[key]) out = false;
  });

  return out;
}

function verifyItemShape(item) {
  return verifyShape(item, ["type", "color", "size", "stock"]);
}

module.exports = {
  verifyItemShape
};
