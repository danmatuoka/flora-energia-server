import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  try {
    const filePath = join(__dirname, 'words_dictionary.json');
    const rawData = readFileSync(filePath, 'utf-8');

    const jsonData = JSON.parse(rawData);

    const keys = Object.keys(jsonData);

    console.log(`Total de chaves: ${keys.length}`);

    const BATCH_SIZE = 1500;
    let batchCount = 0;

    for (let i = 0; i < keys.length; i += BATCH_SIZE) {
      const batch = keys.slice(i, i + BATCH_SIZE).map((key) => ({ word: key }));

      await prisma.word.createMany({
        data: batch,
        skipDuplicates: true,
      });

      batchCount++;
      console.log(`Lote ${batchCount} inserido com sucesso.`);
    }

    console.log('População concluída!');
  } catch (error) {
    console.error('Erro ao popular tabela:', error);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
