import { FormInput } from '@components/Fields';
import { WithLoader } from '@components/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { setLogin, setPassword } from '@reducers';
import { AppDispatch, RootState } from '@store';
import { signIn } from '@thunks';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { FormHeader, FormStyled, FormWrapper, InputsDiv, OffsetWrapper, RegisterLink, SignInBtn } from './styled';

const FormSchema = Yup.object({
  login: Yup.string().min(4).max(20).required(),
  password: Yup.string().min(4).max(25).required(),
});

interface IForm {
  login: string;
  password: string;
}

export const SignIn: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { login, password, signInThunk } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IForm>({
    resolver: yupResolver(FormSchema),
    defaultValues: { login, password },
  });

  const formOnSubmit = (data: IForm) => {
    dispatch(signIn(data));
  };

  return (
    <FormWrapper>
      <FormStyled onSubmit={handleSubmit(formOnSubmit)}>
        <FormHeader>Авторизация</FormHeader>

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
              type="password"
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
        </InputsDiv>

        <WithLoader status={signInThunk.status}>
          <>
            <SignInBtn type="submit">Войти</SignInBtn>
            <RegisterLink to="/auth/sign-up">Создать аккаунт</RegisterLink>
          </>
        </WithLoader>
      </FormStyled>
    </FormWrapper>
  );
};
