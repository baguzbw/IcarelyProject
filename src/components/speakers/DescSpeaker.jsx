import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL, API_GAMBAR_URL } from "../../config";

const DescSpeakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}speaker`)
      .then((response) => {
        setSpeakers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const keynoteSpeaker = speakers.slice(0, 1);
  const invitedSpeakers = speakers.slice(1);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto font-plus-jakarta p-8 mb-20 text-center">
      <h1 className="text-5xl font-semibold mb-6">Keynote Speakers</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {keynoteSpeaker.map((speaker, index) => (
          <div key={index} className="m-4 w-[320px]">
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden" style={{ boxShadow: "0 0 4px #00FF94, 0 0 8px #00FF94, 0 0 12px #00FF94, 0 0 16px #00FF94" }}>
              <img className="w-[320px] h-[420px] object-cover" src={`${API_GAMBAR_URL}${speaker.gambar_speaker}`} alt={`Speaker ${index}`} />
            </div>
            <h2 className="text-4xl font-semibold mt-4 mb-2">{speaker.nama}</h2>
            <p className="text-gray-600 text-xl">{speaker.instansi}</p>
          </div>
        ))}
      </div>
      <h1 className="text-5xl font-semibold mt-20 mb-12 ml-44 text-left">Invited Speakers</h1>
      <div className="flex flex-col items-start gap-8 ml-44">
        {invitedSpeakers.map((speaker, index) => (
          <div key={index} className="flex flex-row" style={{ width: "1000px" }}>
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden" style={{ boxShadow: "0 0 4px #00FF94, 0 0 8px #00FF94, 0 0 12px #00FF94, 0 0 16px #00FF94" }}>
              <img className="w-[320px] h-[420px] object-cover" src={`${API_GAMBAR_URL}${speaker.gambar_speaker}`} alt={`Speaker ${index}`} />
            </div>
            <div className="ml-20 flex flex-col text-left justify-center" style={{ width: "640px" }}>
              <h2 className="text-5xl font-semibold mb-2">{speaker.nama}</h2>
              <h1 className="text-2xl">{speaker.tema}</h1>
              <p className="text-gray-600 text-xl">{speaker.instansi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DescSpeakers;
