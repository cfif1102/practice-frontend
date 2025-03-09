import { AppDispatch, RootState } from '@store';
import { getAllWorkshops } from '@thunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useWorkshops = () => {
  const { findAll, allWorkshops } = useSelector((state: RootState) => state.workshops);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllWorkshops());
  }, []);

  return { workshops: allWorkshops, status: findAll.status };
};
