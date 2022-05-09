function throwError(status, message, ctx) {
    ctx.status = status
    ctx.body = message
}

module.exports = {
    throwError
}