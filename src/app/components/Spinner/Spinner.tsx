"use client";
import { useState, CSSProperties, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const override: CSSProperties = {
  margin: "0 auto",
 
};

export default function Spinner() {
  const [loading, setLoading] = useState(true); // Cambiado a true

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Cambiado a false después de 1500ms
    }, 1500);
  }, []);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-white ${
          loading ? "" : "hidden"
        }`}
      >
        <div className="sweet-loading">
          <MoonLoader
            color="#576FE3" // Simplificado el color
            loading={loading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
            size={150}
          />
        </div>
      </div>
    </div>
  );
}
