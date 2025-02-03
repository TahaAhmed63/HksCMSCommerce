"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const EditAttributeForm = ({params}) => {
  const router = useRouter();
  const { id } = params; // Extract the id from the router query
  const [attributeName, setAttributeName] = useState('');
  const [AttributeSlug, setAttributeSlug] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the existing attribute data




  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');

    try {
      const response = await fetch(`http://localhost:3000/api/attributes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: attributeName ,slug:AttributeSlug}),
      });

      if (!response.ok) {
        throw new Error('Failed to update attribute');
      }

      const data = await response.json();
      console.log('Attribute updated:', data);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Attribute updated successfully!',
        confirmButtonText: 'Okay',
      });

      router.push('/dashboard/attributes/create'); // Redirect to the attributes list after update
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonText: 'Okay',
      });
    }
  };

//   if (loading) return <div className="text-center p-4">Loading...</div>;
//   if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="p-5 bg-gray-100 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700">Edit Attribute</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Attribute Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={attributeName}
              onChange={(e) => setAttributeName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Attribute Slug</label>
            <input
              type="text"
              placeholder="Enter Slug"
              value={AttributeSlug}
              onChange={(e) => setAttributeSlug(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAttributeForm;
