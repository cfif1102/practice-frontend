import { withCheckId } from '@components/Common/WithCheckId';
import { FormInput } from '@components/Fields';
import { FormSelect } from '@components/Fields/Select';
import { WithLoader } from '@components/Loader';
import { FormHeader, FormStyled, FormWrapper, InputsDiv, OffsetWrapper, SignInBtn } from '@components/SignIn/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckId, useThunkRedirect, useWorkshops } from '@hooks';
import {
  employeesActions,
  equipmentsActions,
  setLogin,
  setMiddlename,
  setPassword,
  setSurname,
  workshopActions,
} from '@reducers';
import { AppDispatch, RootState } from '@store';
import {
  createEquipments,
  findEmployee,
  findOneEquipment,
  findOneWorkshop,
  updateEmployee,
  updateEquipments,
  updateOneWorkshop,
} from '@thunks';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import { CreateEquipemnt, Employee, EmployeeCreate, Equipment, Workshop, WorkshopCreate } from '@@types';

interface FormData extends EmployeeCreate {}

const FormSchema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  middlename: yup.string().required(),
});

interface Props {
  entity: Employee;
  id: number;
}

const EditEmployeeForm: FC<Props> = ({ entity, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updateThunk, name, surname, middlename } = useSelector((state: RootState) => state.employees);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(FormSchema),
    defaultValues: {},
  });

  const formOnSubmit = (data: FormData) => {
    dispatch(updateEmployee({ id, emp: data }));
  };

  useEffect(() => {
    dispatch(employeesActions.setName(entity.name));
    dispatch(employeesActions.setSurname(entity.surname));
    dispatch(employeesActions.setMiddlename(entity.middlename));

    setValue('name', entity.name);
    setValue('surname', entity.surname);
    setValue('middlename', entity.middlename);
  }, [entity]);

  useThunkRedirect(updateThunk, '/employees', employeesActions.restoreUpdateThunk);

  return (
    <FormWrapper>
      <FormStyled onSubmit={handleSubmit(formOnSubmit)} height="auto">
        <FormHeader>Редактирование</FormHeader>

        <InputsDiv>
          <FormInput
            type="text"
            register={register('name')}
            value={name}
            placeholder="Имя"
            error={errors.name}
            id="name"
            action={employeesActions.setName}
            clearError={clearErrors}
            label="Имя"
          />

          <OffsetWrapper>
            <FormInput
              type="text"
              register={register('surname')}
              value={surname}
              placeholder="Фамилия"
              error={errors.surname}
              id="surname"
              action={employeesActions.setSurname}
              clearError={clearErrors}
              label="Фамилия"
            />
          </OffsetWrapper>

          <OffsetWrapper>
            <FormInput
              type="text"
              register={register('middlename')}
              value={middlename}
              placeholder="Отчество"
              error={errors.middlename}
              id="middlename"
              action={employeesActions.setMiddlename}
              clearError={clearErrors}
              label="Отчество"
            />
          </OffsetWrapper>
        </InputsDiv>

        <WithLoader status={updateThunk.status}>
          <SignInBtn type="submit">Обновить</SignInBtn>
        </WithLoader>
      </FormStyled>
    </FormWrapper>
  );
};

export default withCheckId(
  'id',
  (state: RootState) => state.employees.findOneThunk,
  findEmployee,
  (state: RootState) => state.employees.employee,
)(EditEmployeeForm);
