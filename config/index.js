const dev = process.env.NODE_ENV !== 'production';

export const API_BASE_URL = dev ? 'http://localhost:3000' : 'https://linkedin-clone-git-main-kuldeep345.vercel.app/:';