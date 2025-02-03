"use client"
import React, { useState } from 'react';
import Cookies from 'js-cookie'; // Make sure to install js-cookie package
import Swal from 'sweetalert2'; // Import SweetAlert2

import { useEffect } from 'react'
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

const AttributeForm = () => {
    const [attributeName, setAttributeName] = useState('');
    const [AttributeSlug, setAttributeSlug] = useState('');
    const [attributes, setAttributes] = useState([])
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get token from cookies
        const token = Cookies.get('token'); // Replace 'your_token_name' with your actual cookie name

        try {
            const response = await fetch('http://localhost:3000/api/attributes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include token in headers
                },
                body: JSON.stringify({ name: attributeName ,slug:AttributeSlug}), // Sending attribute name in body
            });

            if (!response.ok) {
                throw new Error('Failed to create attribute');
            }

            const data = await response.json();
            console.log('Attribute created:', data);
            
            // Show success message with SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Attribute created successfully!',
                confirmButtonText: 'Okay',
            });
            fetchAttributes()
            // Optionally reset the form or display a success message
            setAttributeName(''); // Clear input field after successful submission
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
    const handleAttributeClick = (attributeId) => {
        router.push(`/deshboard/variation/create/${attributeId}`);
      };
      const handleAttributeClick2 = (attributeId) => {
        router.push(`/deshboard/Attributes/Edit/${attributeId}`);
      };
      const fetchAttributes = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/attributes/")
          if (!response.ok) throw new Error("Failed to fetch attributes")
          const data = await response.json()
          setAttributes(data)
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch attributes"
          )
        } finally {
          setLoading(false)
        }
      }
    useEffect(() => {
      
    
        fetchAttributes()
      }, [])
      if (loading) return <div className="text-center p-4">Loading...</div>
      if (error) return <div className="text-center text-red-500 p-4">{error}</div>
    return (
        <div className="p-5 bg-gray-100 flex justify-center">
            <div className="w-full max-w-5xl bg-white rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700">Create Attribute</h2>
                <div className="flex justify-center items-left">
                    <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
                        <h2 className="text-lg font-semibold mb-4">Add Attribute</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Attribute Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    value={attributeName}
                                    onChange={(e) => setAttributeName(e.target.value)} // Update state on input change
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Attribute Slug</label>
                                <input
                                    type="text"
                                    placeholder="Enter Slug"
                                    value={AttributeSlug}
                                    onChange={(e) => setAttributeSlug(e.target.value)} // Update state on input change
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
                <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Attribute List</h1>
        <Select defaultValue="this-month">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Option</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributes.map(attribute => (
              <TableRow key={attribute.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{attribute.id}</TableCell>
                <TableCell  onClick={() => handleAttributeClick(attribute.id)}>{attribute.name}</TableCell>
                <TableCell>{attribute.values.map(value => value.value).join(', ')}</TableCell>
                <TableCell>{attribute.option}</TableCell>
                <TableCell>
                  {new Date(attribute.createdOn).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Switch checked={attribute.published} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" onClick={() => handleAttributeClick2(attribute.id)} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
            </div>
        </div>
    );
};

export default AttributeForm;
