import prisma from '../../../config/Prisma'

class ListClientService {
  async execute() {
    const clients = await prisma.client.findMany()
    return clients
  }
}

export default new ListClientService()
