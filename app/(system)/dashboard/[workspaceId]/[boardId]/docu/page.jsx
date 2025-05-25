
import DocuEmpty from "@/components/appserver/DocumentEmpty";
import DocumentAutherize from "@/components/appserver/Documentpage";
import CardFolder from "@/components/card/CardDoc";
import  CardFile  from "@/components/card/CardDoc";
import TestDocument from "@/components/documentcomponent/TestDocument";
import React from "react";
const docs = [
  {
    title: "UX/UI Design",
    date: "12/05/2025",
    status: "personal",
    type: "pdf",
  },
  {
    title: "Wireframes",
    date: "12/05/2025",
    status: "public",
    type: "pdf",
  },
  {
    title: "Mobile App UI",
    date: "12/05/2025",
    status: "personal",
    type: "ppt",
  },
  {
    title: "Landing Page",
    date: "12/05/2025",
    status: "personal",
    type: "doc",
  },
  { title: "Brand Kit", date: "12/05/2025", status: "personal", type: "zip" },
  { title: "User Flow", date: "12/05/2025", status: "personal", type: "xls" },
];


//useage route : http://localhost:3000/dashboard/1/1/document

//This is i test for CardDoc (leap)
export default function Document() {
  return (
    <div className="p-10">
      <div className="grid grid-cols-6 gap-6">
        
          {docs.map((doc, index) => (
            <CardFolder
              key={doc.id || index} // <-- key prop added here
              title={doc.title}
              status={doc.status}
              date={doc.date}
              type={doc.type}
            />
          ))}
        
      </div>
    </div>
  );
}


//This is i test for Empty(leap)
// export default function Document() {
//     return (
//       <div className="p-10">
//        {/* <DocuEmpty/> */}
       
//       </div>
//     );
//   }