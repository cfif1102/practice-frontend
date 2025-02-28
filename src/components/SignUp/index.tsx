import { FormInput } from '@components/Fields';
import { WithLoader } from '@components/Loader';
import {
  FormHeader,
  FormStyled,
  FormWrapper,
  InputsDiv,
  OffsetWrapper,
  RegisterLink,
  SignInBtn,
} from '@components/SignIn/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { setLogin, setMiddlename, setName, setPassword, setSurname } from '@reducers';
import { AppDispatch, RootState } from '@store';
import { signIn, signUp } from '@thunks';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const FormSchema = Yup.object({
  login: Yup.string().min(4).max(20).required(),
  password: Yup.string().min(4).max(25).required(),
  name: Yup.string().min(1).max(20).required(),
  surname: Yup.string().min(1).max(20).required(),
  middlename: Yup.string().min(1).max(20).required(),
});

interface IForm {
  login: string;
  password: string;
  name: string;
  surname: string;
  middlename: string;
}

export const SignUp: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { login, password, name, surname, middlename, signUpThunk } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IForm>({
    resolver: yupResolver(FormSchema),
    defaultValues: { login, password, name, surname },
  });

  const formOnSubmit = (data: IForm) => {
    dispatch(signUp(data));
  };

  return (
    <FormWrapper>
      <FormStyled onSubmit={handleSubmit(formOnSubmit)} height="500px">
        <FormHeader>Регистрация</FormHeader>

        <InputsDiv>
          <FormInput
            type="text"
            register={register('login')}
            value={login}
            placeholder="Введите ваш логин"
            error={errors.login}
            id="login"
            action={setLogin}
            clearError={clearErrors}
            label="Логин"
          />

          <OffsetWrapper>
            <FormInput
              type="text"
              register={register('password')}
              value={password}
              placeholder="Введите ваш пароль"
              error={errors.password}
              id="password"
              action={setPassword}
              clearError={clearErrors}
              label="Пароль"
            />
          </OffsetWrapper>

          <OffsetWrapper>
            <FormInput
              type="text"
              register={register('name')}
              value={name}
              placeholder="Введите ваше имя"
              error={errors.name}
              id="name"
              action={setName}
              clearError={clearErrors}
              label="Имя"
            />
          </OffsetWrapper>

          <OffsetWrapper>
            <FormInput
              type="text"
              register={register('surname')}
              value={surname}
              placeholder="Введите вашу фамилию"
              error={errors.surname}
              id="surname"
              action={setSurname}
              clearError={clearErrors}
              label="Фамилия"
            />
          </OffsetWrapper>

          <OffsetWrapper>
            <FormInput
              type="text"
              register={register('middlename')}
              value={middlename}
              placeholder="Введите ваше отчество"
              error={errors.middlename}
              id="middlename"
              action={setMiddlename}
              clearError={clearErrors}
              label="Отчество"
            />
          </OffsetWrapper>
        </InputsDiv>

        <WithLoader status={signUpThunk.status}>
          <SignInBtn type="submit">Создать</SignInBtn>
        </WithLoader>
      </FormStyled>
    </FormWrapper>
  );
};
