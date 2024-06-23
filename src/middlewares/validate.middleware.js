export const validationMiddleware = (req, res, next) => {
  const { name, price, imageUrl } = req.body;
  let errors = [];
  if (!name || name.trim() == "") {
    errors.push("Name is required");
  }
  if (!price || parseFloat(price) < 1) {
    errors.push("Price must be a positive value");
  }
  try {
    const validUrl = new URL(imageUrl);
  } catch (error) {
    errors.push("Url is invalid");
  }

  if (errors.length > 0) {
    return res.render("new-product", { errorMessage: errors[0] });
  }

  next();
};