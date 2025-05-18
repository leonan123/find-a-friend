import { app } from '@/app'

import { env } from './env'

app.listen({ port: env.PORT }, () =>
  console.log('🚀 server is running on http://localhost:3333'),
)
