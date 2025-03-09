import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { AppDispatch } from '@store';
import { useId } from 'react';
import { useDispatch } from 'react-redux';

import { FormInputProps } from '@@types';

import { SelectStyled } from './styled';

interface SelectProps<T extends Record<string, any>, K extends Record<string, any>>
  extends Pick<FormInputProps<T>, 'action' | 'register' | 'clearError' | 'label' | 'error' | 'id'> {
  data: K[];
  ids: keyof K;
  value: keyof K;
  selectedId: K[keyof K];
}

export const FormSelect = <T extends Record<string, any>, K extends Record<string, any>>({
  error,
  action,
  register,
  clearError,
  label,
  id,
  selectedId,
  ids,
  value,
  data,
}: SelectProps<T, K>) => {
  const dispatch = useDispatch<AppDispatch>();
  const itemId = useId();

  const handleChange = (e: SelectChangeEvent<any>) => {
    if (clearError) {
      clearError(id);
    }

    dispatch(action(+e.target.value));
  };

  const hasErrors = error ? { error: true } : null;

  return (
    <SelectStyled {...hasErrors}>
      <InputLabel id={itemId}>{label}</InputLabel>
      <Select {...register} value={selectedId} label={label} onChange={handleChange} id={itemId}>
        {data.map((item) => {
          return (
            <MenuItem value={item[ids]} key={item[ids]}>
              {item[value].toString()}
            </MenuItem>
          );
        })}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </SelectStyled>
  );
};
