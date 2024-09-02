'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FormField } from './FormField'
import { UsedSelect } from './UsedSelect'
import { Button } from '../ui/button'
import { ImageUpload } from './ImageUpload'
import { useRouter } from 'next/navigation'

export const FormData = () => {
    const [brand, setBrand] = useState<string>('')
    const [model, setModel] = useState<string>('')
    const [year, setYear] = useState<number>(0)
    const [km, setKm] = useState<number>(0)
    const [used, setUsed] = useState<boolean | undefined>(undefined);
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<{ [key: string]: string }>({});
    const redirect = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = true;
        const errors: { [key: string]: string } = {};

        if (!brand.trim()) {
            errors.brand = 'Brand cant be empty';
            isValid = false;
        }
        if (!model.trim()) {
            errors.model = 'Model cant be empty';
            isValid = false;
        }
        if (year <= 0) {
            errors.year = 'Year cant be 0 or empty';
            isValid = false;
        }
        if (used === undefined) {
            errors.used = "Select a state"
            isValid = false;
        }

        setError(errors)
        if (isValid) {
            try {
                const imageData = await Promise.all(
                    images.map(async (file) => {
                        return new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result);
                            reader.onerror = reject;
                            reader.readAsDataURL(file);
                        });
                    })
                );

                const response = await fetch('/api/saveCars', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        brand,
                        model,
                        year,
                        km,
                        used,
                        images: imageData,
                    }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    console.error('Error:', data.message);
                    return;
                }

                const data = await response.json();
                console.log('Success:', data);
                redirect.push('/autos')

                setBrand('');
                setModel('');
                setYear(0);
                setKm(0);
                setUsed(undefined);
                setImages([]);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

        return isValid;
    };

    return (
        <form className='space-y-5' onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-5 '>
                <FormField htmlFor="brand" type="text" name="brand" id="brand" placeholder="Enter the brand" value={brand} set={setBrand} label="Marca" error={error.brand} />
                <FormField htmlFor="model" type="text" name="model" id="model" placeholder="Enter the model" value={model} set={setModel} label="Modelo" error={error.model} />
                <FormField htmlFor="year" type="number" name="year" id="year" placeholder="Enter the year" value={year} set={setYear} label="Año" error={error.year} />
                <FormField htmlFor="km" type="number" name="km" id="km" placeholder="Enter the km" value={km} set={setKm} label="KM" />
            </div>
            <UsedSelect used={used} setUsed={setUsed} error={error.used} />
            <ImageUpload onUpload={(files) => setImages(files)} />
            <Button type="submit" className='w-full bg-cyan-900 text-white'>Agregar</Button>
        </form>
    )
}
