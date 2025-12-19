import { DeepMap, FieldError, FieldValues } from "react-hook-form";
export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}
type FieldErrors<TFieldValues extends FieldValues = FieldValues> =
  DeepMap<TFieldValues, FieldError> & IFieldProps

export type IField = FieldErrors