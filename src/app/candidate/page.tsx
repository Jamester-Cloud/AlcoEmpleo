"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import CardOffer from "../components/cards/CardJobOffer"
import "@/app/components/cards/css/styles.css"
export default function CandidatePage() {

    const [data, setData] = useState()

    const fetchJobs = async () => {
        try {
            const res = await axios.get("/api/candidate/jobs");
            if (res.status == 200 && res.data.success) {
                setData(res.data.ofertas)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!data) {
            (async () => {
                try {
                    await fetchJobs()
                    
                    console.log(data);

                } catch (err) {
                    console.log('Error al cargar los datos el usuario');
                }
            })();
        }
    })

    return (
        <div className="container mt-5 mb-3">
            <div className="row">
                {data?.map((oferta: any) => (
                   <CardOffer data={oferta} />
                ))}
                {/* aca empieza el bucle */}
            </div>
        </div>
    )
}