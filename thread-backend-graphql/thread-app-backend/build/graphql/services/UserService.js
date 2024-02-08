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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const db_1 = __importDefault(require("../../lib/db"));
const JWT_SECRET = 'abcdef';
class UserService {
    static generateHash(salt, password) {
        const hashPassword = (0, crypto_1.createHmac)('sha256', salt).update(password).digest('hex');
        return hashPassword;
    }
    static createUser(payload) {
        const { firstName, lastName, email, password } = payload;
        const salt = (0, crypto_1.randomBytes)(32).toString('hex');
        const hashPassword = this.generateHash(salt, password);
        const response = db_1.default.user.create({
            data: {
                firstName, lastName, email, password: hashPassword, salt
            }
        });
        return response;
    }
    static getUserByEmail(email) {
        return db_1.default.user.findUnique({ where: { email } });
    }
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield this.getUserByEmail(email);
            if (!user) {
                throw new Error('User does not exists');
            }
            const hashPassword = this.generateHash(user.salt, password);
            if (user.password !== hashPassword) {
                throw new Error('Password is incorrect');
            }
            //generating token
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET);
            return token;
        });
    }
    static decodeJWTToken(token) {
        try {
            const user = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            return user;
        }
        catch (err) {
            // err
            console.log(err);
            return {};
            // inside headers we need to pass toke just like below without single or double quotes
            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyNDk1MWE2LWVjZjEtNGVlOC1hYjM1LWYyYjg1NDg2Y2ZhZSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTcwNzIyNTU4Nn0.aYhs5yUtiHSVQZBVDuZVnY8pBL263zAUUy0uPq7epQs
        }
    }
    static getCurrentUser(id) {
        return db_1.default.user.findUnique({ where: { id } });
    }
}
exports.UserService = UserService;
