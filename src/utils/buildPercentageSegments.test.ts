import { describe, expect, it } from 'vitest'

import { buildPercentageSegments } from './buildPercentageSegments'

describe('buildPercentageSegments', () => {
  it('preserves valid widths and creates cumulative positions', () => {
    expect(buildPercentageSegments([78.0850707, 9.19, 12.7249293])).toEqual([
      { x: 0, width: 78.0850707 },
      { x: 78.0850707, width: 9.19 },
      { x: 87.2750707, width: 12.7249293 },
    ])
  })

  it('keeps zero-width and floating-point edge segments within the view box', () => {
    const geometry = buildPercentageSegments([0, 99.99999999999999, 0.00000000000002])

    expect(geometry[0]).toEqual({ x: 0, width: 0 })
    expect(geometry.every(({ x, width }) => x >= 0 && width >= 0 && x + width <= 100)).toBe(true)
    expect(geometry.at(-1)?.x).toBeCloseTo(100)
    expect(geometry.reduce((total, segment) => total + segment.width, 0)).toBeCloseTo(100)
  })

  it('clips invalid overflow rather than emitting SVG geometry beyond 100', () => {
    expect(buildPercentageSegments([60, 50, 10])).toEqual([
      { x: 0, width: 60 },
      { x: 60, width: 40 },
      { x: 100, width: 0 },
    ])
  })
})
