import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { WorkshopStat } from '@@types';

import { ChartDiv, ChartHeader } from './styled';

interface Props {
  data: WorkshopStat[];
}

interface ProcessedData {
  workshopName: string;
  averageEfficiency: number;
}

export const WorkshopEfficiencyChart: FC<Props> = ({ data }) => {
  const processData = (data: WorkshopStat[]): ProcessedData[] => {
    return data.map((workshopData) => {
      const totalEfficiency = workshopData.equipments.reduce((sum, equipment) => sum + equipment.efficiency, 0);
      const average = workshopData.equipments.length > 0 ? totalEfficiency / workshopData.equipments.length : 0;

      return {
        workshopName: workshopData.workshop.name,
        averageEfficiency: average,
      };
    });
  };

  const formatEfficiency = (value: number) => `${value}%`;
  const processedData = processData(data);

  return (
    <ChartDiv width="100%" paddingBottom="0px">
      <ChartHeader>Эффективность цехов</ChartHeader>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={processedData} margin={{ top: 20, right: 30, left: 30, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="workshopName" angle={-45} textAnchor="end" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatEfficiency} />

          <Bar dataKey="averageEfficiency" name="Средняя эффективность" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </ChartDiv>
  );
};
