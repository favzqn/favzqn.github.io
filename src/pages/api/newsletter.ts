export const prerender = false

import type { APIContext } from 'astro'

export async function POST(context: APIContext) {
  const apiKey = import.meta.env.BUTTONDOWN_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Newsletter not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  let email: string
  try {
    const body = await context.request.json()
    email = body.email?.trim()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const res = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })

  if (res.status === 201) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (res.status === 400) {
    const data = await res.json().catch(() => ({}))
    const message = (data as Record<string, string[]>).email?.[0] ?? 'Invalid email'
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (res.status === 409) {
    return new Response(JSON.stringify({ error: 'Already subscribed' }), {
      status: 409,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ error: 'Subscription failed, please try again' }), {
    status: 502,
    headers: { 'Content-Type': 'application/json' }
  })
}
