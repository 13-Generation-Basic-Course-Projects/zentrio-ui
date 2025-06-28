import * as XLSX from "xlsx";

export const GenerateXlsx = () => {
    const generateXlsx = () => {

    const data = [
      { Name: "Alice", Age: 25, Country: "USA" },
      { Name: "Bob", Age: 30, Country: "UK" },
      { Name: "Charlie", Age: 22, Country: "Canada" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "frontend-generated.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute z-50 bg-blue-400 text-white" style={{ padding: 20 }}>
      <h1>Generate Excel File (.xlsx)</h1>
      <button onClick={generateXlsx}>Download Excel</button>
    </div>
  );
}