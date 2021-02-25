import dotenv from 'dotenv';

dotenv.config();

const API_LOGIN = process.env.API_LOGIN || 'https://api.getcountapp.com/api/v1/authenticate'

const API = {
    login: API_LOGIN
}

const config = {
    api: API
};

export default config;