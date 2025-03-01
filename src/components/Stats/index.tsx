import {
  EfficiencyChart,
  TotalFaultsChart,
  WorkshopEfficiencyChart,
  WorkshopFaultChart,
  WorkTimeChart,
} from '@components/Charts';
import { AppDispatch, RootState } from '@store';
import { getEquipmentsStat, getWorkshopsStat } from '@thunks';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StatGroupHeader, StatOffset, StatsDiv, StatsGroup } from './styled';

export const Stats: FC = () => {
  const { equipments, workshops } = useSelector((state: RootState) => state.stats);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getEquipmentsStat());
    dispatch(getWorkshopsStat());
  }, []);

  return (
    <StatsDiv>
      <StatGroupHeader>Статистика по оборудованию</StatGroupHeader>

      <WorkTimeChart data={equipments} />

      <StatsGroup>
        <EfficiencyChart data={equipments} />

        <StatOffset>
          <TotalFaultsChart data={equipments} />
        </StatOffset>
      </StatsGroup>

      <StatGroupHeader>Статистика по цехам</StatGroupHeader>

      <StatsGroup margin="0">
        <WorkshopEfficiencyChart data={workshops} />

        <StatOffset>
          <WorkshopFaultChart data={workshops} />
        </StatOffset>
      </StatsGroup>
    </StatsDiv>
  );
};
