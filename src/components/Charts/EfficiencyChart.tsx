import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { EquipmentStat } from '@@types';

import { ChartDiv, ChartHeader } from './styled';

interface Props {
  data: EquipmentStat[];
}

export const EfficiencyChart: FC<Props> = ({ data }) => {
  const formatEfficiency = (value: number) => `${value}%`;
  const sortedData = [...data].sort((a, b) => b.efficiency - a.efficiency);

  return (
    <ChartDiv width="100%">
      <ChartHeader>График эффективности</ChartHeader>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="equipment.name" />
          <YAxis tickFormatter={formatEfficiency} max={100} />
          <Tooltip formatter={(value: number) => formatEfficiency(value)} />
          <Legend />
          <Bar dataKey="efficiency" fill="#ff8042" name="Эффективность" />
        </BarChart>
      </ResponsiveContainer>
    </ChartDiv>
  );
};
