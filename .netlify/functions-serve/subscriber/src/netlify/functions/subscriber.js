"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/netlify/functions/subscriber.js
var subscriber_exports = {};
__export(subscriber_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(subscriber_exports);

// node_modules/@netlify/functions/dist/chunk-DMOQOEJ6.mjs
var schedule = (cron, handler2) => handler2;

// node_modules/@netlify/functions/dist/chunk-XSZVKDJB.mjs
var import_stream = require("stream");
var import_util = require("util");
var pipeline = (0, import_util.promisify)(import_stream.pipeline);

// src/netlify/functions/subscriber.js
var handler = schedule("0 1 * * 1,5", async () => {
  console.log("Esto es una funcion programada, para invocarse cada minuto");
  return {
    statusCode: 200
  };
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=subscriber.js.map
