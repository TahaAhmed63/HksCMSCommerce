"use client"
import Cookies from 'js-cookie'; // Make sure to install js-cookie package
import { useState,useEffect } from 'react';
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
  import { useRouter } from 'next/navigation';
  import { Eye, Pencil, Trash2 } from 'lucide-react'

const Page = ({ params }) => {
    const [varientName, setvarientName] = useState('');
    const { id } = params;
    console.log(id);
    const [attributesValues, setAttributesValues] = useState([])
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [AttributeSlug, setAttributeSlug] = useState('');

    const [error, setError] = useState(null)
    const attributemainId=parseInt(id)
    const token = Cookies.get('token'); // Replace 'your_token_name' with your actual cookie name

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch('http://localhost:3000/api/AttributeValues/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include token in headers
                },
                body: JSON.stringify({ value: varientName, attribute_id: attributemainId ,slug:AttributeSlug}), // Sending attribute name in body
            });

            if (!response.ok) {
                throw new Error('Failed to create variation');
            }

            const data = await response.json();
            console.log('variation created:', data);
            fetchAttributes()
            // Show success message with SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'variation created successfully!',
                confirmButtonText: 'Okay',
            });
    
      
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
    const fetchAttributes = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/attributes/${attributemainId}`);
          if (!response.ok) throw new Error("Failed to fetch attributes")
          const data = await response.json()
          setAttributesValues(data?.values)
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
      console.log(attributesValues?.values,"attributesValues")
      async function deleteAttribute(attributeId) {
        try {
          const response = await fetch(`http://localhost:3000/api/AttributeValues/${attributeId}`, {
            method: 'DELETE',
          });
       
          if (!response.ok) {
            throw new Error('Failed to delete attribute');
          }
      
          const data = await response.json();
          fetchAttributes()
          console.log('Attribute deleted:', data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    return (
        <div className="p-5 bg-gray-100 flex justify-center">
            <div className="w-full max-w-5xl bg-white rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700">Create Variations</h2>
                <div className="flex justify-center items-left">
                    <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
                        <h2 className="text-lg font-semibold mb-4">Add Variations</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Variant Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={varientName}
                                    onChange={(e) => setvarientName(e.target.value)}
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
                                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md">Save Change</button>
                            </div>
                        </form>
                        <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Variant</TableHead>
          
              <TableHead>Option</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributesValues?.values ?  attributesValues ?.map(attribute => (
              <TableRow key={attribute.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{attribute.id}</TableCell>
                <TableCell  onClick={() => handleAttributeClick(attribute.id)}>{attribute?.value}</TableCell>
        
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
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={()=>{deleteAttribute(attribute.id)}}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )):null}
          </TableBody>
        </Table>
      </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
