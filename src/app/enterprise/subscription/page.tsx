/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { PaymentData } from "@/app/interfaces/types";
import "tailwindcss/tailwind.css";



export default function SubscriptionPage() {
  const { register, handleSubmit,setValue, reset  } = useForm();
  const [processor, setProcessor] = useState("");
  const [paymentData, setPaymentData] = useState<PaymentData>({});
  const [modalVisible, setModalVisible] = useState(false);


  
   // Función para realizar la consulta
   const fetchData = async () => {
    try {
      const response = await axios.post("/api/administrator/homepage");
  
  
      const metodoPago: PaymentData = response.data.homePage[0].metodopago;
  
      if (metodoPago) {
        setPaymentData(metodoPago);
      }
    } catch (error) {
      console.log("Error en la petición de datos para el panel", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);


  const handleProcessor = (data:any) => {
    setProcessor(data);
    setValue("proccesor", data);
    setModalVisible(true);
  };

  const submit = async (data:any) => {
   
    let whatsappMessage = encodeURIComponent(
      `Saludos!, Somos la Empresa, ${data.nombre} . Adjunto la informacion de mi pago, con referencia: ${data.referencia}, hecho en: ${data.proccesor} con un monto de: ${data.monto}`
    );

  
    
    window.open(
      `https://wa.me/${paymentData.pagowhatsapp}?text=${whatsappMessage}`
    );

    setModalVisible(false);
    reset();
  };

  const loadPaymentData = () => {
    switch (processor) {
      case "Zinli":
        return (
          <ul>
            <li>Email Zinli:{paymentData.emailZinli} </li>
            <li>Monto: {paymentData.monto}</li>
          </ul>
        );
      case "Paypal":
        return (
          <ul>
            <li>Email Paypal: {paymentData.emailPaypal}</li>
            <li>Monto: {paymentData.monto}</li>
          </ul>
        );
      case "Binance":
        return (
          <ul>
            <li>Email Binance: {paymentData.emailBinance}</li>
            <li>Monto: {paymentData.monto}</li>
          </ul>
        );
      case "Pago movil":
        return (
          <ul>
            <li>Telefono : {paymentData.pagotelefono}</li>
            <li>Banco: {paymentData.banco}</li>
            <li>cedula: {paymentData.pagocedula}</li>
            <li>Monto: {paymentData.monto}</li>
          </ul>
        );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl font-bold text-blue-900">Subscripcion</h3>
      {/* Hay que hacer el card para la subscripcion activa si tiene una activa */}
      <h2 className="text-2xl font-bold">Seleccione un metodo de pago para ver el precio del plan</h2>
      <div className="mt-5">
        <form onSubmit={handleSubmit(submit)}>
          <div className="card bg-white shadow p-4">
            <div className="card-header text-lg font-semibold mb-4">
              Metodos de pago
            </div>
            <div className="card-body">
              <ul className="grid grid-cols-4 gap-4">
                {["Paypal", "Pago movil", "Zinli", "Binance"].map((method) => (
                  <li
                    key={method}
                    onClick={() => handleProcessor(method)}
                    className={`flex items-center p-4 border rounded cursor-pointer`}
                  >
                    <img
                      src={`/${method}.png`}
                      alt={method}
                         className="w-full sm:w-full object-contain my-4"
                    />
                    <input
                      type="radio"
                      {...register("proccesor", { required: true })}
                      value={method}
                      className="hidden"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {modalVisible && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded shadow-md">
                <div className="modal-header text-lg font-semibold mb-4">
                  Reporte de pagos
                
             
                </div>
                <span className=" font-bold">Nota:</span><h6> Al reportar el Pago se le redireccionara al whatsapp junto a los datos llenados, Por favor Especificar si es en Bs o $</h6>
                <br />
                <div className="modal-body">
                  <strong>{processor}</strong>
                  <strong>{loadPaymentData()}</strong>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <input
                      className="form-control p-2 border rounded"
                      type="text"
                      {...register("cedula", { required: true })}
                      placeholder="Rif de la Empresa"
                      
                    />
                    <input
                      className="form-control p-2 border rounded"
                      type="text"
                      {...register("nombre", { required: true })}
                      placeholder="Nombre Empresa"
                    />
                  
                    <textarea
                      className="form-control p-2 border rounded"
                      {...register("direccion", { required: true })}
                      placeholder="Direccion"
                    />
                    <input
                      className="form-control p-2 border rounded"
                      type="text"
                      {...register("referencia", { required: true })}
                      placeholder="referencia"
                    />
                    <input
                      className="form-control p-2 border rounded"
                      type="text"
                      {...register("monto", { required: true })}
                      placeholder="Monto: 5$ o 100bs"
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setModalVisible(false)}
                      className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                    >
                      Cerrar
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Reportar pago
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
