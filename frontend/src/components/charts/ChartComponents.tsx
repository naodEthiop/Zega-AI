import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader } from '../ui/Card';

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface BarChartProps {
  title: string;
  data: ChartData[];
  dataKey: string;
  color?: string;
}

export const BarChartComponent: React.FC<BarChartProps> = ({
  title,
  data,
  dataKey,
  color = '#d97706',
}) => {
  return (
    <Card>
      <CardHeader title={title} />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="name" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

interface LineChartProps {
  title: string;
  data: ChartData[];
  dataKey: string;
  color?: string;
}

export const LineChartComponent: React.FC<LineChartProps> = ({
  title,
  data,
  dataKey,
  color = '#d97706',
}) => {
  return (
    <Card>
      <CardHeader title={title} />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="name" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

interface PieChartProps {
  title: string;
  data: ChartData[];
  dataKey: string;
  colors?: string[];
}

export const PieChartComponent: React.FC<PieChartProps> = ({
  title,
  data,
  dataKey,
  colors = ['#d97706', '#06b6d4', '#10b981', '#f59e0b'],
}) => {
  return (
    <Card>
      <CardHeader title={title} />
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
            labelStyle={{ color: '#f1f5f9' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};
