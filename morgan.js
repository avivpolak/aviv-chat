const morgan = require("morgan");

exports.morganBodyLogger = morgan(function (tokens, req, res, next) {
    morgan.token("body", function (req, res) {
        return JSON.stringify(req.body);
    });
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        tokens.body(req, res),
    ].join(" ");
});

//add here any logger function you want
