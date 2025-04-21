import React from "react";
import { RotatingLines } from "react-loader-spinner";

export default function RotatingLineLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <RotatingLines
        visible={true}
        height="80"
        width="80"
        strokeColor="black"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}
