import { Document, Packer, Paragraph, TextRun } from "docx";

export const GenerateDocx = () => {
  const generateDocx = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Hello from frontend Next.js!",
                  bold: true,
                  size: 28,
                }),
                new TextRun("\nThis document was generated entirely on the client-side."),
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "frontend-generated.docx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute z-50 left-60 bg-red-500 text-white" style={{ padding: 20 }}>
      <h1>Generate Word Document on Frontend</h1>
      <button onClick={generateDocx}>Download .docx</button>
    </div>
  );
}