"use client"
import axios from "axios"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function VerifyEmailPage(props: any) {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('api/users/verifyEmail', { token:token })
            setVerified(true)
        } catch (err: any) {
            setError(true)
            console.log(err.response.data);
        }
    }

    useEffect(() => {
        //We extract the url with the token
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])


    useEffect(() => {
        if (token.length > 0) verifyUserEmail()
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4">Verify Email</h1>
            <h2 className="p-2 bg-info">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified succesfully</h2>
                    <a className="text-blue-500">
                        Login
                    </a>
                </div>
            )}

            {error && (
                <div className="text-2xl">
                    <h2 className="text-2xl bg-red">Error</h2>
                </div>
            )}
        </div>
    )
}