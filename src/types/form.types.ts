import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { FieldError, Path, UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';

export interface FormInputProps<T extends Record<string, any>> {
  type: 'text' | 'password' | 'email' | 'date';
  value: string;
  error: FieldError | undefined;
  action: ActionCreatorWithPayload<string>;
  register: UseFormRegisterReturn;
  id: Path<T>;
  placeholder?: string | undefined;
  clearError: UseFormClearErrors<T>;
  label: string;
}
