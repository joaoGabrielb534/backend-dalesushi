import prisma from '../../../config/Prisma'

class ListMessagesService {
  async execute() {
    const messages = await prisma.message.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        client: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    return messages
  }
}

export default new ListMessagesService()
