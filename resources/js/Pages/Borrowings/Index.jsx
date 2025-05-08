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

    const { borrowings, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Borrowings</h2>}
        >
            <Head title={'Borrowings'} />
            <Container>
                <div className='mb-4 flex items-center justify-between gap-4'>
                    {hasAnyPermission(['borrowings create']) &&
                        <Button type={'add'} url={route('borrowings.create')} />
                    }
                    <div className='w-full md:w-4/6'>
                        <Search url={route('borrowings.index')} placeholder={'Search borrowings by user or book...'} filter={filters} />
                    </div>
                </div>
                <Table.Card title={'Borrowings List'}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>User</Table.Th>
                                <Table.Th>Book</Table.Th>
                                <Table.Th>Date Loan</Table.Th>
                                <Table.Th>Date Return</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {borrowings.data.map((item, i) => (
                                <tr key={i}>
                                    <Table.Td>{++i + (borrowings.current_page - 1) * borrowings.per_page}</Table.Td>
                                    <Table.Td>{item.user.name}</Table.Td>
                                    <Table.Td>{item.book.title}</Table.Td>
                                    <Table.Td>{item.date_loan}</Table.Td>
                                    <Table.Td>{item.date_return ?? '-'}</Table.Td>
                                    <Table.Td>{item.state}</Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-2'>
                                            {hasAnyPermission(['borrowings edit']) &&
                                                <Button type={'edit'} url={route('borrowings.edit', item.id)} />
                                            }
                                            {hasAnyPermission(['borrowings delete']) &&
                                                <Button type={'delete'} url={route('borrowings.destroy', item.id)} />
                                            }
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className='flex items-center justify-center'>
                    {borrowings.last_page !== 1 && (<Pagination links={borrowings.links} />)}
                </div>
            </Container>
        </AuthenticatedLayout>
    )
}
