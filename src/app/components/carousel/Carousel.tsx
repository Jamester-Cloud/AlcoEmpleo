"use client"
import Carousel from "react-multi-carousel";
import "./css/style.css"
import "react-multi-carousel/lib/styles.css";
import Card from "../cards/card";
export default function ListCarousel(props:any) {
    //let {data} = props;
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 767, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const data = [
        //First image url
        {
            url:
                "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1"
        },
        {
            url:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*"
        },
        //Second image url
        {
            url:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*"
        },
        //Third image url
        {
            url:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU"
        },

        //Fourth image url

        {
            url:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdvuww0JDC7nFRxiFL6yFiAxRJgM-1tvJTxA&usqp=CAU"
        }
    ];

    return (
        <div className="parent vh-50">
            <Carousel
                responsive={responsive}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                showDots={false}
                infinite={true}
                partialVisible={false}
            >
                {data.map((imageUrl, index) => {
                    return (
                        <div key={index}>
                            <Card></Card>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    )
}