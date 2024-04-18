import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const user = await prisma.usuarios.create( { data: {email: "sammy@sammy.samy", password: "alanquetuhace",role: "USER",name:"Alan"}})
}

(async ()=> { await main()})()