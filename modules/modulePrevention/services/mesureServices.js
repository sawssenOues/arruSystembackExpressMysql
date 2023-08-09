const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.getAllMesuresByrisqueRelated = async (risque_id) => {

    const allmesures = await prisma.mesure.findMany({ where: { risque_id: parseInt(risque_id) } })
    prisma.$disconnect();
    return (allmesures)

}


module.exports.getmesureById = async (id) => {
    const record = prisma.mesure.findUnique({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return record;
}

module.exports.deletemesure = async (id) => {
    // Check if the Mesure with the given id exists
    const existingMesure = await prisma.mesure.findUnique({ where: { id: parseInt(id) } });
    if (!existingMesure) {
      return`Mesure with id ${id} not found.`
    }
    const record = await prisma.mesure.delete({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return "deleted successfully.";
}

module.exports.createMesure = async (titre, description, risque_id) => {
    let rows = await prisma.mesure.create({ data: { titre, description, risque_id, updated_at: null  } });
    prisma.$disconnect();
    return "created successfully.";
};

module.exports.updatemesureById = async (titre, description, risque_id, id) => {
    // Check if the Mesure with the given id exists
    const existingMesure = await prisma.mesure.findUnique({ where: { id: parseInt(id) } });
    if (!existingMesure) {
      return`Mesure with id ${id} not found.`
    }
  
    // Proceed with the update if the risque exists
    const result = await prisma.mesure.update({
      where: { id: parseInt(id) },
      data: { titre, description, risque_id }
    });
  
    // Disconnect the Prisma Client after the operation is complete
    await prisma.$disconnect();
  
    return 'updated successfully.';
  };

