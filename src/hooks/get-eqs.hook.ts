import { AppDispatch, RootState } from '@store';
import { findAllEquipment, getAllWorkshops } from '@thunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useEquipments = () => {
  const { findAllThunk, allEquipments } = useSelector((state: RootState) => state.equipments);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(findAllEquipment());
  }, []);

  return { equipments: allEquipments, status: findAllThunk.status };
};
