import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import { Head, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {

    // destruct reviews and filters from props
    const { reviews, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reviews</h2>}
        >
            <Head title={'Reviews'} />
            <Container>
                <div className='mb-4 flex items-center justify-between gap-4'>
                    {hasAnyPermission(['reviews create']) &&
                        <Button type={'add'} url={route('reviews.create')} />
                    }
                    <div className='w-full md:w-4/6'>
                        <Search url={route('reviews.index')} placeholder={'Search reviews by book name or content...'} filter={filters} />
                    </div>
                </div>
                <Table.Card title={'Book Reviews'}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Book</Table.Th>
                                <Table.Th>Review</Table.Th>
                                <Table.Th>Rating</Table.Th>
                                <Table.Th>Created</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {reviews.data.map((review, i) => (
                                <tr key={review.id}>
                                    <Table.Td>{++i + (reviews.current_page - 1) * reviews.per_page}</Table.Td>
                                    <Table.Td>{review.book}</Table.Td>
                                    <Table.Td>{review.review}</Table.Td>
                                    <Table.Td>{review.rating}</Table.Td>
                                    <Table.Td>{new Date(review.created_at).toLocaleDateString()}</Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-2'>
                                            {hasAnyPermission(['reviews edit']) &&
                                                <Button type={'edit'} url={route('reviews.edit', review.id)} />
                                            }
                                            {hasAnyPermission(['reviews delete']) &&
                                                <Button type={'delete'} url={route('reviews.destroy', review.id)} />
                                            }
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className='flex items-center justify-center'>
                    {reviews.last_page !== 1 && (<Pagination links={reviews.links} />)}
                </div>
            </Container>
        </AuthenticatedLayout>
    )
}
