import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { toursService } from "../api/service/tours";
import { useEffect, useState } from "react";

interface Tour {
  id: number;
  category_id: number;
  name: string;
  description: string;
  background_image: string;
  price: number;
  rating: number;
  place: string;
  duration: string;
  available_dates: string[];
  pack_includes: string[];
  max_people: number;
}

function TourDetail() {
  const { id } = useParams();
  const [tourDetailData, setTourDetailData] = useState<Tour | null>(null);
  const { data } = useFetch<Tour[]>(toursService);

  useEffect(() => {
    if (!data) return;
    const result = data.find(item => item.id === Number(id));
    setTourDetailData(result || null);
  }, [id, data]);

  if (!tourDetailData) {
    return <div>Ma'lumot yuklanmoqda...</div>;
  }

  return (
    <div className="card">
      <div className="TourDetail">
        <img
          src={tourDetailData.background_image}
          alt={tourDetailData.name}
        />
        <div className="malumots">
          <h1>{tourDetailData.name}</h1>
          <p><b>Tavsif</b> {tourDetailData.description}</p>
          <p><b>Manzil:</b> {tourDetailData.place}</p>
          <p><b>Davomiylik:</b> {tourDetailData.duration}</p>
          <p><b>Reyting:</b> {tourDetailData.rating} ⭐</p>
          <p><b>Narx: </b>${tourDetailData.price}</p>
          <p><b>Mavjud sanalar:</b>{tourDetailData.available_dates.join(", ")}</p>
          <p><b>To'plamga kiradi:</b></p>
          <ul>
            {tourDetailData.pack_includes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p><b>Maksimal odam soni:</b> {tourDetailData.max_people}</p>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;