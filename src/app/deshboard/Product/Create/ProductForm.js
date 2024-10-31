"use client"

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import Tiptap from "@/MainComponents/Tiptap"
const ProductForm = () => {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]); // Add the file to the form data

        setFiles(acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        ));
        
        axios.post('/api/Upload', formData)
        .then(response => {
          if (response.data.success) {
            console.log('File uploaded successfully:', response.data.filePath);
            // Do something with the file path, like updating state or displaying the image
          } else {
            console.error('File upload failed:', response.data.message);
          }
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png, image/gif',
        maxFiles: 5,
    });

    const removeFile = (file) => {
        setFiles(files.filter((f) => f !== file));
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700">Create Product</h2>

                {/* Dropzone for Image Upload */}
                <div {...getRootProps()} className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-gray-600">Drop the images here...</p>
                    ) : (
                        <p className="text-gray-600">
                            Drop your images here, or <span className="text-orange-500 font-semibold">click to browse</span>
                        </p>
                    )}
                    <p className="text-sm text-gray-400">1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed.</p>
                </div>

                {/* Preview Selected Files */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {files.map((file) => (
                        <div key={file.name} className="relative">
                            <img src={file.preview} alt="Preview" className="h-24 w-full object-cover rounded-lg" />
                            <button
                                onClick={() => removeFile(file)}
                                className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                {/* Product Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Product Name" label="Product Name" className="w-full" />
                    <Select label="Product Category" className="w-full">
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Product Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* Replace with dynamic category options */}
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input placeholder="Brand Name" label="Brand" className="w-full" />
                    <Input placeholder="Weight (in gm & kg)" label="Weight" className="w-full" />
                    <Select label="Attribute" className="w-full">
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Attribute" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gender">Select Gender</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Size and Color Options */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-600">Size</label>
                        <div className="flex gap-2 mt-2">
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map(size => (
                                <button key={size} className="px-2 py-1 border rounded-md text-gray-700 bg-white hover:bg-gray-200">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600">Colors</label>
                        <div className="flex gap-2 mt-2">
                            {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#800080'].map(color => (
                                <div key={color} className="h-6 w-6 rounded-full" style={{ backgroundColor: color }} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Description */}
                {/* <Textarea placeholder="Short description about the product" label="Description" className="w-full" /> */}
                <Tiptap />
                {/* Tag Number, Stock, Tag */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="Tag Number" label="Tag Number" className="w-full" />
                    <Input placeholder="Quantity" label="Stock" type="number" className="w-full" />
                    <Input placeholder="Tag" label="Tag" className="w-full" />
                </div>

                {/* Pricing Details */}
                <div className="grid grid-cols-3 gap-4">
                    <Input placeholder="Price ($)" label="Price ($)" type="number" className="w-full" />
                    <Input placeholder="Discount (%)" label="Discount (%)" type="number" className="w-full" />
                    <Input placeholder="Tax (%)" label="Tax (%)" type="number" className="w-full" />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <Button variant="outline" className="bg-red-500 text-white">Cancel</Button>
                    <Button className="bg-blue-500 text-white">Create Product</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
