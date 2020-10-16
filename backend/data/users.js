import bcrypt from 'bcryptjs';

const users = [
    {
        name:'Admin 1',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456'),
        isAdmin:true
    },
    {
        name:'User 1',
        email:'user1@example.com',
        password:bcrypt.hashSync('123456')
    },
    {
        name:'user 1',
        email:'user2@example.com',
        password:bcrypt.hashSync('123456')
    }
]

export default users;