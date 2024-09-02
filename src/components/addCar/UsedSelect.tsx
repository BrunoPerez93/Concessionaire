import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

interface UsedSelectProps {
    used: boolean | undefined;
    setUsed: (used: boolean | undefined) => void;
    error: string;
}

export const UsedSelect: React.FC<UsedSelectProps> = ({ used, setUsed, error }) => {
    const handleSelect = (value: string) => {
        setUsed(value === 'usado');
    };

    return (
        <div>
            <Label>Estado</Label>
            <Select onValueChange={handleSelect} value={used === undefined ? 'placeholder' : (used ? 'usado' : 'nuevo')}>
                <SelectTrigger>
                    <SelectValue placeholder="Seleccione el estado" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="placeholder" disabled>Seleccione uno</SelectItem>
                        <SelectItem value="nuevo">Nuevo</SelectItem>
                        <SelectItem value="usado">Usado</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    );
};
