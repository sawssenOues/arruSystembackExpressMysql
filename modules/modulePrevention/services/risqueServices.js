const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.getAllRisqueBydomaineRelated = async (domaine_id) => {

    const allrisques = await prisma.risque.findMany({ where: { domaine_id: parseInt(domaine_id) } })
    prisma.$disconnect();
    return (allrisques)

}


module.exports.getrisqueById = async (id) => {
    const record = prisma.risque.findUnique({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return record;
}

module.exports.deleterisque = async (id) => {
     // Check if the risque with the given id exists
    const existingRisque = await prisma.risque.findUnique({ where: { id: parseInt(id) } });
    if (!existingRisque) {
        return`Risque with id ${id} not found.`
    }
    const record = await prisma.risque.delete({ where: { id: parseInt(id) } })
    prisma.$disconnect();
    return "deleted successfully.";
}

module.exports.createRisque = async (titre, description, domaine_id) => {
    let rows = await prisma.risque.create({ data: { titre, description, domaine_id , updated_at: null  } });
    prisma.$disconnect();
    return "created successfully.";
};

module.exports.updaterisqueById = async (titre, description, domaine_id, id) => {
    // Check if the risque with the given id exists
    const existingRisque = await prisma.risque.findUnique({ where: { id: parseInt(id) } });
    if (!existingRisque) {
      return`Risque with id ${id} not found.`
    }
  
    // Proceed with the update if the risque exists
    const result = await prisma.risque.update({
      where: { id: parseInt(id) },
      data: { titre, description, domaine_id }
    });
  
    // Disconnect the Prisma Client after the operation is complete
    await prisma.$disconnect();
  
    return 'updated successfully.';
  };

