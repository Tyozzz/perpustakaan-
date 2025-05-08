import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Edit({ auth }) {

    // Ambil review dari props
    const { review } = usePage().props;

    // State form
    const { data, setData, post, errors } = useForm({
        book: review.book,
        review: review.review,
        rating: review.rating,
        _method: 'put'
    });

    // Submit handler
    const handleUpdateData = async (e) => {
        e.preventDefault();

        post(route('reviews.update', review.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Review updated successfully!',
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Review</h2>}
        >
            <Head title="Edit Review" />
            <Container>
                <Card title="Edit book review">
                    <form onSubmit={handleUpdateData}>
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
                                placeholder="Edit your review"
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
                                placeholder="Rate 1 to 5"
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
