import { withCheckId } from '@components/Common/WithCheckId';
import { FormInput } from '@components/Fields';
import { FormSelect } from '@components/Fields/Select';
import { WithLoader } from '@components/Loader';
import { FormHeader, FormStyled, FormWrapper, InputsDiv, OffsetWrapper, SignInBtn } from '@components/SignIn/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckId, useThunkRedirect, useWorkshops } from '@hooks';
import { equipmentsActions, setLogin, setMiddlename, setPassword, setSurname, workshopActions } from '@reducers';
import { AppDispatch, RootState } from '@store';
import { createEquipments, findOneEquipment, findOneWorkshop, updateEquipments, updateOneWorkshop } from '@thunks';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import { CreateEquipemnt, Equipment, Workshop, WorkshopCreate } from '@@types';

interface FormData extends WorkshopCreate {}

const FormSchema = yup.object({
  name: yup.string().required(),
});

interface Props {
  entity: Workshop;
  id: number;
}

const EditWorkshopForm: FC<Props> = ({ entity, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { updateOneThunk, name } = useSelector((state: RootState) => state.workshops);

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
    dispatch(updateOneWorkshop({ id, workshop: data }));
  };

  useEffect(() => {
    dispatch(workshopActions.setName(entity.name));

    setValue('name', entity.name);
  }, [entity]);

  useThunkRedirect(updateOneThunk, '/workshops', workshopActions.restoreUpdateThunk);

  return (
    <FormWrapper>
      <FormStyled onSubmit={handleSubmit(formOnSubmit)} height="auto">
        <FormHeader>Редактирование</FormHeader>

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

        <WithLoader status={updateOneThunk.status}>
          <SignInBtn type="submit">Обновить</SignInBtn>
        </WithLoader>
      </FormStyled>
    </FormWrapper>
  );
};

export default withCheckId(
  'id',
  (state: RootState) => state.workshops.findOneThunk,
  findOneWorkshop,
  (state: RootState) => state.workshops.workshop,
)(EditWorkshopForm);
