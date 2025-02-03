"use client";
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Select from 'react-select';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import Swal from 'sweetalert2';
import { X } from 'lucide-react'

import { Input } from "@/components/ui/input"

import Tiptap from "@/MainComponents/Tiptap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
const VariationItem = ({ variation, variationIndex, handleVariationChange, handleImageDropForVariation, removeVariationImage }) => {
    return (
      <div key={variation.id} className="border rounded-lg p-4 space-y-4">
        <h3 className="font-semibold mb-4">
          Variation {variationIndex + 1}: {variation.attributes.map(attr => `${attr.name}: ${attr.value}`).join(' / ')}
        </h3>
        <div className="grid gap-4">
          {variation.attributes.map((attr, attrIndex) => (
            <div key={attrIndex} className="space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>{attr.name}: SKU</Label>
                  <Input
                    value={attr.sku}
                    onChange={(e) => handleVariationChange(variationIndex, attrIndex, 'sku', e.target.value)}
                    placeholder="Enter SKU"
                  />
                </div>
                <div>
                  <Label>{attr.name}: Price</Label>
                  <Input
                    type="number"
                    value={attr.price}
                    onChange={(e) => handleVariationChange(variationIndex, attrIndex, 'price', e.target.value)}
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <Label>{attr.name}: Stock</Label>
                  <Input
                    type="number"
                    value={attr.stock}
                    onChange={(e) => handleVariationChange(variationIndex, attrIndex, 'stock', e.target.value)}
                    placeholder="Enter stock"
                  />
                </div>
              </div>
              <div>
                <Label>Image for {attr.name}</Label>
                <div
                  className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                  {...useDropzone({
                    onDrop: (acceptedFiles) => handleImageDropForVariation(variationIndex, attrIndex, acceptedFiles),
                    accept: 'image/*',
                    maxFiles: 1,
                  }).getRootProps()}
                >
                  <input {...useDropzone({
                    onDrop: (acceptedFiles) => handleImageDropForVariation(variationIndex, attrIndex, acceptedFiles),
                    accept: 'image/*',
                    maxFiles: 1,
                  }).getInputProps()} />
                  
                  {attr.variation_image ? (
                    <div className="relative">
                      <img 
                        src={attr.variation_image.preview} 
                        alt={`${attr.name} variation`} 
                        className="h-32 w-full object-cover rounded-lg"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeVariationImage(variationIndex, attrIndex);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Drop or click to upload image for {attr.name}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
const ProductForm = () => {
    const [files, setFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [description, setDescription] = useState('');
    const [variations, setVariations] = useState([])
    const [imgUrl, setImgUrl] = useState('');
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [attributeValuesOptions, setAttributeValuesOptions] = useState([]);
    const [selectedAttributeValues, setSelectedAttributeValues] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        slug: '',
        price: '',
        regular_price: '',
        sale_price: '',
        short_description:'',
        stock: '',
        weight: '',
    });

    const fetchData = async () => {
        try {
            const categoriesRes = await axios.get('http://localhost:3000/api/categories');
            const attributesRes = await axios.get('http://localhost:3000/api/attributes');
            setCategories(categoriesRes.data || []);
            setAttributes(attributesRes.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const generateVariations = () => {
        if (!selectedAttributes.length || !selectedAttributeValues.length) {
            Swal.fire('Warning', 'Please select attributes and values before generating variations.', 'warning');
            return;
        }
      console.log(selectedAttributeValues,"selectedAttributeValues")
        const combinations = selectedAttributeValues.reduce((acc, value) => {
          const newCombinations = [];
          acc.forEach(combination => {
            newCombinations.push([...combination, value]);
          });
          return newCombinations.length ? newCombinations : [[value]];
        }, []);
      
        const newVariations = combinations.map((combination, index) => ({
          id: index,
          attributes: combination.map(attrValue => ({
            name: attrValue.label,
            attribute_id: attrValue.id,
            value: attrValue.value,
            sku: '',
            price: '',
            stock: '',
            variation_image: null,
          })),
       
        }));
      
        setVariations(newVariations);
        Swal.fire('Success', 'Variations generated successfully!', 'success');

      };
    
      
 ;
    // Fetch categories and attributes on mount
    useEffect(() => {
        fetchData();
    }, []);

    // Handle file drop and upload
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
console.log(selectedAttributes,"selectedAttributes")
    // Handle attribute selection and load values for selected attributes
    const handleAttributeChange = async (selected) => {
        setSelectedAttributes(selected);

        const newAttributeValues = [];
        for (const attr of selected) {
            const res = await axios.get(`http://localhost:3000/api/attributes/${attr.value}/`);
            newAttributeValues.push(...(res.data?.values || []).map(value => ({
                label: value.value,
                value: value.id,
            })));
        }
        setAttributeValuesOptions(newAttributeValues);
        setSelectedAttributeValues([]);
    };
// Handle image drop for a specific variation
// Handle image drop for a specific variation
const handleImageDropForVariation = (variationIndex, attributeIndex, acceptedFiles) => {
    setVariations(prevVariations => {
      const updatedVariations = [...prevVariations]
      updatedVariations[variationIndex].attributes[attributeIndex].variation_image = {
        file: acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0])
      }
      return updatedVariations
    })
  }

  const removeVariationImage = (variationIndex, attributeIndex) => {
    setVariations(prevVariations => {
      const updatedVariations = [...prevVariations]
      const variation = updatedVariations[variationIndex]
      const attribute = variation.attributes[attributeIndex]
      
      if (attribute.variation_image?.preview) {
        URL.revokeObjectURL(attribute.variation_image.preview)
      }
      
      attribute.variation_image = null
      return updatedVariations
    })
  }

// Generate individual dropzone for each variation



    console.log(attributeValuesOptions,"attributeValuesOptions")
    function generateSlug(text) {
        return text
          .toString()                   // Ensure it's a string
          .toLowerCase()                // Convert to lowercase
          .trim()                       // Remove whitespace from both ends
          .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
          .replace(/\s+/g, '-')         // Replace spaces with hyphens
          .replace(/-+/g, '-');         // Remove any duplicate hyphens
      }
    // Handle form data input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      
        }));
    
        //
      };
      useEffect(() => {
        setFormData((prevData) => ({
          ...prevData,
          slug: generateSlug(prevData.name),
        }));
      }, [formData.name]);
    
console.log(categories," catagories")
    // Handle form submission using JSON
 // Handle form submission using JSON
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Step 1: Send product data to the product API
        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            regular_price: formData.regular_price ? parseFloat(formData.regular_price) : null,
            sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
            stock: parseInt(formData.stock, 10),
            description: description,
            // category_id:JSON.stringify(categories.map(cat=>cat?.id)),
            featured_image: imgUrl,
            weight: formData.weight ? parseFloat(formData.weight) : null,
            status: 'active',
            category:{
               connect:  categories.map(cat => ({ id: cat.id })),
 
            },
            attributes: {
                connect:  selectedAttributes.map(attr => ({ id: attr.value })),
            },
         
            attribute_values: {
                connect:selectedAttributeValues.map(attrVal => ({ id: attrVal.value })),
            },
        };
        console.log(variations)
// Handle image drop for a specific variation
// Handle image drop for a specific variation

// Remove the image from a specific variation


        const productResponse = await axios.post('http://localhost:3000/api/products', payload);
        const createdProductId = productResponse.data.id; // Assuming API returns the product ID in the response

        console.log('Product created successfully:', productResponse.data);
            Swal.fire('Success', 'Product created successfully!', 'success');

 
        // Step 2: If there are variations, send them to the variation API
        if (variations.length > 0) {
            const variationPayload = await Promise.all(variations.map(async (variation) => {
              const attributesWithImages = await Promise.all(variation.attributes.map(async (attr) => {
                let variationImageUrl = ''
                if (attr.variation_image?.file) {
                  const formData = new FormData()
                  formData.append('image', attr.variation_image.file)
                  const uploadResponse = await axios.post('/api/Upload', formData)
                  if (uploadResponse.data.success) {
                    variationImageUrl = `http://localhost:3000/${uploadResponse.data.filePath}`
                  }
                }
    
                return {
                  name: attr.name,
                  value: attr.value,
                  slug: attr.name,
                  sku: attr.sku,
                  variation_image: variationImageUrl,
                  price: attr.price != null ? parseFloat(attr.price) : null,
                  stock: attr.stock != null ? parseInt(attr.stock, 10) : null,
                }
              }))
    
              return {
                productId: parseInt(createdProductId),
                attributes_id: selectedAttributes.map(attr => ({ id: attr.value })),
                attributes: attributesWithImages,
              }
            }))
    
            try {
              const variationResponse = await axios.post('http://localhost:3000/api/Variation', variationPayload)
              console.log('Variations saved successfully:', variationResponse.data)
              Swal.fire('Success', 'Variations saved successfully!', 'success')
            } catch (error) {
              console.error('Error submitting form:', error.response?.data || error.message)
              Swal.fire('Error', error.response?.data?.message || 'Error creating product', 'error')
            }
          }
        } catch (error) {
          console.error('Error submitting form:', error.response?.data || error.message)
        }
};

    
    
      const handleAttributeSelect = (attributeId) => {
        const attribute = attributes.find(a => a.id === Number(attributeId))
        if (!selectedAttributes.find(a => a.id === attribute.id)) {
          setSelectedAttributes([...selectedAttributes, { ...attribute, selectedValues: [] }])
        }
      }
      const handleVariationChange = (variationIndex, attributeIndex, field, value) => {
        setVariations(prevVariations => {
          const newVariations = [...prevVariations]
          newVariations[variationIndex].attributes[attributeIndex][field] = value
          return newVariations
        })
      }
    

    
      const createDropzoneForVariation = useCallback((variationIndex) => {
        return useDropzone({
          onDrop: (acceptedFiles) => handleImageDropForVariation(variationIndex, acceptedFiles),
          accept: 'image/*',
        });
      }, []);
    
      const handleAttributeValueToggle = (attributeId, value) => {
        setSelectedAttributes(selectedAttributes.map(attr => {
          if (attr.id === attributeId) {
            const selectedValues = attr.selectedValues.includes(value)
              ? attr.selectedValues.filter(v => v !== value)
              : [...attr.selectedValues, value]
            return { ...attr, selectedValues }
          }
          return attr
        }))
      }
    
    const removeFile = (file) => {
        setFiles(files.filter((f) => f !== file));
    };
console.log(variations,"variations")
    return (
        <div className="p-8 bg-gray-100 min-h-screen flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6">
            <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="flex space-x-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="attributes">Attributes</TabsTrigger>
                    <TabsTrigger value="variations">Variations</TabsTrigger>
                </TabsList>
    
                {/* General Tab */}
                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardContent className="space-y-6">
                            {/* Product Name and SKU Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input
                                        id="sku"
                                        name="sku"
                                        value={formData.sku}
                                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                    />
                                </div>
                            </div>
    
                            {/* Dropzone for Image Upload */}
                            <div {...getRootProps()} className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p className="text-gray-600">Drop the images here...</p>
                                ) : (
                                    <p className="text-gray-600">Drop your images here, or <span className="text-orange-500 font-semibold">click to browse</span></p>
                                )}
                                <p className="text-sm text-gray-400">1600 x 1200 (4:3) recommended. PNG, JPG, and GIF files are allowed.</p>
    
                                {/* Preview Selected Files */}
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {files.map((file) => (
                                        <div key={file.name} className="relative">
                                            <img src={file.preview} alt="Preview" className="h-24 w-full object-cover rounded-lg" />
                                            <button onClick={() => removeFile(file)} className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
    
                            {/* Price, Slug, Weight, etc. Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="price">Regular Price</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        type="text"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="weight">Weight</Label>
                                    <Input
                                        id="weight"
                                        name="weight"
                                        type="number"
                                        placeholder="Weight (kg)"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="sale_price">Sale Price</Label>
                                    <Input
                                        id="sale_price"
                                        name="sale_price"
                                        type="number"
                                        placeholder="Sale Price ($)"
                                        value={formData.sale_price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        placeholder="Stock Quantity"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="categories">Categories</Label>
                                    <Select
                                        isMulti
                                        options={categories?.map(cat => ({ label: cat?.name, value: cat?.id }))}
                                        placeholder="Select Categories"
                                        onChange={(selected) =>
                                            setCategories(
                                                categories.map(cat => ({
                                                    ...cat,
                                                    isSelected: selected.some(sel => sel.value === cat.id),
                                                }))
                                            )
                                        }
                                    />
                                </div>
                            </div>
    
                            {/* Short Description */}
                            <div>
                                <Label htmlFor="short_description">Short Description</Label>
                                <Textarea
                                    id="short_description"
                                    name="short_description"
                                    value={formData.short_description}
                                    onChange={handleInputChange}
                                />
                            </div>
    
                            {/* Product Description */}
                            <div>
                                <Label>Product Description</Label>
                                <Tiptap
                                    placeholder="Product Description"
                                    name="description"
                                    initialValue={description}
                                    onChange={(content) => setDescription(content)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
    
                {/* Attributes Tab */}
                <TabsContent value="attributes" className="space-y-4">
                    <Card>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <Select
                                    isMulti
                                    options={attributes?.map(attr => ({ label: attr?.name, value: attr?.id }))}
                                    placeholder="Select Attributes"
                                    onChange={handleAttributeChange}
                                />
                                <Select
                                    isMulti
                                    options={attributeValuesOptions}
                                    placeholder="Select Attribute Values"
                                    onChange={setSelectedAttributeValues}
                                />
                                <Button variant="outline" onClick={generateVariations}>
                                    Generate Variations
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
    
                {/* Variations Tab */}
           
                <TabsContent value="variations" className="space-y-4">
            <Card>
              <CardContent className="space-y-4">
                {variations.length > 0 ? (
                  variations.map((variation, variationIndex) => (
                    <VariationItem
                      key={variation.id}
                      variation={variation}
                      variationIndex={variationIndex}
                      handleVariationChange={handleVariationChange}
                      handleImageDropForVariation={handleImageDropForVariation}
                      removeVariationImage={removeVariationImage}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No variations yet. Select attributes and generate variations first.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>




            </Tabs>
    
            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Save Product</Button>
            </div>
        </form>
    </div>
    
    );
};

export default ProductForm;
