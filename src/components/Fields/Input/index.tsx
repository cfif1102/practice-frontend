import { AppDispatch } from '@store';
import { useDispatch } from 'react-redux';

import { FormInputProps } from '@@types';

import { InputStyled } from './styled';

export const FormInput = <T extends Record<string, any>>({
  error,
  type,
  action,
  register,
  value,
  id,
  placeholder,
  clearError,
  label,
}: FormInputProps<T>) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (clearError) {
      clearError(id);
    }

    dispatch(action(e.target.value));
  };

  const hasErrors = error ? { error: true, label: 'Ошибка', helperText: error.message } : null;
  return (
    <InputStyled
      {...hasErrors}
      label={label}
      variant="outlined"
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      {...register}
      onChange={handleInputChange}
      size="small"
    />
  );
};
