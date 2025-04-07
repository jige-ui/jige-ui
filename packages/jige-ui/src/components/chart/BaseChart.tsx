import { mergeRefs } from '@solid-primitives/refs'
import {
  Chart,
  type ChartComponent,
  type ChartItem,
  type ChartOptions,
  type Plugin as ChartPlugin,
  type ChartType,
  Colors,
  Filler,
  Legend,
  Tooltip,
} from 'chart.js'
import { type Component, createSignal, mergeProps, onCleanup, onMount } from 'solid-js'
import { unwrap } from 'solid-js/store'
import { mountStyle, watch } from 'solid-uses'
import type { ChartContext, ChartProps, TypedChartProps } from './types'

import css from 'sass:./chartjs.scss'

export const BaseChart: Component<ChartProps> = (rawProps) => {
  mountStyle(css, 'jige-ui-chartjs')

  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement | null>()
  const [chart, setChart] = createSignal<Chart>()

  const props = mergeProps(
    {
      width: 512,
      height: 512,
      options: { responsive: true } as ChartOptions,
      plugins: [] as ChartPlugin[],
    },
    rawProps,
  )

  const init = () => {
    const ctx = canvasRef()?.getContext('2d') as ChartItem
    const config = unwrap(props)
    const chart = new Chart(ctx, {
      type: config.type,
      data: config.data,
      options: config.options,
      plugins: config.plugins,
    })
    setChart(chart)
  }

  onMount(() => init())

  watch(
    () => props.data,
    (d) => {
      chart()!.data = d
      chart()!.update()
    },
    { defer: true },
  )

  watch(
    () => props.options,
    (opt) => {
      chart()!.options = opt
      chart()!.update()
    },
    { defer: true },
  )

  watch(
    [() => props.width, () => props.height],
    ([w, h]) => {
      chart()!.resize(w, h)
    },
    { defer: true },
  )

  watch(
    () => props.type,
    () => {
      const dimensions = [chart()!.width, chart()!.height]
      chart()!.destroy()
      init()
      chart()!.resize(...dimensions)
    },
    { defer: true },
  )

  onCleanup(() => {
    chart()?.destroy()
    mergeRefs(props.ref, null)
  })

  Chart.register(Colors, Filler, Legend, Tooltip)
  return (
    <canvas
      ref={mergeRefs(props.ref, (el) => setCanvasRef(el))}
      height={props.height}
      width={props.width}
    />
  )
}

let timeoutId = 0

function showTooltip(context: ChartContext) {
  let el = document.getElementById('chartjs-tooltip')
  if (!el) {
    el = document.createElement('div')
    el.id = 'chartjs-tooltip'
    document.body.appendChild(el)
  }

  const model = context.tooltip
  if (model.opacity === 0 || !model.body) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      el.style.opacity = '0'
      el.style.transition = 'opacity 0.2s'
    }, 250)
    return
  }

  el.className = 'jg-chartjs-tooltip'

  let content = ''

  for (const title of model.title) {
    content += `<h3 class="jg-chartjs-tooltip-title">${title}</h3>`
  }

  content += '<div style="margin-top: 4px;">'
  const body = model.body.flatMap((body) => body.lines)
  body.forEach((line, i) => {
    const colors = model.labelColors[i]
    content += `
          <div class="jg-chartjs-tooltip-item">
            <span class="jg-chartjs-tooltip-dot" style="background: ${colors.backgroundColor}; border-color: ${colors.borderColor}"></span>
            ${line}
          </div>`
  })
  content += '</div>'

  el.innerHTML = content

  const pos = context.chart.canvas.getBoundingClientRect()
  clearTimeout(timeoutId)
  el.style.transform = `translate(${pos.left + window.scrollX + model.caretX}px, ${pos.top + window.scrollY + model.caretY}px)`
  el.style.opacity = '1'
  requestAnimationFrame(() => {
    el.style.transition = 'opacity 0.2s, transform 0.2s'
  })
  el.style.pointerEvents = 'none'
}

export function createTypedChart(
  type: ChartType,
  components: ChartComponent[],
): Component<TypedChartProps> {
  const chartsWithScales: ChartType[] = ['bar', 'line', 'scatter']
  const chartsWithLegends: ChartType[] = ['bar', 'line']

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: chartsWithScales.includes(type)
      ? {
          x: {
            border: { display: false },
            grid: { display: false },
          },
          y: {
            border: {
              dash: [3],
              dashOffset: 3,
              display: false,
            },
            grid: {
              color: 'hsla(347, 3.80%, 46.10%, 0.40)',
            },
          },
        }
      : {},
    plugins: {
      legend: chartsWithLegends.includes(type)
        ? {
            display: true,
            align: 'end',
            labels: {
              usePointStyle: true,
              boxWidth: 6,
              boxHeight: 6,
              color: 'hsl(240, 3.8%, 46.1%)',
              font: { size: 14 },
            },
          }
        : { display: false },
      tooltip: {
        enabled: false,
        external: (context) => showTooltip(context),
      },
    },
  }

  Chart.register(...components)
  return (props) => <BaseChart type={type} options={options} {...props} />
}
