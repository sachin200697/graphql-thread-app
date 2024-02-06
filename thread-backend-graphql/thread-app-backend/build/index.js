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
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const gqlServer = new server_1.ApolloServer({
            typeDefs: `
            type User {
                id: ID!,
                name: String,                
            }

            type Query {
                getUser(id: Int): [User]
            }
        `,
            resolvers: {
                Query: {
                    getUser: (_, { id }) => {
                        /*
                        query Thread($id: Int) {
                            getUser(id: $id) {
                                id, name
                            }
                        }
                        */
                        return [{ id: 1, name: 'hello' }, { id: 2, name: 'naman' }].filter(item => item.id === id);
                    }
                }
            }
        });
        const port = Number(process.env.PORT) || 9000;
        yield gqlServer.start();
        app.use(express_1.default.json());
        app.use('/graphql', (0, express4_1.expressMiddleware)(gqlServer));
        app.get('/', (req, res) => {
            res.send("Server is up and running");
        });
        app.listen(port, () => {
            console.log('Listening at port', port);
        });
    });
}
init();
