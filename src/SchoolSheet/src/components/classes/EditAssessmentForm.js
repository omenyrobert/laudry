import React, { useEffect, useState } from 'react';
import Button2 from '../Button2';
import InputField from '../InputField';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Localbase from 'localbase';
import '../../assets/styles/main.css';
import Select from 'react-select';

let db = new Localbase('db');

function EditAssessmentForm({
    studentData,
    closeEditData,
    fetchAssessment,
    examTypesData,
    subjectsData,
    editDataId,
}) {
    // update
    const [examEdit, setExamEdit] = useState(studentData.examType);
    const [subjectEdit, setSubjectEdit] = useState(studentData.subject);
    const [markEdit, setMarkEdit] = useState(studentData.mark);
    const [finalMarkEdit, setFinalMarkEdit] = useState(studentData.finalMark);
    const [commentEdit, setCommentEdit] = useState(studentData.comment);

    useEffect(() => {
        setFinalMarkEdit((markEdit / 100) * examEdit.percent);
    }, [markEdit, examEdit.percent]);

    const updateAssement = (e) => {
        e.preventDefault();
        db.collection('assessTbl')
            .doc({ id: editDataId })
            .update({
                examType: examEdit,
                subject: subjectEdit,
                mark: markEdit,
                finalMark: finalMarkEdit,
                comment: commentEdit,
            })
            .then((response) => {
                console.log(response);
                // fetch after
                fetchAssessment();
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 500,
                });
                closeEditData();
            });
    };

    return (
        <>
            <div className='bg-white border border-gray2 shadow-xl rounded absolute w-1/2 h-50vh overflow-y-auto'>
                <div className='bg-primary p-2 flex justify-between text-white'>
                    <div>
                        {studentData.firstName} {studentData.middleName}{' '}
                        {studentData.lastName}
                    </div>
                    <div className='cursor-pointer' onClick={closeEditData}>
                        X
                    </div>
                </div>
                <div className='p-2 flex'>
                    <div className='w-1/4 p-1'>
                        <br />
                        <br />
                        <Select
                            placeholder='Select Exam Type'
                            label='Exam Type'
                            defaultValue={examEdit}
                            onChange={setExamEdit}
                            options={examTypesData}
                        />
                    </div>
                    <div className='w-1/4 p-1'>
                        <br />
                        <br />
                        <Select
                            placeholder='Select Subject'
                            label='Subject'
                            defaultValue={subjectEdit}
                            onChange={setSubjectEdit}
                            options={subjectsData}
                        />
                    </div>

                    <div className='w-1/4 p-1'>
                        <InputField
                            label='Marks'
                            placeholder='Enter Marks in %'
                            name='markEdit'
                            value={markEdit}
                            onChange={(e) => {
                                setMarkEdit(e.target.value);
                            }}
                        />
                    </div>
                    <div className='w-1/4 p-1'>
                        <InputField
                            label='Comment'
                            placeholder='Enter Comment'
                            name='comment'
                            value={commentEdit}
                            onChange={(e) => setCommentEdit(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex justify-between mx-2'>
                    <div></div>
                    <div onClick={updateAssement}>
                        <Button2 value={'Update'} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditAssessmentForm;
