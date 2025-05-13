"use client";
import { useState, CSSProperties, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const override: CSSProperties = {
  margin: "0 auto",
 
};

export default function SmallSpinner({loading}: {loading: boolean}) {
  return (
        <div className="sweet-loading">
          <MoonLoader
            color="#576FE3" // Simplificado el color
            loading={loading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
            size={60}
          />
    </div>
  );
}
