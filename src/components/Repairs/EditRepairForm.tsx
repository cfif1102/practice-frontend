import { withCheckId } from '@components/Common/WithCheckId';
import { FormInput } from '@components/Fields';
import { FormSelect } from '@components/Fields/Select';
import { WithLoader } from '@components/Loader';
import { FormHeader, FormStyled, FormWrapper, InputsDiv, OffsetWrapper, SignInBtn } from '@components/SignIn/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEquipments, useThunkRedirect, useWorkshops } from '@hooks';
import { equipmentsActions, repairActions, setLogin, setMiddlename, setPassword, setSurname } from '@reducers';
import { AppDispatch, RootState } from '@store';
import { createEquipments, createRepair, findRepair, updateRepair } from '@thunks';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { CreateEquipemnt, CreateRepair, Repair } from '@@types';

interface Props {
  entity: Repair;
  id: number;
}

interface FormData extends CreateRepair {}

const FormSchema = yup.object({
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  type: yup.string().required(),
  detectedFault: yup.string().required(),
  equipmentId: yup.number().required(),
});

export const EditRepairForm: FC<Props> = ({ id, entity }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { equipments, status } = useEquipments();

  const { startDate, endDate, type, detectedFault, equipmentId, updateThunk } = useSelector(
    (state: RootState) => state.repairs,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(FormSchema),
    defaultValues: {},
  });

  const formOnSubmit = (data: FormData) => {
    dispatch(updateRepair({ id, repair: data }));
  };

  useEffect(() => {
    const startDate = new Date(entity.startDate);
    const endDate = new Date(entity.endDate || Date.now());

    dispatch(repairActions.setStartDate(startDate));
    dispatch(repairActions.setEndDate(endDate));
    dispatch(repairActions.setType(entity.type));
    dispatch(repairActions.setDetectedFault(entity.detectedFault));
    dispatch(repairActions.setEquipmentId(entity.equipment.id));

    setValue('startDate', startDate);
    setValue('endDate', endDate);
    setValue('type', entity.type);
    setValue('detectedFault', entity.detectedFault);
    setValue('equipmentId', entity.equipment.id);
  }, [entity]);

  useThunkRedirect(updateThunk, '/repairs', repairActions.restoreUpdateThunk);

  return (
    <WithLoader status={status}>
      <FormWrapper>
        <FormStyled onSubmit={handleSubmit(formOnSubmit)} height="auto">
          <FormHeader>Редактирование</FormHeader>

          <InputsDiv>
            <FormInput
              type="date"
              register={register('startDate')}
              value={startDate}
              placeholder=""
              error={errors.startDate}
              id="startDate"
              action={repairActions.setStartDate}
              clearError={clearErrors}
              label=""
            />

            <OffsetWrapper>
              <FormInput
                type="date"
                register={register('endDate')}
                value={endDate}
                placeholder=""
                error={errors.endDate}
                id="endDate"
                action={repairActions.setEndDate}
                clearError={clearErrors}
                label=""
              />
            </OffsetWrapper>

            <OffsetWrapper>
              <FormInput
                type="text"
                register={register('type')}
                value={type}
                placeholder="Тип ремонта"
                error={errors.type}
                id="type"
                action={repairActions.setType}
                clearError={clearErrors}
                label="Тип ремонта"
              />
            </OffsetWrapper>

            <OffsetWrapper>
              <FormInput
                type="text"
                register={register('detectedFault')}
                value={detectedFault}
                placeholder="Неисправность"
                error={errors.detectedFault}
                id="detectedFault"
                action={repairActions.setDetectedFault}
                clearError={clearErrors}
                label="Неисправность"
              />
            </OffsetWrapper>

            <OffsetWrapper>
              <FormSelect
                data={equipments}
                ids="id"
                value="name"
                selectedId={equipmentId}
                action={repairActions.setEquipmentId}
                error={errors.equipmentId}
                register={register('equipmentId')}
                label="Оборудование"
                id="equipmentId"
                clearError={clearErrors}
              />
            </OffsetWrapper>
          </InputsDiv>

          <WithLoader status={updateThunk.status}>
            <SignInBtn type="submit">Обновить</SignInBtn>
          </WithLoader>
        </FormStyled>
      </FormWrapper>
    </WithLoader>
  );
};

export default withCheckId(
  'id',
  (state: RootState) => state.repairs.findOneThunk,
  findRepair,
  (state: RootState) => state.repairs.repair,
)(EditRepairForm);
