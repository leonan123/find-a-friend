import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import type { Environment } from 'vitest/environments'

import { env } from '@/env'
import { prisma } from '@/lib/prisma'

function generateDatabaseURL(schema: string) {
  const url = new URL(env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const randomSchema = randomUUID()

    process.env.DATABASE_URL = generateDatabaseURL(randomSchema)

    execSync('pnpm prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${randomSchema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
