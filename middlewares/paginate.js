const mongoose = require("mongoose");
const Responder = require('../services/responder')

module.exports = function pagination(model) {
  return async (req, res, next) => {
    try {
      // const dynamicModel = mongoose.model(model, mongoose.Schema({}, { strict: false }));
      const { search } = req.body,
        { limit, sort } = req.query,
        page = parseInt(req.query.page) || 1,
        pageLimit = Math.ceil(parseInt(limit)) || 50,
        perPage = Math.ceil(parseInt(page)) || 1,
        skip = pageLimit * perPage - pageLimit,
        totalEntries = await model.find({}).countDocuments(),
        totalPages = Math.ceil(totalEntries / pageLimit);

      if (totalEntries == 0) return Responder.noContent({ req, res, message: "No entries to show" })
      if (perPage > totalPages) return Responder.noContent({ req, res, message: `Page number exceeds maximum pages, Max: ${totalPages}` })

      const sortQuery = sort ? sort : {},
        searchRegex = search ? { name: new RegExp(search, "i\g") } : {},
        paginatedResult = await model
          .find(searchRegex)
          .skip(skip)
          .limit(pageLimit)
          .sort(sortQuery)
        ;
      const dataToSend = {
        totalEntries: totalEntries,
        totalPages: totalPages,
        data: paginatedResult
      }
      Responder.success({ req: req, res: res, data: dataToSend, message: `${model.modelName} list fetched successfully.` })
      return next();
    } catch (error) {
      return Responder.internalServerError({ req, res, error });
    }
  }
}