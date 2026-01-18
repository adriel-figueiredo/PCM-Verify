import { env } from "#env";
const DATABASE_URL = env.DATABASE_URL;
const DATABASE_KEY = env.DATABASE_KEY;

interface DoingVerify {
    code: string;
    timestamp: number;
}

export const databaseGet = async (path:string): Promise<any> => {
    const response = await fetch(`${DATABASE_URL}/${path}.json?auth=${DATABASE_KEY}`);
    const data = response ? await response.json() : false;
    return data ? data : false;
};

export const databaseSet = async (path:string, value: unknown, chooseMethod?: string) => {
    const method = chooseMethod ? chooseMethod : "PATCH"

    await fetch(`${DATABASE_URL}/${path}.json?auth=${DATABASE_KEY}`, {
        method: method,
        body: JSON.stringify(value)
    });
}

export const codeGenerate = async (parentVerify:string): Promise<string> => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let codeExists = true;
    let code = '';
    
    while (codeExists) {
        code = '';
        for (let i = 0; i < 9; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        codeExists = await databaseGet(`${parentVerify}/${code}`);
    }
    
    return code;
};

export { DoingVerify };