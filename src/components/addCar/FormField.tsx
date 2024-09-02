import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { HTMLInputTypeAttribute } from 'react'

type FormFieldProps<T> = {
    htmlFor: string,
    label: string,
    id: string,
    type: HTMLInputTypeAttribute,
    placeholder: string,
    name: string,
    value: T,
    set: (value: T) => void
}

export const FormField = <T extends string | number>({ htmlFor, label, id, type, placeholder, name, value, set }: FormFieldProps<T>) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (type === "number") {
            const numericValue = inputValue ? Number(inputValue) : 0;
            set(numericValue as T);
        } else {
            set(inputValue as T);
        }
    };

    return (
        <div>
            <Label htmlFor={htmlFor}> {label}</Label>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                name={name}
                value={type === "number" ? value.toString() : value}
                onChange={handleChange}
            />
        </div>
    )
}
