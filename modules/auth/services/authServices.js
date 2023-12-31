const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



module.exports.createAdmin = async (nom, email, password) => {
    let rows = await prisma.admin.create({ data: { nom, email, password, updated_at: null } });
    prisma.$disconnect();
    return rows;
};

module.exports.getadminbyemail = async (email) => {
    const record = prisma.admin.findUnique({ where: { email } })
    prisma.$disconnect();
    return record;
}
