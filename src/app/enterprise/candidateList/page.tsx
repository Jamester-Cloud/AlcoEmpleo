import ListCarousel from "@/app/components/carousel/Carousel"
import React, { useEffect, useState } from 'react'
import axios from "axios"
export default function CandidateListPage() {

    const fetchAllCandidates = async () => {
        //
        const response = await axios.post("/api/enterprise/candidateList")
    }

    useEffect(() => {

    })
    return (
        <ListCarousel />
    )
}