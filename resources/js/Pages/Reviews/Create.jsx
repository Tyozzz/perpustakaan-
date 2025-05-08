import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth }) {

    // Form state
    const { data, setData, post, errors } = useForm({
        book: '',
        review: '',
        rating: ''
    });

    // Submit handler
    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route('reviews.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Review created successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Review</h2>}
        >
            <Head title="Create Review" />
            <Container>
                <Card title="Create new book review">
                    <form onSubmit={handleStoreData}>
                        <div className="mb-4">
                            <Input
                                label="Book Title"
                                type="text"
                                value={data.book}
                                onChange={e => setData('book', e.target.value)}
                                errors={errors.book}
                                placeholder="Enter book title"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Review"
                                type="textarea"
                                value={data.review}
                                onChange={e => setData('review', e.target.value)}
                                errors={errors.review}
                                placeholder="Write your review here"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Rating"
                                type="number"
                                min="1"
                                max="5"
                                value={data.rating}
                                onChange={e => setData('rating', e.target.value)}
                                errors={errors.rating}
                                placeholder="Rate between 1 to 5"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="submit" />
                            <Button type="cancel" url={route('reviews.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}
