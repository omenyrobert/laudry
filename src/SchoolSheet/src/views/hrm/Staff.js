import React, { useEffect, useState } from 'react';
import '../../assets/styles/main.css';
import InputField from '../../components/InputField';
import Button2 from '../../components/Button2';
import ButtonSecondary from '../../components/ButtonSecondary';
import StaffComp from '../../components/hrm/StaffComp';
import { MdDeleteOutline } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import { FaPen } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Localbase from 'localbase';
import { v4 as uuid } from 'uuid';

let db = new Localbase('db');

function Staff() {
    const [type, setType] = useState('');
    const [editData, setEditData] = useState(false);
    const [typeEdit, setTypeEdit] = useState('');
    const [typeId, setTypeId] = useState('');

    const [staffTypes, setStaffTypes] = useState([]);

    const postStaffType = () => {
        let stId = uuid();
        let formData = {
            id: stId,
            staffType: type,
        };
        if (type) {
            db.collection('staffType')
                .add(formData)
                .then((response) => {
                    setType('');
                    // fetch after
                    fetchStaffTypes();

                    // show alert
                    const MySwal = withReactContent(Swal);
                    MySwal.fire({
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 500,
                    });
                })
                .catch(console.error());
        }
    };

    // fetch stypes
    const fetchStaffTypes = () => {
        db.collection('staffType')
            .get()
            .then((staffType) => {
                const newData = staffType;
                setStaffTypes(newData);
            });
    };

    //deleting stypes
    const deleteStaffType = (type) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                db.collection('staffType')
                    .doc({ id: type.id })
                    .delete()
                    .then((response) => {
                        // fetch after
                        fetchStaffTypes();

                        Swal.fire({
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 500,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };

    // updating stypes
    const updateStaffType = () => {
        db.collection('staffType')
            .doc({ id: typeId })
            .update({
                staffType: typeEdit,
            })
            .then((response) => {
                console.log(response);
                // fetch after
                fetchStaffTypes();
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 500,
                });
                closeEditData();
            });
    };

    // fetching stypes
    useEffect(() => {
        fetchStaffTypes();
    }, []);

    const closeEditData = () => {
        setEditData(false);
    };
    const openEditData = (type) => {
        setEditData(true);
        setTypeEdit(type?.staffType);
        setTypeId(type.id);
    };

    return (
        <div className='w-full'>
            <div className=' h-screen overflow-y-auto mt-2 w-full'>
                <p className='text-primary text-xl font-semibold'>Staff</p>
                <div className='flex mt-3'>
                    <div className='w-1/6 shadow-lg rounded-lg bg-white  p-3 mr-5'>
                        <InputField
                            type='text'
                            placeholder='Enter staff Type'
                            label='Staff Type'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <div onClick={postStaffType}>
                            <Button2 value={'Add '} />
                        </div>

                        <table className='mt-10 w-[95%] table-auto'>
                            <thead style={{ backgroundColor: '#0d6dfd10' }}>
                                <th className='p-2 text-primary text-sm text-left'>
                                    Type
                                </th>
                                <th className='p-2 text-primary text-sm text-left'>
                                    Action
                                </th>
                            </thead>
                            <tbody>
                                {/* edit popup start */}
                                {editData ? (
                                    <div className='absolute shadow-lg rounded flex w-[400px] p-5 bg-white'>
                                        <div className='w-2/3 pr-5'>
                                            <InputField
                                                type='text'
                                                placeholder='Enter Staff Type'
                                                label='Staff Type'
                                                name='Staff_type'
                                                value={typeEdit}
                                                onChange={(e) =>
                                                    setTypeEdit(e.target.value)
                                                }
                                                icon={
                                                    <FaPen className='w-3 -ml-7 mt-3' />
                                                }
                                            />
                                        </div>
                                        <div className='flex justify-between w-1/3 mt-[55px]'>
                                            <div onClick={updateStaffType}>
                                                <ButtonSecondary
                                                    value={'Update'}
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className='text-black text-lg cursor-pointer'
                                                    onClick={closeEditData}
                                                >
                                                    X
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                                {/* edit popup end */}

                                {staffTypes.map((type) => {
                                    return (
                                        <tr
                                            className='shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md'
                                            key={type.id}
                                        >
                                            <td className='text-xs p-3 text-gray5'>
                                                {type.staffType}
                                            </td>
                                            <td className='text-xs p-3 text-gray5'>
                                                <div className='flex'>
                                                    <MdDeleteOutline
                                                        className='text-red w-4 h-4'
                                                        onClick={() =>
                                                            deleteStaffType(
                                                                type
                                                            )
                                                        }
                                                    />
                                                    <BsPencilSquare
                                                        onClick={() =>
                                                            openEditData(type)
                                                        }
                                                        className='text-warning h-4 w-4 ml-5'
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-5/6'>
                        <StaffComp />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Staff;
