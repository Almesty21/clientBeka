"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
var validateEmail = function (email) {
    if (!email) {
        return { isValid: false, error: 'Email is required' };
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }
    return { isValid: true };
};
exports.validateEmail = validateEmail;
