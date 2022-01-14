const path = require("path");
const {dirs} = require("../Settings/Constants");
module.exports = {
    test: /\.(png|jpe?g|gif|ico|mp4|svg)(\?.*)?$/,
    include: [
        path.resolve(dirs.src, 'public/images'),
        path.resolve(dirs.src, 'public/video')
    ],
    type: 'asset/resource'
}