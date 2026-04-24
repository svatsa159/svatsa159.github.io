import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
} from 'react'
import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext'

type Split = 'line' | 'word' | 'char'

export type PretextTextProps = {
  as?: ElementType
  text: string
  split?: Split
  preserveBreaks?: boolean
  lineClassName?: string
  wordClassName?: string
  charClassName?: string
  safetyFactor?: number
} & Omit<HTMLAttributes<HTMLElement>, 'children'>

export type PretextTextHandle = {
  root: HTMLElement | null
}

const inlineBlockRule: CSSProperties = {
  display: 'inline-block',
  willChange: 'transform, opacity, filter',
}

const lineWrapRule: CSSProperties = {
  display: 'block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}

const lineInnerRule: CSSProperties = {
  display: 'inline-block',
  whiteSpace: 'nowrap',
  willChange: 'transform, opacity, filter',
}

function computeFontString(el: Element): string {
  const cs = window.getComputedStyle(el)
  if (cs.font && cs.font.trim().length > 0) return cs.font
  const family = cs.fontFamily || 'sans-serif'
  const weight = cs.fontWeight || '400'
  const style = cs.fontStyle || 'normal'
  const size = cs.fontSize || '16px'
  return `${style} ${weight} ${size} ${family}`
}

function computeLineHeight(el: Element): number {
  const cs = window.getComputedStyle(el)
  const lh = parseFloat(cs.lineHeight)
  if (!Number.isNaN(lh)) return lh
  const fs = parseFloat(cs.fontSize) || 16
  return fs * 1.2
}

export const PretextText = forwardRef<PretextTextHandle, PretextTextProps>(function PretextText(
  props,
  ref,
) {
  const {
    as,
    text,
    split = 'word',
    preserveBreaks = false,
    lineClassName,
    wordClassName,
    charClassName,
    safetyFactor = 0.92,
    ...rest
  } = props
  const Tag = (as ?? 'span') as ElementType
  const rootRef = useRef<HTMLElement | null>(null)
  const [lines, setLines] = useState<string[]>(() =>
    preserveBreaks ? text.split('\n') : [text],
  )

  useImperativeHandle(ref, () => ({ root: rootRef.current }))

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return

    let cancelled = false

    const recompute = () => {
      if (cancelled || !rootRef.current) return
      const measured = el.clientWidth
      if (!measured) return

      const font = computeFontString(el)
      const lineHeight = computeLineHeight(el)
      const maxWidth = Math.max(40, measured * safetyFactor)

      try {
        const prepared = prepareWithSegments(
          text,
          font,
          preserveBreaks ? { whiteSpace: 'pre-wrap' } : undefined,
        )
        const result = layoutWithLines(prepared, maxWidth, lineHeight)
        const next = result.lines.length > 0 ? result.lines.map((l) => l.text) : [text]

        setLines((prev) => {
          if (prev.length === next.length && prev.every((p, i) => p === next[i])) return prev
          return next
        })
      } catch {
        setLines((prev) => (prev.length === 1 && prev[0] === text ? prev : [text]))
      }
    }

    recompute()

    const ro = new ResizeObserver(recompute)
    ro.observe(el)

    type FontsApi = {
      ready?: Promise<unknown>
      load?: (font: string) => Promise<unknown>
    }
    const fontsApi = (document as Document & { fonts?: FontsApi }).fonts
    if (fontsApi?.ready && typeof fontsApi.ready.then === 'function') {
      fontsApi.ready.then(() => recompute()).catch(() => {})
    }
    if (fontsApi?.load) {
      try {
        const probeFont = computeFontString(el)
        fontsApi.load(probeFont).then(() => recompute()).catch(() => {})
      } catch {}
    }

    return () => {
      cancelled = true
      ro.disconnect()
    }
  }, [text, preserveBreaks, safetyFactor])

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        rootRef.current = node
      }}
      data-pretext-root=""
      {...rest}
    >
      {lines.map((lineText, lineIndex) => (
        <span
          key={`line-${lineIndex}`}
          className={lineClassName}
          data-pretext-line=""
          style={lineWrapRule}
        >
          <span data-pretext-line-inner="" style={lineInnerRule}>
            {split === 'line'
              ? lineText
              : lineText.split(/(\s+)/).map((segment, si) => {
                  if (segment.length === 0) return null
                  if (/^\s+$/.test(segment)) {
                    return (
                      <span key={`s-${si}`} aria-hidden="true">
                        {segment}
                      </span>
                    )
                  }
                  if (split === 'char') {
                    return (
                      <span
                        key={`w-${si}`}
                        data-pretext-word=""
                        className={wordClassName}
                        style={inlineBlockRule}
                      >
                        {Array.from(segment).map((ch, ci) => (
                          <span
                            key={ci}
                            data-pretext-char=""
                            className={charClassName}
                            style={inlineBlockRule}
                          >
                            {ch}
                          </span>
                        ))}
                      </span>
                    )
                  }
                  return (
                    <span
                      key={`w-${si}`}
                      data-pretext-word=""
                      className={wordClassName}
                      style={inlineBlockRule}
                    >
                      {segment}
                    </span>
                  )
                })}
          </span>
        </span>
      ))}
    </Tag>
  )
})

export default PretextText
