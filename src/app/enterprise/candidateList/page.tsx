import ListCarousel from "@/app/components/carousel/Carousel"
import React, { useEffect, useState } from 'react'
import axios from "axios"
export default function CandidateListPage() {

    const [data, setData]:any = useState()

    const fetchAllCandidates = async () => {
        //
        try {
            const response = await axios.get("../api/enterprise/candidateList")
            setData('Hola mundo')

        } catch (error) {

        }
    }

    // useEffect(() => {
    //     if (!data) {
    //         (async () => {
    //             try {
    //                 await fetchAllCandidates()
    //             } catch (err) {
    //                 console.log('Error al cargar los datos el usuario');
    //             }
    //         })();
    //     }
    // }, [data])
    return (
        <ListCarousel data={data} />
    )
}