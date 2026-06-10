import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { useAppStore } from '../../store/useAppStore'
import { fmtShort } from '../../utils/helpers'
import ChartTooltip from '../ui/ChartTooltip'
import ChartCard from '../ui/ChartCard'

export default function MonthlyBarChart() {
  const getMonthlyData = useAppStore((s) => s.getMonthlyData)
  const data = getMonthlyData()

  return (
    <ChartCard title="Income vs Expenses" subtitle="Month-by-month comparison">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          barGap={3}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#232327" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#56544f', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={fmtShort}
            tick={{ fill: '#56544f', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={58}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="income"   name="Income"   fill="#52a87c" radius={[3,3,0,0]} maxBarSize={32} />
          <Bar dataKey="expenses" name="Expenses" fill="#d95f5f" radius={[3,3,0,0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}