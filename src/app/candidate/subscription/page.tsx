/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";

export default function SubscriptionPage() {
  const { register, handleSubmit } = useForm();
  const [processor, setProcessor] = useState("");
  //todo agregar el numero del Sr.Ezequiel
  const [paymentData, setPaymentData] = useState({
    email: "admgrupoalco@gmail.com",
    monto: "5$",
    cedula: "12247978",
    telefono: "+584122696463",
    banco: "Exterior",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleProcessor = (data:any) => {
    setProcessor(data);
    setModalVisible(true);
  };

  const submit = async (data:any) => {
    console.log(data);
    let whatsappMessage = encodeURIComponent(
      `Saludos!, mi nombre es, ${data.nombre} ${data.apellidos}. Adjunto la informacion de mi pago, con referencia: ${data.referencia}, hecho en: ${data.proccesor} con un monto de: ${paymentData.monto}.`
    );
    window.open(
      `https://wa.me/${paymentData.telefono}?text=${whatsappMessage}`
    );
  };

  const loadPaymentData = () => {
    switch (processor) {
      case "Zinli":
        return (
          <ul>
            <li>Email Zinli: {paymentData.email}</li>
            <li>Monto: {paymentData.monto}</li>
          </ul>
        );
      case "Paypal":
        return (
          <ul>
            <li>Email Paypal: {paymentData.email}</li>
            <li>Monto: {paymentData.monto}</li>
          </ul>
        );
      case "Binance":
        return (
          <ul>
            <li>Email Binance: {paymentData.email}</li>
            <li>Monto: {paymentData.monto}</li>
          </ul>
        );
      case "Pago movil":
        return (
          <ul>
            <li>Telefono : {paymentData.telefono}</li>
            <li>Banco: {paymentData.banco}</li>
            <li>cedula: {paymentData.cedula}</li>
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
                      className="mx-4 my-4"
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
                <div className="modal-body">
                  <strong>{processor}</strong>
                  <strong>{loadPaymentData()}</strong>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <input
                      className="form-control p-2 border rounded"
                      type="text"
                      {...register("cedula", { required: true })}
                      placeholder="Cedula"
                    />
                    <input
                      className="form-control p-2 border rounded"
                      type="text"
                      {...register("nombre", { required: true })}
                      placeholder="Nombres"
                    />
                    <input
                      className="form-control p-2 border rounded"
                      type="text"
                      {...register("apellidos", { required: true })}
                      placeholder="Apellidos"
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
                      placeholder="Referencia"
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