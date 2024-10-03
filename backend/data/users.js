import bcrypt from 'bcryptjs';

const users=[
    {
        name:'Admin User',
        email:'admin@email.com',
/*This means that the password '123456' is being securely hashed using the bcrypt algorithm with a cost factor of 10, which determines the complexity of the hashing
algorithm. This helps to securely store passwords in a hashed format in the database, making it more
difficult for attackers to retrieve the original password. */
        password: bcrypt.hashSync('123456',10),
        isAdmin:true,
    },
    {
        name:'John Doe',
        email:'john@emai.com',
/*This means that the password '123456' is being securely hashed using the bcrypt algorithm with a cost factor of 10, which determines the complexity of the hashing
algorithm. This helps to securely store passwords in a hashed format in the database, making it more
difficult for attackers to retrieve the original password. */
        password: bcrypt.hashSync('123456',10),
        isAdmin:false,
    },
    {
        name:'Jane Doe',
        email:'jane@emai.com',
/*This means that the password '123456' is being securely hashed using the bcrypt algorithm with a cost factor of 10, which determines the complexity of the hashing
algorithm. This helps to securely store passwords in a hashed format in the database, making it more
difficult for attackers to retrieve the original password. */
        password: bcrypt.hashSync('123456',10),
        isAdmin:false,
    },

]


export default users;