import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth }) {

    // define state with Inertia useForm
    const { data, setData, post, errors } = useForm({
        user: '',
        book: ''
    });

    // define method to store data
    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route('collections.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Collection created successfully!',
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Collection</h2>}
        >
            <Head title="Create Collection" />
            <Container>
                <Card title="Create New Collection">
                    <form onSubmit={handleStoreData}>
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
                            <Button type="submit">Save</Button>
                            <Button type="cancel" url={route('collections.index')}>Cancel</Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
