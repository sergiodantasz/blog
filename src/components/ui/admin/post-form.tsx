import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export function PostForm() {
  return (
    <form className='flex flex-col gap-4'>
      <Input
        type='text'
        labelText='Name'
        placeholder='Type your name...'
      />
      <Input
        type='text'
        labelText='Surname'
        placeholder='Type your surname...'
      />
      <Checkbox labelText='Published?' />
      <Button>Create</Button>
    </form>
  );
}
