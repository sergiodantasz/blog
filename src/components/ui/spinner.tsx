type SpinnerProps = {
  size?: number;
};

export function Spinner({ size = 32 }: SpinnerProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className='animate-spin rounded-full border-4 border-stone-500 border-r-transparent'
    />
  );
}
