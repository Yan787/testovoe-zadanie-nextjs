import { z } from 'zod';
import { EMAIL_VALIDATION, NAME_VALIDATION, PASSWORD_VALIDATION, COUNTRY_VALIDATION, CITY_VALIDATION} from './validation';

export const authValidation = z.object({
    name: NAME_VALIDATION,
    country: COUNTRY_VALIDATION,
    city: CITY_VALIDATION,
    email: EMAIL_VALIDATION,
    password: PASSWORD_VALIDATION,
});