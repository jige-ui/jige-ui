import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  DoughnutController,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
} from 'chart.js'
import { BaseChart, createTypedChart } from './BaseChart'

const BarChart = /* #__PURE__ */ createTypedChart('bar', [
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
])
const BubbleChart = /* #__PURE__ */ createTypedChart('bubble', [
  BubbleController,
  PointElement,
  LinearScale,
])
const DonutChart = /* #__PURE__ */ createTypedChart('doughnut', [DoughnutController, ArcElement])
const LineChart = /* #__PURE__ */ createTypedChart('line', [
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
])
const PieChart = /* #__PURE__ */ createTypedChart('pie', [PieController, ArcElement])
const PolarAreaChart = /* #__PURE__ */ createTypedChart('polarArea', [
  PolarAreaController,
  ArcElement,
  RadialLinearScale,
])
const RadarChart = /* #__PURE__ */ createTypedChart('radar', [
  RadarController,
  LineElement,
  PointElement,
  RadialLinearScale,
])
const ScatterChart = /* #__PURE__ */ createTypedChart('scatter', [
  ScatterController,
  PointElement,
  LinearScale,
])

export {
  BaseChart as Chart,
  BarChart,
  BubbleChart,
  DonutChart,
  LineChart,
  PieChart,
  PolarAreaChart,
  RadarChart,
  ScatterChart,
}
