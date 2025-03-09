import { FormInput } from '@components/Fields';
import { FormSelect } from '@components/Fields/Select';
import { WithLoader } from '@components/Loader';
import { FormHeader, FormStyled, FormWrapper, InputsDiv, OffsetWrapper, SignInBtn } from '@components/SignIn/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useThunkRedirect, useWorkshops } from '@hooks';
import { equipmentsActions, setLogin, setMiddlename, setPassword, setSurname, workshopActions } from '@reducers';
import { AppDispatch, RootState } from '@store';
import { createEquipments, createWorkshop } from '@thunks';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { WorkshopCreate } from '@@types';

interface FormData extends WorkshopCreate {}

const FormSchema = yup.object({
  name: yup.string().required(),
});

export const AddWorkshopForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { name, createThunk } = useSelector((state: RootState) => state.workshops);

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
    dispatch(createWorkshop(data));
  };

  useThunkRedirect(createThunk, '/workshops', workshopActions.restoreCreateThunk);

  return (
    <WithLoader status={createThunk.status}>
      <FormWrapper>
        <FormStyled onSubmit={handleSubmit(formOnSubmit)} height="auto">
          <FormHeader>Создание</FormHeader>

          <InputsDiv>
            <FormInput
              type="text"
              register={register('name')}
              value={name}
              placeholder="Название цеха"
              error={errors.name}
              id="name"
              action={workshopActions.setName}
              clearError={clearErrors}
              label="Название"
            />
          </InputsDiv>

          <WithLoader status={createThunk.status}>
            <SignInBtn type="submit">Создать</SignInBtn>
          </WithLoader>
        </FormStyled>
      </FormWrapper>
    </WithLoader>
  );
};
