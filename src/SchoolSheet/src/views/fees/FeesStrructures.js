import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import InputField from '../../components/InputField';
import { FaPen } from 'react-icons/fa';
import Button from '../../components/Button';
import ButtonSecondary from '../../components/ButtonSecondary';
import Localbase from 'localbase';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';

let db = new Localbase('db');

function FeesStrructures() {
    const initialFeesData = {
        id: '',
        feesName: '',
        feesAmount: '',
    };
    const [fees, setFees] = useState(initialFeesData);
    const [feesData, setFeesData] = useState([]);

    const onChange = (e) => {
        setFees({ ...fees, [e.target.name]: e.target.value });
    };

    // post fees info
    const postFeesInfo = (e) => {
        e.preventDefault();
        let stId = uuid();
        let data = {
            id: stId,
            feesName: fees.feesName,
            feesAmount: fees.feesAmount,
        };
        if (fees) {
            db.collection('feesInfo')
                .add(data)
                .then((response) => {
                    console.log('postFeesInfo: ', response);
                    setFees(initialFeesData);
                    fetchFeesInfo();
                    console.log('field: ', fees);
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

    // fetch student info
    const fetchFeesInfo = () => {
        db.collection('feesInfo')
            .get()
            .then((student) => {
                const newData = student;
                setFeesData(newData);
            });
    };

    const deleteFee = (fee) => {
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
                db.collection('feesInfo')
                    .doc({ id: fee.id })
                    .delete()
                    .then((response) => {
                        // fetch after
                        fetchFeesInfo();

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

    useEffect(() => {
        fetchFeesInfo();
    }, []);

    const [editData2, setEditData2] = useState(false);
    const [feesNameEdit, setFeesNameEdit] = useState('');
    const [feesAmountEdit, setFeesAmountEdit] = useState('');
    const [feesId, setFeesId] = useState('');

    const closeEditData2 = () => {
        setEditData2(false);
    };
    const openEditData2 = (fee) => {
        setEditData2(true);
        setFeesNameEdit(fee.feesName);
        setFeesAmountEdit(fee.feesAmount);
        setFeesId(fee.id);
    };

    const updateFeesInfo = () => {
        db.collection('feesInfo')
            .doc({ id: feesId })
            .update({
                feesName: feesNameEdit,
                feesAmount: feesAmountEdit,
            })
            .then((response) => {
                console.log(response);
                // fetch after
                fetchFeesInfo();
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 500,
                });
                closeEditData2();
            });
    };

    return (
        <div className='flex'>
            <div className='w-1/3 p-5 bg-white shadow-lg rounded-md overflow-y-auto h-[40vh]'>
                <h5 className='text-xl font-medium  text-secondary'>Fees Structure</h5>

                <InputField
                    type='text'
                    placeholder='Enter Name'
                    label='Fees Name'
                    name='feesName'
                    value={fees.feesName}
                    onChange={onChange}
                    icon={<FaPen className='w-3 -ml-7 mt-3' />}
                />
                <InputField
                    type='text'
                    placeholder='Enter Amount'
                    label='Fees Amount'
                    name='feesAmount'
                    value={fees.feesAmount}
                    onChange={onChange}
                    icon={<FaPen className='w-3 -ml-7 mt-3' />}
                />

                <div onClick={postFeesInfo}>
                    <Button value={'Add'} />
                </div>
            </div>
            <div className='w-2/3 ml-5 p-5'>
                <div className='w-full h-[80vh]'>
                    <table className='mt-10 w-[98%] table-auto'>
                        <thead style={{ backgroundColor: '#0d6dfd10' }}>
                            <th className='p-2 text-primary text-sm text-left'>
                                Name
                            </th>
                            <th className='p-2 text-primary text-sm text-left'>
                                Amount
                            </th>
                            <th className='p-2 text-primary text-sm text-left'>
                                Actions
                            </th>
                        </thead>
                        <tbody>
                            {/* edit popup start */}
                            {editData2 ? (
                                <div className='w-[500px] absolute shadow-2xl  overflow-y-auto h-[40vh] p-5 bg-white rounded-md'>
                                    <div className='flex justify-between'>
                                        <h5 className='text-lg font-medium ml-5'>
                                            Fees Structure
                                        </h5>
                                        <p
                                            className='cursor-pointer'
                                            onClick={closeEditData2}
                                        >
                                            X
                                        </p>
                                    </div>
                                    <InputField
                                        type='text'
                                        placeholder='Enter Name'
                                        label='Fees Name'
                                        name='feesNameEdit'
                                        value={feesNameEdit}
                                        onChange={(e) =>
                                            setFeesNameEdit(e.target.value)
                                        }
                                        icon={
                                            <FaPen className='w-3 -ml-7 mt-3' />
                                        }
                                    />
                                    <InputField
                                        type='text'
                                        placeholder='Enter Amount'
                                        label='Fees Amount'
                                        name='feesAmountEdit'
                                        value={feesAmountEdit}
                                        onChange={(e) =>
                                            setFeesAmountEdit(e.target.value)
                                        }
                                        icon={
                                            <FaPen className='w-3 -ml-7 mt-3' />
                                        }
                                    />

                                    <div onClick={updateFeesInfo}>
                                        <ButtonSecondary value={'Update'} />
                                    </div>
                                </div>
                            ) : null}
                            {/* edit popup end */}

                            {feesData.map((fee) => {
                                return (
                                    <tr
                                        className='bg-white w-sm border-b border-gray1 cursor-pointer hover:bg-gray1'
                                        key={fee.id}
                                    >
                                        <td className='text-xs p-3 text-gray5'>
                                            {fee.feesName}
                                        </td>
                                        <td className='text-xs p-3 text-gray5'>
                                            {fee.feesAmount}
                                        </td>
                                        <td className='text-xs p-3 text-gray5 flex'>
                                            <MdDeleteOutline
                                                className='text-red w-4 h-4'
                                                onClick={() => deleteFee(fee)}
                                            />

                                            <BsPencilSquare
                                                className='text-warning h-4 w-4 ml-5'
                                                onClick={() =>
                                                    openEditData2(fee)
                                                }
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default FeesStrructures;
