const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.getAllusers = async () => {

    const allusers = await prisma.user.findMany()
    prisma.$disconnect();
    return (allusers)

}


module.exports.getuserById = async (id) => {
    const record = prisma.user.findUnique({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return record;
}

module.exports.deleteuser = async (id) => {
    const record = await prisma.user.delete({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return record;
}

module.exports.createuser = async (nom,prenom,date_naiss,email,image) => {
    let rows = await prisma.user.create({ data: { nom,prenom,date_naiss,email,image, updated_at: null } });
    prisma.$disconnect();
    return rows;
};

module.exports.updateuserById = async (id, updateData) => {
    const result = prisma.user.update({ where: { id: parseInt(id) }, data: updateData });
    prisma.$disconnect();
    return result;
};





