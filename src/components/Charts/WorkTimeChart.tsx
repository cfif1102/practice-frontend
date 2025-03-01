import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { EquipmentStat } from '@@types';

import { ChartDiv, ChartHeader } from './styled';

interface Props {
  data: EquipmentStat[];
}

export const WorkTimeChart: FC<Props> = ({ data }) => {
  return (
    <ChartDiv>
      <ChartHeader>Время работы</ChartHeader>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="equipment.name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Legend />
          <Bar dataKey="workingTime" name="Рабочее время" fill="#82ca9d" barSize={30} />
          <Bar dataKey="notWorkingTime" name="Время простоя" fill="#ffc658" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </ChartDiv>
  );
};
