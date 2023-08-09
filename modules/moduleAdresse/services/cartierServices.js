const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.getAllcartierBycommuneRelated = async (commune_id) => {

    const allcartiers = await prisma.cartier.findMany({ where: { commune_id: parseInt(commune_id) } })
    prisma.$disconnect();
    return (allcartiers)

}


module.exports.getcartierById = async (id) => {
    const record = prisma.cartier.findUnique({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return record;
}

module.exports.deletecartier = async (id) => {
     // Check if the cartier with the given id exists
    const existingcartier = await prisma.cartier.findUnique({ where: { id: parseInt(id) } });
    if (!existingcartier) {
        return`cartier with id ${id} not found.`
    }
    const record = await prisma.cartier.delete({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return "deleted successfully.";
}

module.exports.createcartier = async (nom, commune_id) => {
    let rows = await prisma.cartier.create({ data: { nom, commune_id, updated_at: null  } });
    prisma.$disconnect();
    return "created successfully.";
};

module.exports.updatecartierById = async (nom, commune_id, id) => {
    // Check if the cartier with the given id exists
    const existingcartier = await prisma.cartier.findUnique({ where: { id: parseInt(id) } });
    if (!existingcartier) {
      return`cartier with id ${id} not found.`
    }
  
    // Proceed with the update if the cartier exists
    const result = await prisma.cartier.update({
      where: { id: parseInt(id) },
      data: { nom, commune_id }
    });
  
    // Disconnect the Prisma Client after the operation is complete
    await prisma.$disconnect();
  
    return 'updated successfully.';
  };

