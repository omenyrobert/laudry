import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { MdDeleteOutline } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import InputField from '../InputField';
import { FaPen, FaPlusCircle } from 'react-icons/fa';
import Button from '../Button';
import ButtonSecondary from '../ButtonSecondary';
import { GrDown } from 'react-icons/gr';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Localbase from 'localbase';
import '../../assets/styles/main.css';

let db = new Localbase('db');

function ClassesComp() {
    const [streamsData, setStreams] = useState([]);
    // posting classes
    const [sclass, setSclass] = useState('');
    const [classesData, setClassesData] = useState([]);

    const postClass = () => {
        let clId = uuid();
        let formData = {
            id: clId,
            sclass: sclass,
        };
        if (sclass) {
            db.collection('classes')
                .add(formData)
                .then((response) => {
                    setSclass('');

                    fetchClasses();
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

    // fetch streams
    const fetchClasses = () => {
        db.collection('classes')
            .get()
            .then((classes) => {
                console.log('classes here', classes);
                const newData = classes.map((s) => {
                    const streamsObj = streamsClasssesData.filter((c) => {
                        console.log('idd', c);
                        return c.classId === s.id;
                    });
                    const streamsName = streamsData.find((d) => {
                        return d.id === streamsObj.streamId;
                    });
                    return {
                        id: s.id,
                        sclass: s.sclass,
                        streamsObj,
                        streamsName,
                    };
                });
                console.log('new array', newData);
                setClassesData(newData);
            });
    };

    // update
    const updateClass = () => {
        db.collection('classes')
            .doc({ id: classId })
            .update({
                sclass: sclassEdit,
                stream: Edit,
            })
            .then((response) => {
                console.log(response);
                // fetch after
                fetchClasses();
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 500,
                });
                closeEditData();
            });
    };

    const addStream = (stream, sclass) => {
        let scId = uuid();
        let formData = {
            id: scId,
            classId: sclass.id,
            streamId: stream.id,
        };
        db.collection('classesStreamsTbl')
            .add(formData)
            .then((response) => {
                fetchClasses();
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 500,
                });
            })
            .catch(console.error());
    };

    // const modifiedStream = streamsData.map((s) => {
    //     const classRoom = classesData.find((c) => c.id === s.id);
    //     return classRoom;
    // });

    // console.log(modifiedStream);

    // delete

    //deleting stream
    const deleteClass = (sclass) => {
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
                db.collection('classes')
                    .doc({ id: sclass.id })
                    .delete()
                    .then((response) => {
                        // fetch after
                        fetchClasses();

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

    // fetching stream

    const [editData, setEditData] = useState(false);
    const [classId, setclassId] = useState('');
    const [sclassEdit, setsclassEdit] = useState('');
    const [Edit, setEdit] = useState('');

    const closeEditData = () => {
        setEditData(false);
    };
    const openEditData = (sclass) => {
        setEditData(true);
        setsclassEdit(sclass?.sclass);
        setclassId(sclass.id);
    };

    // fetch streams
    const fetchStreams = () => {
        return db
            .collection('streams')
            .get()
            .then((streams) => {
                streams.forEach((stream) => {
                    const newData = streams;
                    setStreams(newData);
                });
            });
    };

    const [streamsClasssesData, setStreamsClasssesData] = useState([]);
    const fetchStreamsClasses = () => {
        return db
            .collection('classesStreamsTbl')
            .get()
            .then((streamsClasses) => {
                const newData = streamsClasses;
                setStreamsClasssesData(newData);
            });
    };

    // useEffect(() => {

    // }, []);
    // fetching stream
    useEffect(() => {
        fetchStreams().then(() => {
            fetchClasses();
            fetchStreamsClasses();
        });
    }, []);

    return (
        <>
            <h5 className='text-lg font-medium ml-5'>Classes</h5>
            <div className='w-full h-[80vh] ml-5'>
                <div className='flex justify-between bg-white pl-5 shadow-lg'>
                    <div className='w-1/3 p-2'>
                        <InputField
                            type='text'
                            placeholder='Enter class'
                            label='Class'
                            value={sclass}
                            onChange={(e) => setSclass(e.target.value)}
                            icon={<FaPen className='w-3 -ml-7 mt-3' />}
                        />
                    </div>

                    <div className='mt-8 mr-5 w-[150px]'>
                        <br />
                        <div onClick={postClass}>
                            <Button value={'Add'} />
                        </div>
                    </div>
                    <div className='w-1/4'></div>
                </div>
                <hr className='text-primary' />
                <table className='mt-10 w-[98%] table-auto'>
                    <thead style={{ backgroundColor: '#0d6dfd10' }}>
                        <th className='p-2 text-primary text-sm text-left'>
                            Class
                        </th>
                        <th className='p-2 text-primary text-sm text-left'>
                            Streams
                        </th>

                        <th className='p-2 text-primary text-sm text-left'>
                            Action
                        </th>
                    </thead>
                    <tbody>
                        {/* edit popup start */}
                        {editData ? (
                            <div className='absolute shadow-2xl rounded flex w-[500px] p-5 bg-white'>
                                <div className='w-2/3 pr-5'>
                                    <InputField
                                        type='text'
                                        placeholder='Enter Class'
                                        label='Class'
                                        name='Charge'
                                        value={sclassEdit}
                                        onChange={(e) =>
                                            setsclassEdit(e.target.value)
                                        }
                                        icon={
                                            <FaPen className='w-3 -ml-7 mt-3' />
                                        }
                                    />
                                    <InputField
                                        type='text'
                                        placeholder='Enter Stream'
                                        label='Stream'
                                        name='Charge'
                                        value={Edit}
                                        onChange={(e) =>
                                            setEdit(e.target.value)
                                        }
                                        icon={
                                            <FaPen className='w-3 -ml-7 mt-3' />
                                        }
                                    />
                                </div>
                                <div className='flex w-1/3 justify-between mt-[55px]'>
                                    <div onClick={updateClass}>
                                        <ButtonSecondary value={'Update'} />
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
                                <div className='w-1/3 pr-5'></div>
                            </div>
                        ) : null}
                        {/* edit popup end */}

                        {classesData.map((sclass) => {
                            return (
                                <tr
                                    className='shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md'
                                    key={sclass.id}
                                >
                                    <td className='text-xs p-3 text-gray5'>
                                        {sclass.sclass}
                                    </td>

                                    <td className='text-xs p-3 text-gray5 '>
                                        <div className='flex'>
                                            <div className='flex p-1 rounded shadow-md bg-white w-1/7'>
                                                <div>{sclass.stream}</div>
                                                <div>
                                                    <p className='ml-2 text-red'>
                                                        X
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-xs p-3 text-gray5 flex'>
                                        <MdDeleteOutline
                                            onClick={() => deleteClass(sclass)}
                                            className='text-red w-4 h-4'
                                        />

                                        <BsPencilSquare
                                            className='text-warning h-4 w-4 ml-5'
                                            onClick={() => openEditData(sclass)}
                                        />
                                        <FaPlusCircle className='text-primary ml-5 w-4 hoverbtn h-4' />
                                        <div className='absolute hoverContent bg-white w-[200px] h-40 overflow-y-auto rounded-md shadow-xl'>
                                            {streamsData.map((stream) => {
                                                return (
                                                    <div
                                                        className='p-2 hover:bg-gray1 text-sm'
                                                        onClick={() =>
                                                            addStream(
                                                                stream,
                                                                sclass
                                                            )
                                                        }
                                                        key={stream.id}
                                                    >
                                                        {stream.stream}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default ClassesComp;
