import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth }) {
    const { users = [], books = [] } = usePage().props;

    const { data, setData, post, errors } = useForm({
        user_id: '',
        book_id: '',
        date_loan: '',
        date_return: '',
        state: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('borrowings.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Borrowing record created successfully!',
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Borrowing</h2>}
        >
            <Head title="Create Borrowing" />
            <Container>
                <Card title="Add New Borrowing">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1">User</label>
                            <select className="w-full border rounded" value={data.user_id} onChange={e => setData('user_id', e.target.value)}>
                                <option value="">-- Select User --</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            {errors.user_id && <div className="text-red-500">{errors.user_id}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">Book</label>
                            <select className="w-full border rounded" value={data.book_id} onChange={e => setData('book_id', e.target.value)}>
                                <option value="">-- Select Book --</option>
                                {books.map(book => (
                                    <option key={book.id} value={book.id}>{book.title}</option>
                                ))}
                            </select>
                            {errors.book_id && <div className="text-red-500">{errors.book_id}</div>}
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Date Loan"
                                type="date"
                                value={data.date_loan}
                                onChange={e => setData('date_loan', e.target.value)}
                                errors={errors.date_loan}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Date Return"
                                type="date"
                                value={data.date_return}
                                onChange={e => setData('date_return', e.target.value)}
                                errors={errors.date_return}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="State"
                                type="text"
                                value={data.state}
                                onChange={e => setData('state', e.target.value)}
                                errors={errors.state}
                                placeholder="e.g. borrowed, returned"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button type="submit" />
                            <Button type="cancel" url={route('borrowings.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
