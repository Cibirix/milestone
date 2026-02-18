import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const defaultPaths = ['/', '/services/roofing', '/gallery/images']
const defaultTags = ['sanity']

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  const providedSecret = request.nextUrl.searchParams.get('secret')

  if (!secret || providedSecret !== secret) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
  }

  let body: { paths?: string[]; tags?: string[] } = {}

  try {
    body = (await request.json()) as { paths?: string[]; tags?: string[] }
  } catch {
    // Allow empty body and fallback defaults.
  }

  const paths = (body.paths || defaultPaths).filter(Boolean)
  const tags = (body.tags || defaultTags).filter(Boolean)

  tags.forEach((tag) => revalidateTag(tag))
  paths.forEach((path) => revalidatePath(path))

  return NextResponse.json({
    ok: true,
    revalidated: {
      paths,
      tags,
    },
  })
}
