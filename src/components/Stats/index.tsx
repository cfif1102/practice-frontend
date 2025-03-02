import {
  EfficiencyChart,
  TotalFaultsChart,
  WorkshopEfficiencyChart,
  WorkshopFaultChart,
  WorkTimeChart,
} from '@components/Charts';
import { COLORS } from '@constants';
import { Skeleton } from '@mui/material';
import { AppDispatch, RootState } from '@store';
import { getEquipmentsStat, getWorkshopsStat } from '@thunks';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StatGroupHeader, StatOffset, StatsDiv, StatsGroup } from './styled';

export const Stats: FC = () => {
  const { equipments, workshops, getEquipmentsStatThunk, getWorkshopsStatThunk } = useSelector(
    (state: RootState) => state.stats,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!equipments.length && getEquipmentsStatThunk.status === 'idle') {
      dispatch(getEquipmentsStat());
    }

    if (!workshops.length && getWorkshopsStatThunk.status === 'idle') {
      dispatch(getWorkshopsStat());
    }
  }, []);

  const isLoading = getEquipmentsStatThunk.status === 'pending' || getWorkshopsStatThunk.status === 'pending';

  if (isLoading) {
    return (
      <StatsDiv>
        <Skeleton width="100%" height="60px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />

        <StatsGroup>
          <Skeleton width="100%" height="400px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
        </StatsGroup>

        <StatsGroup>
          <Skeleton width="100%" height="400px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />

          <StatOffset>
            <Skeleton width="100%" height="400px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
          </StatOffset>
        </StatsGroup>

        <StatsGroup>
          <Skeleton width="100%" height="60px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
        </StatsGroup>

        <StatsGroup>
          <Skeleton width="100%" height="400px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
        </StatsGroup>

        <StatsGroup>
          <Skeleton width="100%" height="400px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />

          <StatOffset>
            <Skeleton width="100%" height="400px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
          </StatOffset>
        </StatsGroup>
      </StatsDiv>
    );
  }

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
