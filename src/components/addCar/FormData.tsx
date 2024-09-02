'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FormField } from './FormField'
import { UsedSelect } from './UsedSelect'
import { Button } from '../ui/button'
import { ImageUpload } from './ImageUpload'

export const FormData = () => {
    const [brand, setBrand] = useState<string>('')
    const [model, setModel] = useState<string>('')
    const [year, setYear] = useState<number>(0)
    const [km, setKm] = useState<number>(0)
    const [used, setUsed] = useState<boolean>(false)
    const [images, setImages] = useState<File[]>([]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ brand, model, year, km, used, images });
    }

    return (
        <form className='space-y-5' onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-5 '>
                <FormField htmlFor="brand" type="text" name="brand" id="brand" placeholder="Enter the brand" value={brand} set={setBrand} label="Marca" />
                <FormField htmlFor="model" type="text" name="model" id="model" placeholder="Enter the model" value={model} set={setModel} label="Modelo" />
                <FormField htmlFor="year" type="number" name="year" id="year" placeholder="Enter the year" value={year} set={setYear} label="Año" />
                <FormField htmlFor="km" type="number" name="km" id="km" placeholder="Enter the km" value={km} set={setKm} label="KM" />
            </div>
            <UsedSelect used={used} setUsed={setUsed} />
            <ImageUpload onUpload={(files) => setImages(files)} />
            <Button type="submit" className='w-full bg-cyan-900 text-white'>Agregar</Button>
        </form>
    )
}
