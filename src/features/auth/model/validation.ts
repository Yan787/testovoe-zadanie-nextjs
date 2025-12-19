import * as z from 'zod';
import { NAME_RULE, EMAIL_RULE, PASSWORD_RULE, COUNTRY_RULE, CITY_RULE } from './regex';

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 16;

export const NAME_VALIDATION = z
  .string()
  .nonempty('Введите пожалуйста имя')
  .regex(NAME_RULE, 'Имя должно содержать только буквы, дефис или пробел');

export const COUNTRY_VALIDATION = z
  .string()
  .nonempty('Введите пожалуйста страну')
  .min(2, 'Поле страна должно содержать как минимум 2 символа')
  .regex(COUNTRY_RULE, 'страна должно содержать только буквы, дефис или пробел');

export const CITY_VALIDATION = z
  .string()
  .nonempty('Введите пожалуйста город')
  .min(2, 'Поле город должно содержать как минимум 2 символа')
  .regex(CITY_RULE, 'Город должно содержать только буквы, дефис или пробел');

export const EMAIL_VALIDATION = z
  .string()
  .nonempty('Необходимо ввести электронная почта')
  .regex(EMAIL_RULE, 'Неверный формат электронной почты');

  export const PASSWORD_VALIDATION = z
  .string()
  .nonempty('Необходимо ввести пароль')
  .min(PASSWORD_MIN_LENGTH, 'Пароль должен содержать не менее 8 символов')
  .max(PASSWORD_MAX_LENGTH, 'Пароль должен содержать не более 16 символов')
  .regex(PASSWORD_RULE, 'Пароль должен содержать как минимум одну цифру и один специальный символ (!@#$%^&*)');