/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 389:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const https = __nccwpck_require__(211);
const core = __nccwpck_require__(389);

try {
    const organization = core.getInput('organization-key');
    const project = core.getInput('project-key');
    const path = `/api/project_analyses/search?organization=${organization}&project=${project}&catagory=QUALITY_GATE`;
    const defaultHostname = 'sonarcloud.io';
    const defaultPort = 443;

    let hostname = core.getInput('hostname', { required: false });
    let port = core.getInput('port', { required: false });
    if (hostname.length === 0) hostname = defaultHostname;
    if (port.length === 0) port = defaultPort;
    const requestInfo = {
        hostname: hostname,
        port: port,
        path: path,
        method: 'GET'
    }
    let body = []
    const req = https.request(requestInfo, res => {
        res.on('data', d => {
            body.push(d)
        }).on('end', () => {
            requestBody = Buffer.concat(body).toString()
            let sonar = JSON.parse(requestBody);
            let element = findNewGateStatus(sonar);
            let gateway = element.events.find((e) => e.category == 'QUALITY_GATE');
            console.log(gateway);
            //console.log(`description: ${gateway.description}`);
            console.log(`status = ${status}`);
            if (status.toLocaleLowerCase() === "red") {
                core.setFailed("Not pass sonar gateway");
            }
        })
    })

    req.on('error', error => {
        console.error(error);
        core.setFailed(error.message);
    })
    req.end()

} catch (error) {
    core.setFailed(error.message);
}

function findNewGateStatus(json) {
    var tempTime = 0;
    var result;
    json.analyses.forEach(element => {
        var time = new Date(element.date).getTime();
        if (time > tempTime) {
            result = element;
            tempTime = time;
        }
    });
    return result;
}
})();

module.exports = __webpack_exports__;
/******/ })()
;