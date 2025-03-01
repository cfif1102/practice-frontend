import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { EquipmentStat } from '@@types';

import { ChartDiv, ChartHeader } from './styled';

interface Props {
  data: EquipmentStat[];
}

export const TotalFaultsChart: FC<Props> = ({ data }) => {
  return (
    <ChartDiv width="100%">
      <ChartHeader>Общее количество поломок</ChartHeader>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="equipment.name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalBreaks" fill="#8884d8" name="Всего поломок" />
        </BarChart>
      </ResponsiveContainer>
    </ChartDiv>
  );
};
