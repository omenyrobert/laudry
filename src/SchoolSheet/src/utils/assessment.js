export function assignGrade(finalMark, gradesArray) {
	const gradeObj = gradesArray.find(obj => finalMark >= obj.from && finalMark <= obj.to);
	return gradeObj ? gradeObj.grade : "No Grade Found";
}

export function assessSubjects (data) {
    
    const groupedData = data.reduce((result, entry) => {
        const { subject, examType, finalMark, mark } = entry;
      
        if (!result[subject]) {
          result[subject] = {
            subject: subject,
            BOT: "0/0",
            MOT: "0/0",
            EOT: "0/0",
            totalMark: 0,
          };
        }
      
        result[subject].totalMark += (finalMark / mark) * 100;
      
        if (examType === "BOT") {
          result[subject].BOT = `${finalMark}/${mark}`;
        } else if (examType === "MOT") {
          result[subject].MOT = `${finalMark}/${mark}`;
        } else if (examType === "EOT") {
          result[subject].EOT = `${finalMark}/${mark}`;
        }
      
        return result;
      }, {});
      
      return Object.values(groupedData);
}