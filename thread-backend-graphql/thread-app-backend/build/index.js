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
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const server_1 = __importDefault(require("./graphql/server"));
const UserService_1 = require("./graphql/services/UserService");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const gqlServer = yield (0, server_1.default)();
        const port = Number(process.env.PORT) || 9000;
        app.use(express_1.default.json());
        app.use('/graphql', (0, express4_1.expressMiddleware)(gqlServer, { context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                // @ts-ignore
                const token = req.headers["token"];
                const user = UserService_1.UserService.decodeJWTToken(token);
                return user;
            }) }));
        app.get('/', (req, res) => {
            res.send("Server is up and running");
        });
        app.listen(port, () => {
            console.log('Listening at port', port);
        });
    });
}
init();
