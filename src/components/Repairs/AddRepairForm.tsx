import { FormInput } from '@components/Fields';
import { FormSelect } from '@components/Fields/Select';
import { WithLoader } from '@components/Loader';
import { FormHeader, FormStyled, FormWrapper, InputsDiv, OffsetWrapper, SignInBtn } from '@components/SignIn/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEquipments, useThunkRedirect, useWorkshops } from '@hooks';
import { equipmentsActions, repairActions, setLogin, setMiddlename, setPassword, setSurname } from '@reducers';
import { AppDispatch, RootState } from '@store';
import { createEquipments, createRepair } from '@thunks';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { CreateEquipemnt, CreateRepair } from '@@types';

interface FormData extends CreateRepair {}

const FormSchema = yup.object({
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  type: yup.string().required(),
  detectedFault: yup.string().required(),
  equipmentId: yup.number().required(),
});

export const AddRepairForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { equipments, status } = useEquipments();

  const { startDate, endDate, type, detectedFault, equipmentId, createThunk } = useSelector(
    (state: RootState) => state.repairs,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormData>({
    resolver: yupResolver(FormSchema),
    defaultValues: {},
  });

  const formOnSubmit = (data: FormData) => {
    dispatch(createRepair(data));
  };

  useThunkRedirect(createThunk, '/repairs', repairActions.restoreCreateThunk);

  return (
    <WithLoader status={status}>
      <FormWrapper>
        <FormStyled onSubmit={handleSubmit(formOnSubmit)} height="auto">
          <FormHeader>Создание</FormHeader>

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

          <WithLoader status={createThunk.status}>
            <SignInBtn type="submit">Создать</SignInBtn>
          </WithLoader>
        </FormStyled>
      </FormWrapper>
    </WithLoader>
  );
};
