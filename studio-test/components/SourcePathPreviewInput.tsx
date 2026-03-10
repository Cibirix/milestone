import type { StringInputProps } from 'sanity'

const DEFAULT_SITE_ORIGIN = 'http://localhost:3000'

function resolvePreviewUrl(value?: string): string | null {
  if (!value?.trim()) return null
  if (/^https?:\/\//i.test(value)) return value
  if (!value.startsWith('/')) return null

  const origin =
    (typeof process !== 'undefined' && process.env.SANITY_STUDIO_SITE_ORIGIN?.trim()) || DEFAULT_SITE_ORIGIN

  return `${origin.replace(/\/$/, '')}${value}`
}

export function SourcePathPreviewInput(props: StringInputProps) {
  const previewUrl = resolvePreviewUrl(typeof props.value === 'string' ? props.value : undefined)

  return (
    <div>
      {props.renderDefault(props)}
      {previewUrl ? (
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              fontSize: 12,
              color: '#6b7280',
              marginBottom: 6,
            }}
          >
            Fallback image preview (from website path)
          </div>
          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#1d4ed8', fontSize: 12, display: 'inline-block', marginBottom: 8 }}
          >
            Open full image
          </a>
          <div
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 10,
              padding: 8,
              background: '#fff',
              maxWidth: 420,
            }}
          >
            <img
              src={previewUrl}
              alt="Fallback product preview"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 6,
                objectFit: 'cover',
                background: '#f3f4f6',
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

