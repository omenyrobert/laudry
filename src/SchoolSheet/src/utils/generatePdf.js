import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (data) => {
    const docDefinition = {
      content: [
        { text: data.title, style: "header" },
        { text: data.subtitle, style: "subheader" },
        "\n", 
  
        {
          table: {
            headerRows: 1,
            widths: data.columnWidths,
            body: [
              data.tableHeaders,
              ...data.tableRows.map((row) =>
                row.map((cell, index) => ({
                  text: cell,
                  style: index === 3 ? "wrap" : null, 
                }))
              ),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 5],
        },
        wrap: {
          noWrap: false,
        },
      },
    };
  
    pdfMake.createPdf(docDefinition).download(data.filename);
  };
  
export default generatePDF;


