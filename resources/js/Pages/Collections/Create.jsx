import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth, users, books }) {

    const { data, setData, post, errors } = useForm({
        user_id: '',
        book_id: '',
    });

    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route('collections.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data created successfully!',
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
                <Card title="Create new collection">
                    <form onSubmit={handleStoreData}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">User</label>
                            <select
                                value={data.user_id}
                                onChange={(e) => setData('user_id', e.target.value)}
                                className="w-full border rounded p-2"
                            >
                                <option value="">-- Select User --</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            {errors.user_id && <div className="text-red-600 text-sm">{errors.user_id}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Book</label>
                            <select
                                value={data.book_id}
                                onChange={(e) => setData('book_id', e.target.value)}
                                className="w-full border rounded p-2"
                            >
                                <option value="">-- Select Book --</option>
                                {books.map(book => (
                                    <option key={book.id} value={book.id}>{book.title}</option>
                                ))}
                            </select>
                            {errors.book_id && <div className="text-red-600 text-sm">{errors.book_id}</div>}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button type="submit">Save</Button>
                            <a href={route('collections.index')}>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </a>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
