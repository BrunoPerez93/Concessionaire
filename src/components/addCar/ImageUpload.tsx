import React, { ChangeEvent, useCallback, useState, useEffect } from 'react'
import { Input } from '../ui/input';
import Image from 'next/image';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Trash2Icon } from 'lucide-react';

interface ImageUploadProps {
    onUpload: (files: File[]) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const fileArray = Array.from(selectedFiles);
            setFiles((prevFiles) => [...prevFiles, ...fileArray]); 
        }
    }, []);

    const handleDelete = useCallback((index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); 
    }, []);

    useEffect(() => {
        onUpload(files); 
    }, [files, onUpload]);

    return (
        <div className='space-y-3'>
            <div>
                <Label>Charge Images</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className='file-input'
                    multiple
                />
            </div>
            <div className='gap-3 flex flex-wrap'>
                {files.map((file, index) => (
                    <div key={index} className='relative w-32 h-32'>
                        <Image
                            src={URL.createObjectURL(file)}
                            alt={`Selected Image ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <Button
                            onClick={() => handleDelete(index)}
                            className='absolute top-0 right-0 bg-transparent hover:bg-red-300 text-gray-900'
                        >
                            <Trash2Icon />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
