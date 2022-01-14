const SvgoLoader = require("../Loaders/SvgoLoader");
const SvgTransformLoader = require("../Loaders/SvgTransformLoader");
const SvgSpriteLoader = require("../Loaders/SvgSpriteLoader");
const path = require("path");
const {dirs} = require("../Settings/Constants");

module.exports = {
    test: /\.svg$/,
    include: [
        path.resolve(dirs.src, 'public/icons')
    ],
    use: [
        SvgSpriteLoader,
        SvgTransformLoader,
        SvgoLoader,
    ]
}
