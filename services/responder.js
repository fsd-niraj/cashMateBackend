const { validationResult } = require("express-validator");

class ResponseHandler {
  constructor({ req, res, status, data, message, error }) {
    this.req = req;
    this.res = res;
    this.status = status;
    this.data = data ? data : null;
    this.message = message ? message : "Something went wrong!";
    this.error = error ? error : new Error("INTERNAL_ERR:>");

    let response = this.status ? {
      status: this.status,
      data: this.data,
      message: this.message
    } : {
      status: this.status,
      error: this.error,
      message: this.message
    }
    return this.res.json(response)
  }
}

module.exports = {
  success({ req, res, data, message }) {
    res.status(200)
    return new ResponseHandler({ req, res, status: true, data, message })
  },
  created({ req, res, data, message }) {
    res.status(201)
    return new ResponseHandler({ req, res, status: true, data, message })
  },
  noContent({ req, res }) {
    res.status(204)
    return new ResponseHandler({ req, res })
  },
  noContentWithData({ req, res, data, message }) {
    res.status(200)
    return new ResponseHandler({ req, res, status: true, data: data, message })
  },
  partialContent({ req, res, data, message }) {
    res.status(200)
    return new ResponseHandler({ req, res, status: true, data, message })
  },
  badRequest({ req, res, data, message }) {
    res.status(200)
    return new ResponseHandler({ req, res, status: true, data, message })
  },
  unauthorized({ req, res, data, message }) {
    res.status(401)
    return new ResponseHandler({ req, res, status: true, data, message: message || "Unauthorized." })
  },
  forbidden({ req, res, data, message }) {
    res.status(403)
    return new ResponseHandler({ req, res, status: true, data, message })
  },
  notFound({ req, res, data, message }) {
    res.status(404)
    return new ResponseHandler({ req, res, status: true, data, message })
  },
  notAllowed({ req, res, data, message }) {
    res.status(200)
    return new ResponseHandler({ req, res, status: true, data, message })
  },
  internalServerError({ req, res, error }) {
    res.status(500)
    return new ResponseHandler({ req, res, status: false, message: error ? error.toString() : "Something went wrong." })
  },
  notImplemented({ req, res, data, message }) {
    res.status(200)
    return new ResponseHandler({ req, res, status: true, data, message })
  },
  badGateway({ req, res, data, message }) {
    res.status(200)
    return new ResponseHandler({ req, res, status: true, data, message })
  },
  serviceUnavailable({ req, res, data, message }) {
    res.status(200)
    return new ResponseHandler({ req, res, status: true, data, message })
  },
  serverTimeout({ req, res, data, message }) {
    res.status(200)
    return new ResponseHandler({ req, res, status: true, data, message })
  },

  respondFalseSuccess({ req, res, data, message }) {
    res.status(400)
    return new ResponseHandler({ req, res, status: false, data, message })
  },

  respondCustomErr({ req, res, data, message }) {
    res.status(400)
    return new ResponseHandler({ req, res, status: false, data, message })
  },

  respondValidationErr({ req, res, error }) {
    res.status(400)
    return new ResponseHandler({ req, res, status: false, undefined, message: 'Validation Failed', error })
  },

  respondUnauthorised({ req, res, message = 'Unauthorised' }) {
    res.status(401)
    return new ResponseHandler(req, res, false, message)
  },

  respondNotFound({ req, res, message = 'Data not found' }) {
    res.status(404)
    return new ResponseHandler({ req, res, status: false, message, data })
  },
  alreadyExist({ req, res, message }) {
    res.status(409)
    return new ResponseHandler({ req, res, status: false, message, error: "Resource Already Exist" })
  },

  formatter({ msg }) {
    return msg
  },

  validate(req, res, next) {
    const errors = validationResult(req).formatWith(this.formatter)
    if (!errors.isEmpty()) {
      return this.respondValidationErr(req, res, errors.mapped())
    }
    next()
  }
}