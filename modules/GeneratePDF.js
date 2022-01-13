import React from "react";
import { jsPDF } from "jspdf";
import { renderHTML } from "../agility/utils";

const GeneratePDF = (props) => {
  const fields = props.fields;

  const generatePdf = (e) => {
    e.preventDefault();
    let doc = new jsPDF("landscape", "pt", "A4");
    doc.html(document.getElementById("pdf-content"), {
      callback: () => {
        doc.save("test.pdf");
      },
    });
  };

  return (
    <div>
      <div className="container mx-auto px-4 mt-5">
        <div className="flex items-center "></div>
        <h1 id="pdf-content">Nikita Sachivko: Agility CMS and Next.js training</h1>
        <button onClick={generatePdf} className="rounded-full 800">Click to generate Pdf</button>
      </div>
    </div>
  );
};

export default GeneratePDF;
