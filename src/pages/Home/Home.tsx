import {Button} from '@/shared/Button/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../widgets/ModularWindow/ui/ModularWindow';
import {AuthForm} from '@/features/auth/ui/AuthForm';

export const Home = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Зарегистрироваться</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Регистрация</DialogTitle>
            <AuthForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
