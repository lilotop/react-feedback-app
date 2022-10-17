type Props = {
  version?: 'primary' | 'secondary';
  type: 'button' | 'submit';
  isDisabled: boolean;
  children: React.ReactNode;
};

function Button({ children, version = 'primary', type, isDisabled }: Props) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
}

export { Button };
