import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { Task } from "../types/Task";

interface TaskChartProps {
  tasks: Task[];
}

const COLORS = ["#1890ff", "#52c41a"]; // Azul para pendientes, verde para completadas

export default function TaskChart({ tasks }: TaskChartProps) {
  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  const data = [
    { name: "Pendientes", value: pendingCount },
    { name: "Realizadas", value: completedCount },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
