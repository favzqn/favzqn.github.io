import { generateGardenRSS } from '@/utils/garden-feed'
import type { APIContext } from 'astro'

export const GET = (context: APIContext) => generateGardenRSS(context)
