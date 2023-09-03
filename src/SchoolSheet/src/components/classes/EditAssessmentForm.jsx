import React, { useEffect, useState } from 'react';
import Button2 from '../Button2';
import InputField from '../InputField';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../assets/styles/main.css';
import Select from 'react-select';
import { useDispatch } from "react-redux";
import { getAssessmentsByTerm } from "../../store/schoolSheetSlices/schoolStore";
import axiosInstance from "../../axios-instance";
import { assignGrade } from "../../utils/assessment";
import {  useSelector } from "react-redux";

function EditAssessmentForm({
    studentData,
    closeEditData,
    fetchAssessment,
    examTypesData,
    subjectsData,
    editDataId,
    studentId
}) {
    // update
    const dispatch = useDispatch();
    const [examEdit, setExamEdit] = useState({value: studentData.examType, label: studentData.examType});
    const [subjectEdit, setSubjectEdit] = useState({value: studentData.subject, label: studentData.subject});
    const [markEdit, setMarkEdit] = useState(studentData.mark);
    const [finalMarkEdit, setFinalMarkEdit] = useState(studentData.finalMark);
    const [commentEdit, setCommentEdit] = useState(studentData.comment);
    const [percent, setPercent] = useState(null);
    const [term, setTerm] = useState(null);
    const { grades, terms } = useSelector((state) => state.schoolStore);


    useEffect(() => {
        const examType = examTypesData.find((examType) => examType.value === examEdit.value);
      
        if (examType && examType.percent) {
          setPercent(examType.percent);
          setFinalMarkEdit((markEdit / 100) * examType.percent);
        }
      }, [markEdit, examTypesData, examEdit.value, percent]);

    const updateAssement = async (e) => {
        e.preventDefault();

        const gradeObj = assignGrade(markEdit, grades);
        
        try {
			let formData = {
                id: editDataId,
                examType: `${examEdit.id}`,
                subject: subjectEdit.value,
                mark: markEdit,
                finalMark: finalMarkEdit,
                comment: commentEdit,
                studentId: studentId,
                term: term.id,
                grade: gradeObj.grade,
                points: gradeObj.points,
                examPercent: percent
			};
			const assessment = await axiosInstance.put("/assessments", formData);
			const { data } = assessment;
			const { status } = data;
			if (status) {
				dispatch(getAssessmentsByTerm(term.id));
				setCommentEdit("");
				setMarkEdit("");
				const MySwal = withReactContent(Swal);
				MySwal.fire({
					icon: "success",
					showConfirmButton: false,
					timer: 500,
				});
				closeEditData();
			}
		} catch (error) {
			console.log(error);
		}
    };


	// set Term
	useEffect(() => {
		const _term = terms.length > 0 && 
			terms.filter(term => term.is_selected === 1)[0];
		setTerm(_term);
	}, [terms]);

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
