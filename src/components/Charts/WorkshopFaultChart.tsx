import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { WorkshopStat } from '@@types';

import { ChartDiv, ChartHeader } from './styled';

interface Props {
  data: WorkshopStat[];
}

interface ProcessedData {
  workshopName: string;
  totalBreaks: number;
  equipmentCount: number;
}

export const WorkshopFaultChart: FC<Props> = ({ data }) => {
  const processData = (data: WorkshopStat[]): ProcessedData[] => {
    return data.map((workshopData) => {
      const total = workshopData.equipments.reduce((sum, equipment) => sum + equipment.totalBreaks, 0);

      return {
        workshopName: workshopData.workshop.name,
        totalBreaks: total,
        equipmentCount: workshopData.equipments.length,
      };
    });
  };

  const processedData = processData(data);

  return (
    <ChartDiv width="100%" paddingBottom="0px">
      <ChartHeader>Поломки по цехам</ChartHeader>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="workshopName" angle={-35} textAnchor="end" tick={{ fontSize: 12 }} />
          <YAxis />
          <Bar dataKey="totalBreaks" name="Количество поломок" fill="#ff7300" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </ChartDiv>
  );
};
