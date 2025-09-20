"use client"

import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function ChartPieLabel({ notes = [] }) {
  // Definisikan warna untuk setiap kategori
  const categoryColors = {
    work : '#7bf1a8',
    study : '#ffdf20',
    event : '#53eafd',
    task : '#ffa2a2',
    Others : '#8ec5ff',
  };

  // Hitung jumlah notes per kategori
  const categoryCounts = notes.reduce((acc, note) => {
    const category = note.taskType || 'Others';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Konversi ke format yang sesuai untuk chartData
  const chartData = Object.entries(categoryCounts).map(([browser, visitors]) => ({
    browser,
    visitors,
    fill: categoryColors[browser] || categoryColors['Others']
  }));

  const chartConfig = {
    visitors: {
      label: "visitors",
    },
    Work: {
      label: "Work",
      color: "#7bf1a8",
    },
    Study: {
      label: "Study",
      color: "#ffdf20",
    },
    Event: {
      label: "Event",
      color: "#53eafd",
    },
    Task: {
      label: "Task",
      color: "#ffa2a2",
    },
    Others: {
      label: "Others",
      color: "#8ec5ff",
    },
  }

  return (
    <Card className="flex flex-col w-full max-w-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Notes Distribution</CardTitle>
        <CardDescription>By Category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie 
              data={chartData} 
              dataKey="visitors" 
              label 
              nameKey="browser"
              labelLine={false}
              outerRadius={80}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total Notes Created: {notes.length} notes
        </div>
      </CardFooter>
    </Card>
  );
}