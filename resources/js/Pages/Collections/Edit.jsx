import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Edit({ auth }) {

    // Ambil data collection dari props inertia
    const { collection } = usePage().props;

    // Setup form data dengan method PUT
    const { data, setData, post, errors } = useForm({
        user: collection.user,
        book: collection.book,
        _method: 'put'
    });

    // Handle submit update
    const handleUpdateData = async (e) => {
        e.preventDefault();

        post(route('collections.update', collection.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Collection updated successfully!',
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Collection</h2>}
        >
            <Head title="Edit Collection" />
            <Container>
                <Card title="Edit Collection">
                    <form onSubmit={handleUpdateData}>
                        <div className="mb-4">
                            <Input 
                                label="User" 
                                type="text" 
                                value={data.user} 
                                onChange={e => setData('user', e.target.value)} 
                                errors={errors.user} 
                                placeholder="Enter user name..." 
                            />
                        </div>
                        <div className="mb-4">
                            <Input 
                                label="Book" 
                                type="text" 
                                value={data.book} 
                                onChange={e => setData('book', e.target.value)} 
                                errors={errors.book} 
                                placeholder="Enter book title..." 
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="submit">Update</Button>
                            <Button type="cancel" url={route('collections.index')}>Cancel</Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
