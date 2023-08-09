const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.getAllcommuneBygouvernoratRelated = async (gouvernorat_id) => {

    const allcommunes = await prisma.commune.findMany({ where: { gouvernorat_id: parseInt(gouvernorat_id) } })
    prisma.$disconnect();
    return (allcommunes)

}


module.exports.getcommuneById = async (id) => {
    const record = prisma.commune.findUnique({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return record;
}

module.exports.deletecommune = async (id) => {
     // Check if the commune with the given id exists
    const existingcommune = await prisma.commune.findUnique({ where: { id: parseInt(id) } });
    if (!existingcommune) {
        return`commune with id ${id} not found.`
    }
    const record = await prisma.commune.delete({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return "deleted successfully.";
}

module.exports.createcommune = async (nom, gouvernorat_id) => {
    let rows = await prisma.commune.create({ data: { nom, gouvernorat_id, updated_at: null  } });
    prisma.$disconnect();
    return "created successfully.";
};

module.exports.updatecommuneById = async (nom, gouvernorat_id, id) => {
    // Check if the commune with the given id exists
    const existingcommune = await prisma.commune.findUnique({ where: { id: parseInt(id) } });
    if (!existingcommune) {
      return`commune with id ${id} not found.`
    }
  
    // Proceed with the update if the commune exists
    const result = await prisma.commune.update({
      where: { id: parseInt(id) },
      data: { nom, gouvernorat_id }
    });
  
    // Disconnect the Prisma Client after the operation is complete
    await prisma.$disconnect();
  
    return 'updated successfully.';
  };

