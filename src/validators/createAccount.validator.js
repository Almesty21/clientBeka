"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup = require("yup");
var createAccountValidator = yup
    .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    phone: yup
        .string()
        .required("Phone is required")
        .test("phone", "Invalid phone format. e.g +251912345678", function (value) {
        return /^\+251(9|7)[0-9]{8}$/.test(value);
    }),
    role: yup.string().required("Role is required"),
})
    .required();
exports.default = createAccountValidator;
