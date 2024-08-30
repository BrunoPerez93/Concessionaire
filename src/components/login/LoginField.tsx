import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface LoginFieldProps {
  htmlFor: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  set: (value: string) => void;
}

export const LoginField: React.FC<LoginFieldProps> = ({ htmlFor, label, type, placeholder, value, set }) => {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        id={htmlFor}
        name={htmlFor}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => set(e.target.value)}
      />
    </div>
  );
};
