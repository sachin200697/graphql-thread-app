"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const UserService_1 = require("../services/UserService");
const queries = {
    getUserToken: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield UserService_1.UserService.getUserToken(payload);
        return token;
    }),
    getCurrentUser: (_, params, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(context.id);
        if (context.id) {
            const user = yield UserService_1.UserService.getCurrentUser(context.id);
            return user;
        }
        throw new Error('User does not exist or invalid token');
    })
};
const mutations = {
    createUser: (_, { firstName, lastName, email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield UserService_1.UserService.createUser({
            firstName,
            lastName,
            email,
            password,
        });
        return res.id;
    }),
};
exports.resolvers = { queries, mutations };
