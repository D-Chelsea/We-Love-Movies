const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundry")

async function list(request, response) {
    const theaters = await service.list()
    response.json({ data: theaters })
}

module.exports = {
    list: [asyncErrorBoundary(list)]
}