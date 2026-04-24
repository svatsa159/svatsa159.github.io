import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'

type Props = {
  as?: ElementType
  text: string
  wordClassName?: string
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'children'>

const wordStyle: CSSProperties = {
  display: 'inline-block',
  willChange: 'transform, opacity, filter',
}

export default function SplitWords({ as, text, wordClassName, ...rest }: Props) {
  const Tag = (as ?? 'span') as ElementType
  const segments = text.split(/(\s+)/)

  return (
    <Tag {...rest}>
      {segments.map((segment, i) => {
        if (segment.length === 0) return null
        if (/^\s+$/.test(segment)) {
          return (
            <span key={`s-${i}`} aria-hidden="true">
              {segment}
            </span>
          )
        }
        return (
          <span
            key={`w-${i}`}
            data-split-word=""
            className={wordClassName}
            style={wordStyle}
          >
            {segment}
          </span>
        )
      })}
    </Tag>
  )
}
