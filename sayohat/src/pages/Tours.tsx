import { useEffect, useState } from "react";
import { categoriesService } from "../api/service/catagory";
import { toursService } from "../api/service/tours";
import useFetch from "../hooks/useFetch";
import Loading from "../utlis/Loading";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface TourType {
    id: number;
    category_id: number;
    name: string;
    background_image: string;
    price: number;
    rating: number;
    pack_includes: string[];
}

interface catType {
    id: number;
    name: string;
    description?: string;
}

function Tours() {
    const [catagorys, setCatagorys] = useState<catType[]>([]);
    const [tours, setTours] = useState<TourType[]>([]);
    const [filterTours, setFilterTours] = useState<TourType[] | []>([])
    const [active, setActive] = useState<string>('all')

    const { data: tourData, loading: tourLoad, error: tourError } = useFetch<TourType[]>(toursService);
    const { data: catData, loading: catLoad, error: catError } = useFetch<catType[]>(categoriesService);
    const navigate = useNavigate()
    useEffect(() => {
        if (tourData) {
            setTours(tourData);
        }
        if (tourData) {
            setFilterTours(tourData)
        }
        if (catData) {
            setCatagorys(catData);
        }
    }, [tourData, catData]);
    function Rating(rade: number) {
        return '⭐'.repeat(Math.round(rade));
    }

    function handleCategory(catID: number | 'all') {
        if (!tourData) return

        if (catID == 'all') {
            setFilterTours(tourData)
            setActive('all')
        } else {
            const result = tours.filter(tour => tour.category_id == catID)
            setFilterTours(result)
            setActive(String(catID))
        }


    }
    console.log(active);

    return (
        <div className="container">
            <Navbar />
            <div className="tour-title">Mashhur sayohatlar</div>
            <div className="catagory-card">
                {
                    catLoad ? (
                        <Loading />
                    ) : catError ? (
                        <p>{catError}</p>
                    ) : catagorys.length > 0 ? (
                        <div className="items">
                            <div onClick={() => handleCategory('all')} className={`name ${active == 'all' ? 'active' : ''}`}>Barchsi</div>
                            {
                                catagorys.map(catagory => (
                                    <div
                                        className={`name ${active == String(catagory.id) ? 'active' : ''}`}
                                        onClick={() => handleCategory(catagory.id)}
                                        key={catagory.id}
                                    >{catagory.name}</div>
                                ))
                            }</div>
                    ) : (
                        <p>Ma'lumot yo‘q</p>
                    )
                }
            </div>
            <div className="tours-card">
                {
                    tourLoad ? (
                        <div>
                            <Loading />
                        </div>
                    ) : tourError ? (
                        <p>{tourError}</p>
                    ) : filterTours.length > 0 ? (
                        <div className="tour-cards">
                            {
                                filterTours.map(tour => (
                                    <div key={tour.id} className="tour-card">
                                        <img src={tour.background_image} alt={tour.name} />
                                        <div className="name">{tour.name}</div>
                                        <div className="info">
                                            <div className="head">
                                                <div className="rating">{tour.rating ? Rating(tour.rating) : "Reyting yo'q"}</div>
                                                <div className="price">{tour.price}</div>
                                            </div>
                                            <ul className="pack_includes">
                                                {
                                                    tour.pack_includes.map((pack, index) => (
                                                        <li key={index}>{pack}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <button onClick={() => navigate(`tour/${tour.id}`)}>Read More</button>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <p>Ma'lumot yo'q</p>
                    )
                }
            </div>
        </div>
    );
}

export default Tours;
