"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie'; // Make sure to install js-cookie package
import Swal from 'sweetalert2'; // Import SweetAlert2

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
const Categories = ({params}) => {
  const {id}=params
  const [categoryName, setCategoryName] = useState('');
  const [categorySlug, setCategorySlug] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ImgUrl,setImgUrl]=useState('')
  const [files,setFiles]=useState([])

  const router = useRouter();
  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);

    setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
    })));

    axios.post('/api/Upload', formData)
        .then(response => {
            if (response.data.success) {
                console.log('File uploaded successfully:', response.data.filePath);
                setImgUrl(`http://localhost:3000/${response?.data?.filePath}`);
            } else {
                console.error('File upload failed:', response.data.message);
            }
        })
        .catch(error => console.error('Error uploading file:', error));
}, []);

const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/gif',
    maxFiles: 5,
});

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get token from cookies
    const token = Cookies.get('token'); // Replace 'your_token_name' with your actual cookie name

    try {
      const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify({ name: categoryName, slug: categorySlug, description,catimage:ImgUrl }), // Sending category data in body
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const data = await response.json();
      console.log('Category created:', data);
      
      // Show success message with SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Category created successfully!',
        confirmButtonText: 'Okay',
      });
      fetchCategories();
      setCategoryName(''); // Clear input field after successful submission
      setCategorySlug('');
      setDescription('');
    } catch (error) {
      console.error('Error:', error);
      // Handle error (show error message, etc.)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonText: 'Okay',
      });
    }
  };

  // Delete category









  return (
    <div className="p-5 bg-gray-100 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Create Category</h2>
        <div className="flex justify-center items-left">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
            <h2 className="text-lg font-semibold mb-4">Add Category</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)} // Update state on input change
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
             
              </div>
              <div {...getRootProps()} className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-gray-600">Drop the images here...</p>
                    ) : (
                        <p className="text-gray-600">Drop your images here, or <span className="text-orange-500 font-semibold">click to browse</span></p>
                    )}
                    <p className="text-sm text-gray-400">1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed.</p>
                </div>

                {/* Preview Selected Files */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {files.map((file) => (
                        <div key={file.name} className="relative">
                            <img src={file.preview} alt="Preview" className="h-24 w-full object-cover rounded-lg" />
                            <button onClick={() => removeFile(file)} className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} // Update state on input change
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category Slug</label>
                <input
                  type="text"
                  placeholder="Enter Slug"
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)} // Update state on input change
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit" // Ensure the button submits the form
                  className="bg-orange-500 text-white px-4 py-2 rounded-md"
                >
                  Save Change
                </button>
              </div>
            </form>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Categories;
