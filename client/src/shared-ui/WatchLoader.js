import React from "react";
import { Watch } from "react-loader-spinner";

export default function WatchLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        width: "100vh",
      }}
    >
      <Watch
        visible={true}
        height="80"
        width="80"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass="watch-wrapper"
      />
    </div>
  );
}
