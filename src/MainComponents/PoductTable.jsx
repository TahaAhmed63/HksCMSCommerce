"use-client"
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, CardHeader, Typography, Avatar, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const ProductTable = ({ products }) => {
    const router = useRouter();
    const handleProductClick = (id) => {
     
        router.push(`/deshboard/Product/edit/${id}`);
    };

    // Define columns for MUI DataGrid
    const columns = [
        { field: 'name', headerName: 'Product Name', width: 200 },
        {
            field: 'featured_image',
            headerName: 'Image',
            width: 100,
            renderCell: (params) =>
                params.value ? (
                    <Avatar
                        alt={params.row.name}
                        src={params.value}
                        variant="rounded"
                        sx={{ width: 48, height: 48 }}
                    />
                ) : (
                    <Avatar variant="rounded" sx={{ width: 48, height: 48 }}>
                        N/A
                    </Avatar>
                ),
        },
        { field: 'price', headerName: 'Price', width: 120, renderCell: (params) => `$${params.value}` },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="text"
                    color="primary"
                    size="small"
                    sx={{ textTransform: 'none' }}
                    onClick={() => handleProductClick(params.row.id)} // Pass the id here
                >
                    Edit
                </Button>
            ),
            sortable: false,
        },
    ];

    // Prepare rows from the products array for DataGrid
    const rows = products.map((product, index) => ({
        id: product.id || index, // Use product id if available, otherwise index as unique ID
        name: product.name,
        featured_image: product.featured_image,
        price: product.price,
    }));

    return (
        <Card sx={{ width: '100%', maxWidth: '100%' }}>
            <CardHeader title={<Typography variant="h6">Products</Typography>} sx={{ pb: 0 }} />
            <CardContent>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        disableSelectionOnClick
                        sx={{
                            '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                            '& .MuiDataGrid-cell': { color: 'text.primary' },
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductTable;
