import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth, users, books }) {
    const { data, setData, post, errors } = useForm({
        user_id: '',
        book_id: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('collections.store'), {
            onSuccess: () => {
                Swal.fire('Success', 'Collection added!', 'success');
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Create Collection</h2>}>
            <Head title="Create Collection" />
            <Container>
                <Card title="New Collection">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label>User</label>
                            <select value={data.user_id} onChange={e => setData('user_id', e.target.value)}>
                                <option value="">Select user</option>
                                {users?.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            {errors.user_id && <div className="text-red-500">{errors.user_id}</div>}
                        </div>

                        <div className="mb-4">
                            <label>Book</label>
                            <select value={data.book_id} onChange={e => setData('book_id', e.target.value)}>
                                <option value="">Select book</option>
                                {books?.map(book => (
                                    <option key={book.id} value={book.id}>{book.title}</option>
                                ))}
                            </select>
                            {errors.book_id && <div className="text-red-500">{errors.book_id}</div>}
                        </div>

                        <Button type="submit">Save</Button>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
