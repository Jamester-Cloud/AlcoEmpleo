"use client"

import { useState } from "react";
import "./css/app.css"
import Paginator from "../components/paginator/Paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,

} from "@fortawesome/free-solid-svg-icons";


export default function ProfileCardsList() {
    const [index, setIndex] = useState(0);

    const data = [
        {
            name: "Simon",
            img: "https://imgur.com/c43aAlv.jpg",
        },
        {
            name: "Neo",
            img: "https://imgur.com/RF2a3PB.jpg",
        },
        {
            name: "Morpheus",
            img: "https://imgur.com/B0SNpZI.jpg",
        },
        {
            name: "Trinity",
            img: "https://imgur.com/KnXHM0K.jpg",
        },
    ];
    //page
    const handlePageChange = (page: any) => {
        let n = page - index;
        setIndex(index + n);
    };

    const slideLeft = () => {
        if (index - 1 >= 0) {
            setIndex(index - 1);
        }
    };

    const slideRight = () => {
        if (index + 1 <= data.length - 1) {
            setIndex(index + 1);
        }
    };

    const handlePointerEvent = (e: any) => {
        /* check which type of event we have, 
        and set a flag variable */
        let isTouchEvent = e.type === "touchstart" ? true : false;

        /* this is our card we will move */
        let card = e.target;
        /* to keep track of the value to offset the card left */
        let offset = 0;
        /* keeps the initial mouse click x value */
        let initialX = isTouchEvent ? e.touches[0].clientX : e.clientX;

        /* mouse events */
        /* set the documents onmousemove event to use this function */
        document.onmousemove = onPointerMove;
        /* sets the documents onmouseup event to use this function */
        document.onmouseup = onPointerEnd;

        /* touch events */
        /* set the documents ontouchmove to this function */
        document.ontouchmove = onPointerMove;
        /* set the documents ontouchend to this function */
        document.ontouchend = onPointerEnd;

        /* when the mouse moves we handle the event here */
        function onPointerMove(e: any) {
            /* set offset to the current position of the cursor,
            minus the initial starting position  */
            offset = (isTouchEvent ? e.touches[0].clientX : e.clientX) - initialX;
            if (offset <= -100) {
                slideRight();
                /* if we're at the last card, snap back to center */
                if (index === data.length - 1) {
                    card.style.left = 0;
                } else {
                    /* hide the shift back to center 
                  until after the transition */
                    setTimeout(() => {
                        card.style.left = 0;
                    }, 1000);
                }
                return;
            }
            if (offset >= 100) {
                slideLeft();
                /* if we're at the first card, snap back to center */
                if (index === 0) {
                    card.style.left = 0;
                } else {
                    /* hide the shift back to center 
                  until after the transition */
                    setTimeout(() => {
                        card.style.left = 0;
                    }, 1000);
                }
                return;
            }
            /* set the left style property of the card to the offset value */
            card.style.left = offset + "px";
        }

        function onPointerEnd(e: any) {
            /* if user releases mouse early,
            card needs to snap back */
            if (offset < 0 && offset > -100) {
                card.style.left = 0;
            }
            if (offset > 0 && offset < 100) {
                card.style.left = 0;
            }
            /* remove functions from event listeners
            (stop tracking pointer movements) */
            document.onmousemove = null;
            document.onmouseup = null;

            document.ontouchmove = null;
            document.ontouchend = null;
        }
    };
    //card
    const Card = ({ handlePointerEvent, name, img, cardStyle }: any) => {
        return (
            <article className={cardStyle}>
                <div
                    className="card align-items-center border-light text-center mb-3 w-100"
                    onMouseDown={handlePointerEvent}
                    onTouchStart={handlePointerEvent}
                >
                    <div className="card-header text-center">
                        <div className="mt-3 mb-4">
                            <img src={img}
                                className="rounded" width={30} height={30} />
                        </div>
                    </div>
                    <div className="card-body text-center">
                        <h5 className="mb-2">{name}</h5>
                        <p className="text-muted mb-4">Ingeniero</p>
                        <div className="mb-4 pb-2 p-2">
                            <button type="button" className="btn btn-success btn-floating">
                                <i className="mdi mdi-whatsapp"></i> Enviar mensaje
                            </button>
                        </div>
                        <button type="button" className="btn btn-primary mb-3">
                            Ver CV
                        </button>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center mt-2 text-center mb-2">
                            <div className="m-3">
                                <p className="text-muted mb-0"> <i className="mdi mdi-location-enter"></i> Portuguesa</p>
                            </div>
                            <div className="m-3">
                                <p className="text-muted mb-0"> <i className="mdi mdi-office-building"></i> Analista en informatica</p>
                            </div>

                        </div>
                    </div>
                </div>
            </article>
        );
    };
    return (
        <section className="container" style={{ backgroundColor: "#eee" }}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossOrigin="anonymous" />
            {/* <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-12 col-xl-4">

                    <div className="card border-light text-center mb-3" style={{ borderRadius: "15px" }}>
                        <div className="card-header text-center">
                            <div className="mt-3 mb-4 text-center">
                                <img src="/AlcoSloganLogo.png"
                                    className="" style={{ width: "100px" }} />
                            </div>
                        </div>
                        <div className="card-body text-center">

                            <h4 className="mb-2">Ivan Rodriguez</h4>
                            <p className="text-muted mb-4">@SoftwareEngineer <span className="mx-2">|</span> <a
                                href="#!">Sitio web</a></p>
                            <div className="mb-4 pb-2 p-2">
                                <button type="button" className="btn btn-success btn-floating">
                                    <i className="mdi mdi-whatsapp"></i>
                                </button>
                            </div>
                            <button type="button" className="btn btn-primary">
                                Ver CV
                            </button>
                            <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                <div>
                                    <p className="mb-2 h5">Ubicacion</p>
                                    <p className="text-muted mb-0">Portuguesa</p>
                                </div>
                                <div className="px-3">
                                    <p className="mb-2 h5">Cargo Deseado</p>
                                    <p className="text-muted mb-0">Ingeniero de Software</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div> */}
                <div className="card-container">
                    <Paginator
                        dataLength={data.length}
                        activeIndex={index}
                        handlePageChange={handlePageChange}
                    />
                    <div className="background-block"></div>
                    <FontAwesomeIcon
                        onClick={slideLeft}
                        className="leftBtn"
                        icon={faChevronLeft}
                    />
                    <FontAwesomeIcon
                        onClick={slideRight}
                        className="rightBtn"
                        icon={faChevronRight}
                    />
                    {data.map((person, n) => {
                        let position =
                            n > index ? "nextCard" : n === index ? "activeCard" : "prevCard";
                        return (
                            <Card
                                key={n}
                                handlePointerEvent={handlePointerEvent}
                                {...person}
                                cardStyle={position}
                            />
                        );
                    })}
                </div>
         
        </section>)
}