"use client";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { FormStepper } from "@/app/components/Forms/FormStepper";
import { useRouter } from "next/navigation";

export default function Quizzes({ params }: any) {
  const router = useRouter();

  let { id }:any = use(params);

  const [quiz, setQuiz]: any = useState();
  const [idCandidato, setCandidato] = useState();

  const fetchQuizData = async () => {
    // setLoading(true); // Empieza la carga
    let quizData;
    try {
      const response = await axios.post("/api/candidate/quizzes/get", {
        idQuizz: id,
      });
      if (response.status === 200) {
        // quizData = response.data.quiz
        quizData = response?.data?.quiz;
        setQuiz(quizData);
        setCandidato(response.data.idCandidato);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      // setLoading(false); // Termina la carga
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [!quiz]);

  return (
    <div className="container-fluid p-5">
      <div className="row">
        <FormStepper data={quiz} idCandidato={idCandidato} idQuiz={id} />
      </div>
    </div>
  );
}
