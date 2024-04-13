const { body, check } = require("express-validator");

module.exports = {
  isRequired(path) {
    return body(path)
      .exists({ checkNull: true })
      .withMessage(`${path.split('.')[1] ? path.split('.')[1] : path} is required`)
  },
  isString(path) {
    return body(path)
      .isString()
      .withMessage(`data-type of ${path.split('.')[1] ? path.split('.')[1] : path} is invalid, require String.`)
  },
  isNumber(path) {
    return body(path)
      .isNumeric()
      .withMessage(`data-type of ${path.split('.')[1] ? path.split('.')[1] : path} is invalid, require Number.`)
  },
  isBoolean(path) {
    return body(path)
      .isBoolean()
      .withMessage(`data-type of ${path.split('.')[1] ? path.split('.')[1] : path} is invalid, require Boolean.`)
  },
  acceptOnly(path, payload) {
    return check(path).isIn(payload)
      .withMessage(`${path.split('.')[1] ? path.split('.')[1] : path} accepts only ${typeof payload} with ${typeof payload == String || typeof payload == Boolean || typeof payload == Number ? payload : JSON.stringify(payload)} in it.`
      )
  },
  requiredLength(path, minLength, maxLength) {
    return body(path)
      .exists({ checkNull: true })
      .withMessage(`${path} is required`)
      .isLength({ min: minLength })
      .withMessage(`minimum length of ${path} must be ${minLength}`)
      .isLength({ max: maxLength })
      .withMessage(`maximum length of ${path} must be ${maxLength}`)
  }
}