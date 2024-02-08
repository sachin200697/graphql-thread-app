import JWT from "jsonwebtoken";
import { createHmac, randomBytes } from "crypto";
import prismaClient from "../../lib/db";


export interface CreateUserPayload {
    firstName: string, 
    lastName: string,
    email: string,
    password: string
}

export interface GetUserTokenPayload {
    email: string, 
    password: string
}

const JWT_SECRET = 'abcdef';

export class UserService {
    private static generateHash(salt: string, password: string) {
        const hashPassword = createHmac('sha256', salt).update(password).digest('hex');
        return hashPassword;
    }

    public static createUser(payload: CreateUserPayload) {
        const {firstName, lastName, email, password} = payload;
        const salt = randomBytes(32).toString('hex');
        const hashPassword = this.generateHash(salt, password);
        const response = prismaClient.user.create({
            data: {
                firstName, lastName, email, password: hashPassword, salt
            }
        });
        return response;
    }    

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({where:{email}});
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const {email, password} = payload;        

        const user = await this.getUserByEmail(email);

        if(!user) {
            throw new Error('User does not exists');
        }        

        const hashPassword = this.generateHash(user.salt, password);
    
        if(user.password !== hashPassword) {
            throw new Error('Password is incorrect');
        }

        //generating token
        const token = JWT.sign({id: user.id, email: user.email}, JWT_SECRET);
        return token;
    }

    public static decodeJWTToken(token: string) {
        try {
            const user = JWT.verify(token, JWT_SECRET);            
            return user;
          } catch(err) {
            // err
            console.log(err);
            return {};
            
            // inside headers we need to pass toke just like below without single or double quotes
            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyNDk1MWE2LWVjZjEtNGVlOC1hYjM1LWYyYjg1NDg2Y2ZhZSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTcwNzIyNTU4Nn0.aYhs5yUtiHSVQZBVDuZVnY8pBL263zAUUy0uPq7epQs
          }                                
    }

    public static getCurrentUser(id: string){
        return prismaClient.user.findUnique({where: {id}});
    }
}
