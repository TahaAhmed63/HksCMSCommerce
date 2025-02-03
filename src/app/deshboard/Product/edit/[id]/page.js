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

import { Input } from "@/components/ui/input"

import Tiptap from "@/MainComponents/Tiptap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useRouter } from 'next/router';

const ProductForm = ({params}) => {
    // const router = useRouter();
    const { id } = params; // Extract the id from the router query
    const [files, setFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [description, setDescription] = useState('');
    const [ProductData, setProductData] = useState('');
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
            const productres = await axios.get(`http://localhost:3000/api/products/${id}`);
            const variationres = await axios.get(`http://localhost:3000/api/Variation?product_id=${id}}`);
            setCategories(categoriesRes.data || []);
            setAttributes(attributesRes.data || []);
            setProductData(productres.data || []);
            setVariations(variationres.data || []);
            console.log(variationres,"variationres")
       // Initialize form data with product data values if availab
            if (ProductData) {
                setFormData({
                    ...formData,
                    name: ProductData?.name || '',
                    sku: ProductData?.sku || '',
                    slug: ProductData?.slug || '',
                    price: ProductData?.price?.toString() || '',
                    regular_price: ProductData?.regular_price?.toString() || '',
                    sale_price: ProductData?.sale_price?.toString() || '',
                    short_description: ProductData?.short_description || '',
                    stock: ProductData?.stock?.toString() || '',
                    weight: ProductData?.weight?.toString() || '',
                });
                setDescription(ProductData?.description || '');
                setImgUrl(ProductData?.featured_image || '');
           

                setSelectedAttributes(ProductData?.attributes || []);
                setSelectedAttributeValues(
                  ProductData?.attribute_values.map(value => ({
                        label: value.value,
                        value: value.id,
                    }))
                );
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    
    };
console.log(ProductData,"ProductDat")
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
    
console.log(formData,"    value={formData.price}")
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
            featured_image: imgUrl,
            weight: formData.weight ? parseFloat(formData.weight) : null,
            status: 'active',
            attributes: {
                connect:  selectedAttributes.map(attr => ({ id: attr.value })),
            },
            attribute_values: {
                connect:selectedAttributeValues.map(attrVal => ({ id: attrVal.value })),
            },
        };

        const productResponse = await axios.post('http://localhost:3000/api/products', payload);
        const createdProductId = productResponse.data.id; // Assuming API returns the product ID in the response

        console.log('Product created successfully:', productResponse.data);
            Swal.fire('Success', 'Product created successfully!', 'success');

 
        // Step 2: If there are variations, send them to the variation API
        if (variations.length > 0) {
            const variationPayload = variations.map(variation => ({
                productId: parseInt(createdProductId),
                attributes_id : selectedAttributes.map(attr => ({ id: attr.value })),
                attributes: variation.attributes.map(attr => ({
                    name: attr.name,
                    value: attr.value,
               slug: attr.name,
                    sku: attr.sku,
             
                    price: attr.price != null ? parseFloat(attr.price) : null,
                    stock: attr.stock != null ? parseInt(attr.stock, 10) : null,
                })),
            }));
        
            try {
                const variationResponse = await axios.post('http://localhost:3000/api/Variation', variationPayload);
                console.log('Variations saved successfully:', variationResponse.data);
                Swal.fire('Success', 'Variations saved successfully!', 'success');

            } catch (error) {
                console.error('Error submitting form:', error.response?.data || error.message);
                Swal.fire('Error', error.response?.data?.message || 'Error creating product', 'error');

            }
        }
        
    } catch (error) {
        console.error('Error submitting form:', error.response?.data || error.message);
    }
};

    
    
      const handleAttributeSelect = (attributeId) => {
        const attribute = attributes.find(a => a.id === Number(attributeId))
        if (!selectedAttributes.find(a => a.id === attribute.id)) {
          setSelectedAttributes([...selectedAttributes, { ...attribute, selectedValues: [] }])
        }
      }
      const handleVariationChange = (variationIndex, attributeIndex, field, value) => {
        const newVariations = [...variations];
        newVariations[variationIndex].attributes[attributeIndex][field] = value;
        setVariations(newVariations);
      };
    
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
        
            <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="variations">Variations</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                
                    defaultValue={ProductData?.name}
                   name="name"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {files?  files?.map((file) => (
                        <div key={file.name} className="relative">
                            <img src={file.preview } alt="Preview" className="h-24 w-full object-cover rounded-lg" />
                            <button onClick={() => removeFile(file)} className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                &times;
                            </button>
                        </div>
                    )):<div  className="relative">
                    <img src={ProductData?.featured_image } alt="Preview" className="h-24 w-full object-cover rounded-lg" />
               
                </div>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      defaultvalue={ProductData?.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Regular Price</Label>
                    <Input
                      id="price"
                      type="number"
                      defaultvalue={ProductData?.price}
                  
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Slug</Label>
                    <Input placeholder="Slug"    name="slug" type="text"         defaultvalue={ProductData?.slug}    onChange={handleInputChange} />

                  </div>
                  <div>
                    <Label htmlFor="price">Weight</Label>
                    <Input placeholder="Weight (kg)" name="weight" type="number"   defaultvalue={ProductData?.weight} onChange={handleInputChange} />
                  </div>
                  <div>
                  <Label htmlFor="price">Sale Price</Label>
                  <Input placeholder="Sale Price ($)" name="sale_price" type="number"  defaultvalue={ProductData?.sale_price} onChange={handleInputChange} />
                  </div>
                  <div>
                  <Label htmlFor="price">Stock</Label>

                  <Input placeholder="Stock Quantity" name="stock" type="number" defaultvalue={ProductData?.regular_price} onChange={handleInputChange} />
                  </div>
                  <div>
                  <Select
                    isMulti
                    options={categories?.map(cat => ({ label: cat?.name, value: cat?.id }))}
                    placeholder="Select Categories"
                    onChange={(selected) => setCategories(categories.map(cat => ({
                        ...cat,
                        isSelected: selected.some(sel => sel.value === cat.id)
                    })))}
                />

                  </div>
                </div>
<div>

<Textarea placeholder="Short Description" id="short_description" name="short_description" onChange={handleInputChange} />
</div>
                <div>
                <h2>Product Description</h2>
                <Tiptap placeholder="Product Description" name="description" onChange={(content) => setDescription(content)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attributes" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                <Select
                    isMulti
                    options={attributes?.map(attr => ({ label: attr?.name, value: attr?.id }))}
                    placeholder="Select Attributes"
                    defaultValue={ProductData?.attributes?.map((e)=>({label:e?.name, value:e?.id }))}
                    onChange={handleAttributeChange}
                />
                  <Select
                    isMulti
                    options={attributeValuesOptions}
                    placeholder="Select Attribute Values"
                    defaultValue={ProductData?.attribute_values?.map((e)=>({label:e?.value, value:e?.id }))}

                    onChange={setSelectedAttributeValues}
                />
                  <Button variant="outline" onClick={generateVariations}>
                    Generate Variations
                  </Button>
                </div>

                {selectedAttributes.map(attribute => (
                  <div key={attribute.value} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{attribute.label}</h3>
                    <div className="flex flex-wrap gap-2">
               
                      {attributes?.map(value => (
                        <label
                          key={value?.id}
                          className="flex items-center space-x-2 border rounded-lg p-2 cursor-pointer hover:bg-muted"
                        >
                             
                          <Checkbox
                            // checked={}
                            onCheckedChange={() => handleAttributeValueToggle(attribute.value, value)}
                          />
                          <span>{value?.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variations" className="space-y-4">
          <Card>
          <CardContent className="pt-6">
              {variations.length > 0 ? (
                <div className="space-y-4">
                  {variations.map((variation, variationIndex) => (
                    <div key={variation.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-4">
                        Variation {variationIndex + 1}: {variation.attributes.map(attr => `${attr.name}: ${attr.value}`).join(' / ')}
                      </h3>
                      <div className="grid gap-4">
                        {ProductData.attributes.map((attr, attrIndex) => (
                          <div key={attrIndex} className="grid grid-cols-3 gap-4">
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
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No variations yet. Select attributes and generate variations first.
                </div>
              )}
            </CardContent>
  </Card>
</TabsContent>

        </Tabs>
        <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" onClick={(e)=>handleSubmit(e)}>Save Product</Button>
      </div>
        </div>
    );
};

export default ProductForm;
