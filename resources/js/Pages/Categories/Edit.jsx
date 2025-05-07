import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Edit({ auth }) {
    // Ambil data category dari props
    const { category } = usePage().props;

    // State form untuk update
    const { data, setData, post, errors } = useForm({
        category: category.category,
        _method: 'put'
    });

    // Fungsi untuk submit update
    const handleUpdateData = async (e) => {
        e.preventDefault();

        post(route('categories.update', category.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Category updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Category</h2>}
        >
            <Head title="Edit Category" />
            <Container>
                <Card title="Edit Category">
                    <form onSubmit={handleUpdateData}>
                        <div className="mb-4">
                            <Input 
                                label="Category Name" 
                                type="text" 
                                value={data.category} 
                                onChange={e => setData('category', e.target.value)} 
                                errors={errors.category} 
                                placeholder="Input category name..." 
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="submit">Update</Button>
                            <Button type="cancel" url={route('categories.index')}>Cancel</Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
