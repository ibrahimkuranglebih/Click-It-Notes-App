"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A horizontal bar chart"

export function ChartBarHorizontal({ notes = [] }) {
  // Filter hanya notes tahun 2025
  const filteredNotes = notes.filter(note => {
    if (!note.tanggalDibuat) return false
    const date = new Date(note.tanggalDibuat)
    return date.getFullYear() === 2025
  })

  // Hitung jumlah notes per bulan di tahun 2025
  const monthCounts = filteredNotes.reduce((acc, note) => {
    const date = new Date(note.tanggalDibuat)
    const month = date.toLocaleString("default", { month: "long" })
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {})

  // Urutkan bulan sesuai kalender
  const monthOrder = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const chartData = monthOrder.map(month => ({
    month,
    notesCount: monthCounts[month] || 0,
  }))

  const chartConfig = {
    notesCount: {
      label: "Notes",
      color: "#7bf1a8",
    },
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Notes Created by Month</CardTitle>
        <CardDescription>January - December 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="notesCount" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="notesCount" fill="var(--color-notesCount)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {filteredNotes.length} Notes Created in 2025
        </div>
      </CardFooter>
    </Card>
  )
}
