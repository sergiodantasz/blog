import { Menu } from '@/components/ui/admin/menu';

type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <>
      <Menu />
      {children}
      {modal}
    </>
  );
}
