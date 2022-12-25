import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  value: string;
}

const TextField: FC<InputProps> = ({
  name,
  label,
  value,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <div className="flex items-center flex-col py-2">
      <label className="pr-2 pb-1 w-full text-xs" htmlFor={name}>
        {label}
      </label>
      <input className="p-1 outline-none" id={name} {...rest} />
    </div>
  );
};

export default TextField;
