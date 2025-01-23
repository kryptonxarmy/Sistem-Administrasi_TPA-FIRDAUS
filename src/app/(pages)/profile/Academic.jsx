import React from "react";
import Class from "./Class";
import AcademicYear from "./AcademicYear";
import Semester from "./Semester";

export default function Academic() {
  return (
    <div>
      <Class />
      <AcademicYear />
      <Semester />
    </div>
  );
}
