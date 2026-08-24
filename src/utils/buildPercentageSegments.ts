export interface PercentageSegmentGeometry {
  readonly x: number
  readonly width: number
}

export function buildPercentageSegments(
  percentages: readonly number[],
): readonly PercentageSegmentGeometry[] {
  let position = 0

  return percentages.map((percentage) => {
    const x = Math.min(100, Math.max(0, position))
    const finitePercentage = Number.isFinite(percentage) ? percentage : 0
    const width = Math.min(Math.max(finitePercentage, 0), 100 - x)
    position = x + width
    return { x, width }
  })
}
