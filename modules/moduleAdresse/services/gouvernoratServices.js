const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.getAllgouvernorats = async () => {

    const allgouvernorats = await prisma.gouvernorat.findMany()
    prisma.$disconnect();
    return (allgouvernorats)

}


module.exports.getgouvernoratById = async (id) => {
    const record = prisma.gouvernorat.findUnique({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return record;
}



