import React, { useEffect, useState } from "react";
import '../../assets/styles/main.css';
import { useDispatch, useSelector } from "react-redux";
import ReportCardTemplate from '../../components/classes/ReportCardTemplate';
import { getStudents  } from "../../store/schoolSheetSlices/schoolStore"

function ReportCards(props) {
    const dispatch = useDispatch();
    const [studentInfo, setStudentInfo] = useState();
   
    const { students } = useSelector((state) => state.schoolStore);

    // get students
	useEffect(() => {
		dispatch(getStudents());
	}, [dispatch]);

    const [card, setCard] = useState(false);
    const openCard = (student) => {
        setCard(true);
        setStudentInfo(student);
    };
    const closeCard = () => {
        setCard(false);
    };
    return (
        <div>
            <p className='text-secondary font-semibold text-xl'>Report Cards</p>
            {card ? (
                <ReportCardTemplate
                    closeCard={closeCard}
                    studentData={studentInfo}
                />
            ) : null}
            <table className='mt-4 w-full table-auto'>
                <thead style={{ backgroundColor: '#0d6dfd10' }}>
                    <th className='p-2 text-primary text-sm text-left'>
                        Full Name
                    </th>
                    <th className='p-2 text-primary text-sm text-left'>
                        Date Of Birth
                    </th>
                    <th className='p-2 text-primary text-sm text-left'>
                        Gender
                    </th>
                    <th className='p-2 text-primary text-sm text-left'>
                        Student Type
                    </th>
                    <th className='p-2 text-primary text-sm text-left'>
                        Parents
                    </th>
                    <th className='p-2 text-primary text-sm text-left'>
                        Contacts
                    </th>
                    <th className='p-2 text-primary text-sm text-left'>
                        Email
                    </th>
                    <th className='p-2 text-primary text-sm text-left'>
                        Class
                    </th>
                    <th className='p-2 text-primary text-sm text-left'>
                        Place Of Residence
                    </th>
                    <th className='p-2 text-primary text-sm text-left'>
                        Action
                    </th>
                </thead>
                <tbody>
                    {students.map((student) => {
                        const studentType = student?.student_types[0];

                        const _class = student?.classes[0]

                        return (
                            <tr
                                className='shadow-sm border-b border-gray1 cursor-pointer hover:shadow-md'
                                key={student.id}
                            >
                                <td className='flex mx-4'>
                                    <div className='rounded-full h-8 w-8 py-1 my-2 text-center text-sm font-semibold  text-primary bg-primary3'>
                                        {student.firstName}{' '}
                                        {student.lastName}
                                    </div>
                                    <div>
                                        <p className='text-sm p-3 -mt-1 text-gray5'>
                                            {student.firstName}{' '}
                                            {student?.middleName}{' '}
                                            {student.lastName}
                                        </p>
                                        <p className='text-red text-xs -mt-3 ml-3'>
                                            {student?.nin}
                                        </p>
                                    </div>
                                </td>
                                <td className='text-xs p-3 text-gray5'>
                                    {student.dateOfBirth} -{' '}
                                    {Math.abs(
                                        new Date().getFullYear() -
                                            new Date(
                                                student.dateOfBirth
                                            ).getFullYear()
                                    )}
                                    yrs
                                </td>
                                <td className='text-xs p-3 text-gray5'>
                                    {student.gender}
                                </td>
                                <td className='text-xs p-3 text-gray5'>
                                    {studentType?.type}
                                </td>
                                <td className='text-xs p-3 text-gray5'>
                                    {student.fatherContact}
                                </td>
                                <td className='text-xs p-3 text-gray5'>
                                    {student.motherContact}
                                </td>
                                <td className='text-xs p-3 text-gray5'>
                                    {student.email}
                                </td>
                                <td className='text-xs p-3 text-gray5'>
                                    {_class?.class}
                                </td>
                                <td className='text-xs p-3 text-gray5'>
                                    {student.residence}
                                </td>
                                <td className='text-xs p-3 text-gray5 flex justify-between'>
                                    <div onClick={() => openCard(student)}>
                                        <p className='p-2 rounded text-primary'>
                                            Generate Report Card
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ReportCards;
