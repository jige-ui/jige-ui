import type {
  Chart,
  ChartData,
  ChartOptions,
  Plugin as ChartPlugin,
  ChartType,
  ChartTypeRegistry,
  TooltipModel,
} from 'chart.js'
import type { Ref } from 'solid-js'

export type TypedChartProps = {
  data: ChartData
  options?: ChartOptions
  plugins?: ChartPlugin[]
  ref?: Ref<HTMLCanvasElement | null>
  width?: number | undefined
  height?: number | undefined
}

export type ChartProps = TypedChartProps & {
  type: ChartType
}

export type ChartContext = {
  chart: Chart
  tooltip: TooltipModel<keyof ChartTypeRegistry>
}
