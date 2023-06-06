export function assignGrade(finalMark, gradesArray) {
	const gradeObj = gradesArray.find(obj => finalMark >= obj.from && finalMark <= obj.to);
	return gradeObj ? gradeObj.grade : "No Grade Found";
}

export function assessSubjects(data) {
  const groupedData = data.reduce((result, entry) => {
    const { subject, examType, finalMark, examPercent } = entry;

    if (!result[subject]) {
      result[subject] = {
        subject: subject,
        BOT: "0/0",
        MOT: "0/0",
        EOT: "0/0",
        totalMark: 0,
        totalPercent: 0,
        markGrade: 0,
      };
    }

    if (examPercent > 0) {
      result[subject].totalMark += finalMark;
      result[subject].totalPercent += examPercent;
    }

    if (examType === "BOT") {
      result[subject].BOT = `${finalMark}/${examPercent}`;
    } else if (examType === "MOT") {
      result[subject].MOT = `${finalMark}/${examPercent}`;
    } else if (examType === "EOT") {
      result[subject].EOT = `${finalMark}/${examPercent}`;
    }

    result[subject].markGrade =
      (result[subject].totalMark / result[subject].totalPercent) * 100;

    return result;
  }, {});

  return Object.values(groupedData);
}