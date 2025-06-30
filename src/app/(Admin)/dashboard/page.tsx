'use client'

import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { TableColumn } from 'react-data-table-component';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdDeleteOutline } from 'react-icons/md';

type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    image: string;
    age: number;
    gender: string;
    birthDate: string;

}

export default function Dashboard() {
    const [users, setUser] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/users`,);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data.users);
                setUser(data.users);
                setFilteredUsers(data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Handle search
    useEffect(() => {
        const filtered = users.filter((user) =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [search, users]);


    // Handle edit/delete
    const handleEdit = (id: number) => {
        console.log('Edit user:', id);
        // Navigate or open modal...
    };

    const handleDelete = (id: number) => {
        console.log('Delete user:', id);
        // Show confirmation or delete logic...
    };

    const handleUserDetail = (id: number) => {
        console.log('Delete user:', id);
        // Show confirmation or delete logic...
    };

    const columns: TableColumn<UserType>[] = [
        {
            name: 'Name',
            selector: (row: UserType) => row.firstName + ' ' + row.lastName,
            width: '200px',
            sortable: true,
        },
        {
            name: 'Age',
            selector: (row: UserType) => row.age,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: (row: UserType) => row.gender,
        },
        {
            name: 'Date of Birth',
            selector: (row: UserType) => row.birthDate,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(row.id)}
                        className="px-3 py-1 text-sm text-blue-500  rounded hover:text-blue-600"
                    >
                        <FaRegEdit className=' w-[20px] h-[20px]' />
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="px-3 py-1 text-sm text-red-500 rounded hover:text-red-600"
                    >
                        <MdDeleteOutline className='w-[20px] h-[20px]' />
                    </button>
                    <button
                        onClick={() => handleUserDetail(row.id)}
                        className="px-3 py-1 text-sm text-gray-300 rounded hover:text-gray-400"
                    >
                        <HiOutlineDotsHorizontal className='w-[20px] h-[20px]' />
                    </button>
                </div>
            ),

        }
    ];

    return (
        <section className='w-[100%] p-5'>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 mt-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <DataTable
                title="User List"
                columns={columns}
                data={filteredUsers}
                progressPending={loading}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 30, 50]}
            />
        </section>
    )
}