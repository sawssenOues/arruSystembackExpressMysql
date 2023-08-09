


const errorHandler =((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong!')
})


function schema_validation(validator) {
    return (req, res, next) => {
      const { error } = validator.validate(req.body, { abortEarly: true });
      if (error) {
        return res.status(400).json(error.details[0].message);
      }
      next();
    };
  }

  const validateDbId = (paramName) => (req, res, next) => {
    const id = req.params[paramName];
  
    // Regular expression to match unsigned numbers
    const unsignedNumberRegex = /^\d+$/;
  
    if (!unsignedNumberRegex.test(id)) {
      return res.status(400).json({
        error: `Given ID (${id}) for "${paramName}" is not a valid.`,
      });
    }
  
    next();
  };
  
module.exports = {
    errorHandler,
    schema_validation,
    validateDbId
}