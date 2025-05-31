import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/bite-sized-trading',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
};

export default config;