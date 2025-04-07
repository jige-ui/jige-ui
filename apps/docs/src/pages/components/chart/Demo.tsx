import type { ChartData } from 'chart.js'
import {
  BarChart,
  BubbleChart,
  DonutChart,
  LineChart,
  PieChart,
  PolarAreaChart,
  RadarChart,
  ScatterChart,
} from 'jige-ui'
import { createMemo } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Dynamic } from 'solid-js/web'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    type: 'bar' as
      | 'bar'
      | 'bubble'
      | 'doughnut'
      | 'line'
      | 'pie'
      | 'polarArea'
      | 'radar'
      | 'scatter',
  })

  const chartName = createMemo(() => {
    switch (p.type) {
      case 'bar':
        return '柱状图'
      case 'bubble':
        return '气泡图'
      case 'doughnut':
        return '环形图'
      case 'line':
        return '折线图'
      case 'pie':
        return '饼图'
      case 'polarArea':
        return '极坐标图'
      case 'radar':
        return '雷达图'
      case 'scatter':
        return '散点图'
    }
  })

  const genDataForDots = (count: number): { x: number; y: number; r: number }[] => {
    const data = []
    for (let i = 0; i < count; i++) {
      data.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.floor(Math.random() * 10),
      })
    }
    return data
  }

  const data = createMemo(() => {
    const chartData: ChartData = {
      labels: ['1月', '2月', '3月', '4月', '5月'],
      datasets: [
        {
          label: '产量',
          fill: true,

          data: ['bubble', 'scatter'].includes(p.type)
            ? genDataForDots(Math.floor(Math.random() * 25) + 5)
            : [65, 59, 80, 81, 56],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        },
        {
          label: '苹果',
          fill: true,
          data: ['bubble', 'scatter'].includes(p.type)
            ? genDataForDots(Math.floor(Math.random() * 25) + 5)
            : [28, 48, 40, 19, 86],
          backgroundColor: ['rgba(26, 192, 62, 0.2)', 'rgba(24, 7, 217, 0.2)'],
        },
      ],
    }

    return chartData
  })

  const component = createMemo(() => {
    switch (p.type) {
      case 'bar':
        return BarChart
      case 'bubble':
        return BubbleChart
      case 'doughnut':
        return DonutChart
      case 'line':
        return LineChart
      case 'pie':
        return PieChart
      case 'polarArea':
        return PolarAreaChart
      case 'radar':
        return RadarChart
      case 'scatter':
        return ScatterChart
    }
  })

  return (
    <Playground>
      <Playground.MainArea>
        <div class='p-2'>{chartName()}</div>
        <div class='w-512px'>
          <Dynamic component={component()} data={data()} height={268} />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          type: ['bar', 'bubble', 'doughnut', 'line', 'pie', 'polarArea', 'radar', 'scatter'],
        }}
      />
    </Playground>
  )
}
