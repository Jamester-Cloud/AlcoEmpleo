"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import MoonLoader from "react-spinners/MoonLoader";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState, CSSProperties } from "react";
import Link from "next/link";

type FormValues = {
  idCandidato: String;
  isPremium: Boolean;
};

const override: CSSProperties = {
  margin: "0 auto",
};

export default function Quizzes() {
  const router = useRouter();

  const [quizz, setQuizzes]: any = useState();

  const [isPremium, setIsPremium] = useState<boolean | null>(null); // Estado para isPremium
  const [loading, setLoading] = useState<boolean | null>(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      idCandidato: "",
      isPremium: false,
    },
  });

  const {
    formState: { errors },
  } = methods;

  const retryQuizz = async (idCandidato: string, idQuizz: string) => {
    // Establecer el estado de carga para el id del cuestionario
    try {
      setLoading(true);
      let res = await axios.post(
        "/api/administrator/candidates/quizzes/retry",
        { idCandidato: idCandidato, idQuizz: idQuizz, dificultad: "media" }
      );

      if (res.status == 200) {
        router.push(`/candidate/quizz/${idQuizz}`);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    //Tomo isPremium en el localStorage, si es Verdadero Continua, si es Falso, no muestra el Cuestionario
    const isPremiumFromStorage = localStorage.getItem("isPremium") === "true";
    setIsPremium(isPremiumFromStorage);
    if (isPremiumFromStorage) {
      const res = await axios.post("/api/candidate/quizzes", {
        idUsuario: localStorage?.getItem("idUsuario"),
      });
      if (res.status === 200) {
        setQuizzes(res.data.cuestionarios);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Cuestionarios</h2>

        {isPremium === false ? (
          <p className="text-red-500 text-lg">
            Para realizar el cuestionario, debe suscribirse a la página.
          </p>
        ) : (
          <div className="overflow-x-auto ">
            <table className="min-w-full bg-white shadow-md rounded mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b"></th>
                  <th className="py-2 px-4 border-b">Dificultad</th>
                  <th className="py-2 px-4 border-b">Calificación</th>
                  <th className="py-2 px-4 border-b">Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {quizz?.map((item: any, key: number) => (
                  <tr key={key}>
                    <td>
                      <Image
                        className="rounded-full m-2"
                        src={"/AlcoLogo.png"}
                        alt={""}
                        width={80}
                        height={80}
                      />
                      {item.tituloCuestionario}
                    </td>
                    <td className="py-2 px-4 border-b text-capitalize">
                      {item.dificultad}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {item.tipo === "Psicotecnico"
                        ? `${item.calificacion}/10 Estrellas`
                        : `${item.calificacion}/5 Estrellas`}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {item.finalizada ? "Completado" : "Sin Completar"}
                    </td>
                    <td
                      className="py-2 px-4 border-b"
                      style={{ textDecoration: "none" }}
                    >
                      {item.finalizada ? (
                        <>
                          {isPremium &&
                            (loading ? (
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
                            ) : (
                              <button
                                style={{ textDecoration: "none" }}
                                onClick={() =>
                                  retryQuizz(item.idCandidato, item._id)
                                }
                                className="bg-blue-500 ml-5 text-white px-4 py-2 rounded-md"
                              >
                                Reintentar
                              </button>
                            ))}
                        </>
                      ) : (
                        <Link
                          style={{ textDecoration: "none" }}
                          href={`/candidate/quizz/${item._id}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Completar
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginación (comentada por ahora) */}
        {/* <Pagination>
            // Paginación aquí
        </Pagination> */}
      </div>
    </div>
  );
}
