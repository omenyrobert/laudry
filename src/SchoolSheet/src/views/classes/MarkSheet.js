import React, {
	useState,
	useEffect,
} from "react";
import InputField from "../../components/InputField";
import Select from "react-select";
import Button from "../../components/Button";
import {
	getClasses,
	getStreams,
	getExamTypes,
	getSubjects,
} from "../../store/schoolSheetSlices/schoolStore"
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../axios-instance";
import { useFeedback } from "../../hooks/feedback"
import { usePrint } from "../../hooks/print"

function MarkSheet() {
	const dispatch = useDispatch();
	const {
		examTypes,
		subjects,
		classes,
		streams,
	} = useSelector((state) => state.schoolStore)
	const [subjectsOpts, setSubjectsOpts] = useState([])
	const [classesOpts, setClassesOpts] = useState([])
	const [streamsOpts, setStreamsOpts] = useState([])
	const [examTypesOpts, setExamTypesOpts] = useState([])
	const [selectedClass, setSelectedClass] = useState(null)
	const [selectedStream, setSelectedStream] = useState(null)
	const [selectedExamType, setSelectedExamType] = useState(null)
	const [selectedSubject, setSelectedSubject] = useState(null)
	const [loading, setLoading] = useState(false)
	const [marks, setMarks] = useState([])
	const { toggleFeedback } = useFeedback()
	const { printContent } = usePrint()


	useEffect(() => {
		dispatch(getClasses())
		dispatch(getStreams())
		dispatch(getExamTypes())
		dispatch(getSubjects())
	}, [dispatch])

	useEffect(() => {
		setClassesOpts(classes.map((cls) => {
			return {
				value: cls.id,
				label: cls.class,
				...cls
			}
		}))
	}, [classes])

	useEffect(() => {
		setStreamsOpts(streams.map((stream) => {
			return {
				value: stream.id,
				label: stream.stream,
				...stream
			}
		}))

	}, [streams])

	useEffect(() => {
		setExamTypesOpts(examTypes.map((examType) => {
			return {
				value: examType.id,
				label: examType.examType,
				...examType
			}
		}))

	}, [examTypes])

	useEffect(() => {
		setSubjectsOpts(subjects.map((subject) => {
			return {
				value: subject.id,
				label: subject.subject,
				...subject
			}
		}))

	}, [subjects])


	async function fetchMarks() {
		if (!selectedClass || !selectedStream || !selectedExamType || !selectedSubject) {
			toggleFeedback("error", {
				title: "Error",
				text: "Please select all fields"
			})
			return
		}
		setLoading(true)
		try {
			const data = {
				classId: selectedClass.id,
				streamId: selectedStream.id,
				examTypeId: selectedExamType.id,
				subjectId: selectedSubject.id
			}
			const response = await axiosInstance.post("/marksheet", data)
			const { status, payload } = response.data
			if (status === false) {
				toggleFeedback("error", {
					title: "Error",
					text: payload
				})
				return
			}
			setMarks(payload)
		} catch (error) {
			toggleFeedback("error", {
				title: "Error",
				text: "Something went wrong"
			})
		}
		setLoading(false)
	}


	return (
		<div className="bg-white p-5 h-full">
			<div className="flex justify-between">
				<div className="text-xl text-secondary font-semibold">Mark Sheet</div>
				<div onClick={(e) => {
					printContent("mark-sheet-table")
				}}>
					<Button value={"Print"} />
				</div>
			</div>
			<div className="flex mt-2">
				<div className="w-1/5 p-2">
					<Select
						placeholder={"Select Class "}
						options={classesOpts}
						onChange={(e) => setSelectedClass(e)}
						value={selectedClass}
					/>
				</div>
				<div className="w-1/5 p-2">
					<Select
						placeholder={"Select Stream"}
						options={streamsOpts}
						onChange={(e) => setSelectedStream(e)}
						value={selectedStream}
					/>
				</div>
				<div className="w-1/5 p-2">
					<Select
						placeholder={"Select Exam Type"}
						options={examTypesOpts}
						onChange={(e) => setSelectedExamType(e)}
						value={selectedExamType}
					/>
				</div>
				<div className="w-1/5 p-2">
					<Select
						placeholder={"Select Subject"}
						options={subjectsOpts}
						onChange={(e) => setSelectedSubject(e)}
						value={selectedSubject}
					/>
				</div>
				<div className="w-1/5 p-2">
					<span onClick={fetchMarks}><Button value={"Search"} /></span>
				</div>
			</div>
			<div id="mark-sheet-table">
				<div className="flex bg-primary3 text-primary font-medium mt-5">
					<div className="w-2/12 p-2">Full Name</div>
					<div className="w-2/12 p-2">Class Level</div>
					<div className="w-2/12 p-2">Class</div>
					<div className="w-2/12 p-2">Stream</div>
					<div className="w-2/12 p-2">Mark</div>
					<div className="w-2/12 p-2">Grade</div>
				</div>

				{
					loading && <div className="flex justify-center items-center h-64"><div className="loader"></div></div>
				}

				{marks.map((mark) => {
					return (
						<div className="flex cursor-pointer hover:bg-gray1 border-b border-gray1 text-gray5 text-sm">
							<div className="w-2/12 p-2">{mark.firstName} {mark.lastName}</div>
							<div className="w-2/12 p-2">{mark.student_levels[0]?.name}</div>
							<div className="w-2/12 p-2">{mark.classes[0]?.class}</div>
							<div className="w-2/12 p-2">{mark.streams[0]?.stream}</div>
							<div className="w-2/12 p-2">{mark.assessment.mark}</div>
							<div className="w-2/12 p-2">{mark.assessment.grade}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default MarkSheet;
