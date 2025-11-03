"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup = require("yup");
var loginValidator = yup
    .object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
})
    .required();
exports.default = loginValidator;
