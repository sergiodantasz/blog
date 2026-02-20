'use client';

import { useActionState, useEffect } from 'react';

import { LogInIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { login } from '@/actions/auth';

export function LoginForm() {
  const initialState = {
    username: '',
    errors: [],
    success: false,
  };
  const [state, action, isPending] = useActionState(login, initialState);
  useEffect(() => {
    toast.dismiss();
    state.errors.forEach((error) => {
      toast.error(error);
    });
  }, [state.errors]);
  const isDisabled = isPending || state.success;
  return (
    <form
      action={action}
      className='flex flex-col gap-4'
    >
      <Input
        type='text'
        labelText='Username'
        name='username'
        placeholder='Type the username...'
        disabled={isDisabled}
        defaultValue={state.username}
      />
      <Input
        type='password'
        labelText='Password'
        name='password'
        placeholder='Type the password...'
        disabled={isDisabled}
      />
      <Button disabled={isDisabled}>
        <LogInIcon />
        Log In
      </Button>
    </form>
  );
}
