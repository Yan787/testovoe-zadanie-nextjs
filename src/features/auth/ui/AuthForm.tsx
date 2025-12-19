'use client';
import {useForm, SubmitHandler} from 'react-hook-form';
import {IAuthFormSchema} from '../model/authFormSchema';
import {Field} from '@/shared/Field/ui/Field';
import {zodResolver} from '@hookform/resolvers/zod';
import {authValidation} from '../model/constants';
import {Button} from '@/shared/Button/ui/Button';

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<IAuthFormSchema>({
    resolver: zodResolver(authValidation),
  });

  const submitHandler: SubmitHandler<IAuthFormSchema> = (data) => {
    console.log(data); //submit to server
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <Field {...register('name')} placeholder="имя" error={errors.name} />
      </div>
      <div>
        <Field {...register('country')} placeholder="страна" error={errors.country} />
      </div>
      <div>
        <Field {...register('city')} placeholder="город" error={errors.city} />
      </div>
      <div>
        <Field {...register('email')} placeholder="электронная почта" error={errors.email} />
      </div>
      <div>
        <Field
          {...register('password')}
          placeholder="пароль"
          type="password"
          error={errors.password}
        />
      </div>
      <Button className="mt-2.5" type="submit" variant="default">
        Зарегистрироваться
      </Button>
    </form>
  );
};
