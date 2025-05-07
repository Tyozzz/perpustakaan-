import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth }) {

    const { data, setData, post, errors } = useForm({
        title: '',
        author: '',
        publisher: '',
        year: ''
    });

    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route('books.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Book added successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Book</h2>}
        >
            <Head title="Add Book" />
            <Container>
                <Card title="Create New Book">
                    <form onSubmit={handleStoreData}>
                        <div className="mb-4">
                            <Input label="Title" type="text" value={data.title} onChange={e => setData('title', e.target.value)} errors={errors.title} placeholder="Enter book title" />
                        </div>
                        <div className="mb-4">
                            <Input label="Author" type="text" value={data.author} onChange={e => setData('author', e.target.value)} errors={errors.author} placeholder="Enter author name" />
                        </div>
                        <div className="mb-4">
                            <Input label="Publisher" type="text" value={data.publisher} onChange={e => setData('publisher', e.target.value)} errors={errors.publisher} placeholder="Enter publisher name" />
                        </div>
                        <div className="mb-4">
                            <Input label="Year" type="number" value={data.year} onChange={e => setData('year', e.target.value)} errors={errors.year} placeholder="Enter published year" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="submit" />
                            <Button type="cancel" url={route('books.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
