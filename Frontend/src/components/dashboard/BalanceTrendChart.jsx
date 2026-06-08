import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { TREND_DATA } from '../../data/mockData'
import { fmtShort } from '../../utils/helpers'
import ChartTooltip from '../ui/ChartTooltip'
import ChartCard from '../ui/ChartCard'

export default function BalanceTrendChart() {
  return (
    <ChartCard title="Balance Trend" subtitle="6-month income & savings overview">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={TREND_DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#c8a45a" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#c8a45a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#52a87c" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#52a87c" stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#52a87c"
            strokeWidth={1.5}
            fill="url(#gradIncome)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="savings"
            name="Savings"
            stroke="#c8a45a"
            strokeWidth={2}
            fill="url(#gradBalance)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
