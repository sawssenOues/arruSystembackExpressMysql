const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.getAlldomaines = async () => {

    const alldomaines = await prisma.domaine.findMany()
    prisma.$disconnect();
    return (alldomaines)

}


module.exports.getDomaineById = async (id) => {
    const record = prisma.domaine.findUnique({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return record;
}

module.exports.deleteDomaine = async (id) => {
    const record = await prisma.domaine.delete({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return record;
}

module.exports.createDomaine = async (titre, description) => {
    let rows = await prisma.domaine.create({ data: { titre, description , updated_at: null } });
    prisma.$disconnect();
    return rows;
};

module.exports.updateDomaineById = async (id, titre, description) => {
    const result = prisma.domaine.update({ where: { id: parseInt(id) }, data: { titre, description } })
    prisma.$disconnect();
    return result;
};

