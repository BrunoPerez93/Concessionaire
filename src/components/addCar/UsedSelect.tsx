import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Label } from '../ui/label';

interface UsedSelectProps {
    used: boolean;
    setUsed: (used: boolean) => void;
}

export const UsedSelect: React.FC<UsedSelectProps> = ({ used, setUsed }) => {

    const handleSelect = (value: string) => {
        setUsed(value === 'usado')
    }
    return (
        <div>
            <Label>Estado</Label>
            <Select onValueChange={handleSelect}>
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
        </div>
    )
}