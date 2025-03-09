import { FormInput } from '@components/Fields';
import { FormSelect } from '@components/Fields/Select';
import { WithLoader } from '@components/Loader';
import { FormHeader, FormStyled, FormWrapper, InputsDiv, OffsetWrapper, SignInBtn } from '@components/SignIn/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useThunkRedirect, useWorkshops } from '@hooks';
import { equipmentsActions, setLogin, setMiddlename, setPassword, setSurname } from '@reducers';
import { AppDispatch, RootState } from '@store';
import { createEquipments } from '@thunks';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { CreateEquipemnt } from '@@types';

interface FormData extends CreateEquipemnt {}

const FormSchema = yup.object({
  name: yup.string().required(),
  manufacturer: yup.string().required(),
  type: yup.string().required(),
  model: yup.string().required(),
  innovationNumber: yup.string().required(),
  serialNumber: yup.string().required(),
  workHours: yup.number().min(1).required(),
  workshopId: yup.number().required(),
});

export const AddEquipmentForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { workshops, status } = useWorkshops();

  const {
    name,
    manufacturer,
    type,
    model,
    innovationNumber,
    serialNumber,
    workHours,
    workshopId,
    createEquipmentThunk,
  } = useSelector((state: RootState) => state.equipments);

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
    dispatch(createEquipments(data));
  };

  useThunkRedirect(createEquipmentThunk, '/equipments', equipmentsActions.restoreCreateThunk);

  return (
    <WithLoader status={status}>
      <FormWrapper>
        <FormStyled onSubmit={handleSubmit(formOnSubmit)} height="auto">
          <FormHeader>Создание оборудования</FormHeader>

          <InputsDiv>
            <FormInput
              type="text"
              register={register('name')}
              value={name}
              placeholder="Название оборудования"
              error={errors.name}
              id="name"
              action={equipmentsActions.setName}
              clearError={clearErrors}
              label="Название"
            />

            <OffsetWrapper>
              <FormInput
                type="text"
                register={register('manufacturer')}
                value={manufacturer}
                placeholder="Производитель оборудования"
                error={errors.manufacturer}
                id="manufacturer"
                action={equipmentsActions.setManufacturer}
                clearError={clearErrors}
                label="Производитель"
              />
            </OffsetWrapper>

            <OffsetWrapper>
              <FormInput
                type="text"
                register={register('type')}
                value={type}
                placeholder="Тип оборудования"
                error={errors.type}
                id="manufacturer"
                action={equipmentsActions.setType}
                clearError={clearErrors}
                label="Тип"
              />
            </OffsetWrapper>

            <OffsetWrapper>
              <FormInput
                type="text"
                register={register('model')}
                value={model}
                placeholder="Модель оборудования"
                error={errors.model}
                id="model"
                action={equipmentsActions.setModel}
                clearError={clearErrors}
                label="Модель"
              />
            </OffsetWrapper>

            <OffsetWrapper>
              <FormInput
                type="text"
                register={register('innovationNumber')}
                value={innovationNumber}
                placeholder="Инн. номер оборудования"
                error={errors.innovationNumber}
                id="innovationNumber"
                action={equipmentsActions.setInnovationNumber}
                clearError={clearErrors}
                label="Инн. номер"
              />
            </OffsetWrapper>

            <OffsetWrapper>
              <FormInput
                type="text"
                register={register('serialNumber')}
                value={serialNumber}
                placeholder="Инн. номер оборудования"
                error={errors.serialNumber}
                id="serialNumber"
                action={equipmentsActions.setSerialNumber}
                clearError={clearErrors}
                label="Серийный номер"
              />
            </OffsetWrapper>

            <OffsetWrapper>
              <FormInput
                type="text"
                register={register('workHours')}
                value={workHours}
                placeholder="Раб. фонд оборудования"
                error={errors.workHours}
                id="workHours"
                action={equipmentsActions.setWorkhours}
                clearError={clearErrors}
                label="Рабочий фонд"
              />
            </OffsetWrapper>

            <OffsetWrapper>
              <FormSelect
                data={workshops}
                ids="id"
                value="name"
                selectedId={workshopId}
                action={equipmentsActions.setWorkshopId}
                error={errors.workshopId}
                register={register('workshopId')}
                label="Цех"
                id="workshopId"
                clearError={clearErrors}
              />
            </OffsetWrapper>
          </InputsDiv>

          <WithLoader status={createEquipmentThunk.status}>
            <SignInBtn type="submit">Создать</SignInBtn>
          </WithLoader>
        </FormStyled>
      </FormWrapper>
    </WithLoader>
  );
};
