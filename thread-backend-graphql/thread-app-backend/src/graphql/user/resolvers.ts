import { UserService } from "../services/UserService";
const queries = {  
  getUserToken: async (_: any, payload: {email: string, password: string}) => {
    const token = await UserService.getUserToken(payload);
    return token;
  },
  getCurrentUser: async (_:any, params:any, context: any) => {
    console.log(context.id);
    
    if(context.id) {
        const user = await UserService.getCurrentUser(context.id);
        return user;
        
    }    
    throw new Error('User does not exist or invalid token');
  }
};


const mutations = {
  createUser: async (
    _: any,
    {
      firstName,
      lastName,
      email,
      password,
    }: { firstName: string; lastName: string; email: string; password: string }
  ) => {
    const res = await UserService.createUser({
      firstName,
      lastName,
      email,
      password,
    });

    return res.id;
  },
};

export const resolvers = { queries, mutations };
