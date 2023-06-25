export function assignGrade(finalMark, gradesArray) {
	const gradeObj = gradesArray.find(obj => finalMark >= obj.from && finalMark <= obj.to);
	return gradeObj ? gradeObj : "No Grade Found";
}

export function assessSubjects(data) {
  const groupedData = data.reduce((result, entry) => {
    const { subject, examType, finalMark, examPercent, points } = entry;

    if (!result[subject]) {
      result[subject] = {
        subject: subject,
        totalMark: 0,
        totalPercent: 0,
        markGrade: 0,
        totalPoints: 0,
        examTypes: [],
      };
    }

    if (examPercent > 0) {
      result[subject].totalMark += finalMark;
      result[subject].totalPercent += examPercent;
      result[subject].totalPoints += parseFloat(points);
    }

    const examTypeData = {
      type: examType,
      markPercent: `${finalMark}/${examPercent}`,
    };

    result[subject].examTypes.push(examTypeData);

    result[subject].markGrade =
      (result[subject].totalMark / result[subject].totalPercent) * 100;

    return result;
  }, {});

  return Object.values(groupedData);
}
