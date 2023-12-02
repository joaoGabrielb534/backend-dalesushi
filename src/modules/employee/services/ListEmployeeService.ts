import prisma from '../../../config/Prisma'

class ListEmployeeService {
  async execute() {
    const employees = await prisma.employee.findMany()
    return employees
  }
}

export default new ListEmployeeService()
