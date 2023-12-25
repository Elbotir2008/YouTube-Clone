import { Link, useParams } from "react-router-dom";
import "./channel.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading/Loading";
const Channel = () => {
  const [channel, setChannel] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]);
  let params = useParams();
  params;

  const fetchChennel = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/channels",
      params: {
        part: "snippet,statistics",
        id: params.id,
      },
      headers: {
        "X-RapidAPI-Key": "b87e71253bmsh4087579332e4b83p1726c5jsn95d11fef2cb4",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
      setChannel(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChennelVideos = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/search",
      params: {
        channelId: params.id,
        part: "snippet,id",
        order: "date",
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": "b87e71253bmsh4087579332e4b83p1726c5jsn95d11fef2cb4",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
      setChannelVideos(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChennel();
    fetchChennelVideos();
  }, []);

  return (
    <div className="channel">
      {channel?.length > 0 ? (
        channel?.map((ch: any, index) => (
          <div
            key={index}
            className="channel-box"
            style={{
              backgroundColor: "black",
              borderBottomLeftRadius: "20rem",
              borderBottomRightRadius: "20rem",
              padding: "2rem",
              marginTop: "-1rem",
            }}
          >
            <img
              src={ch.snippet.thumbnails.medium.url}
              alt="Eror"
              style={{ borderRadius: "50%", marginLeft: "42rem" }}
              width="200px"
              height="200px"
            />
            <div
              className="flex-class"
              style={{ marginLeft: "30rem", color: "#fff", gap: "13rem" }}
            >
              <h2>Title: {ch.snippet.title}</h2>
              <h2>Subscribers: {ch.statistics.subscriberCount}</h2>
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}

      <div className="channelVideos grid-class">
        {channelVideos?.length > 0 ? (
          channelVideos?.map((chv: any, index) => (
            <Link to={`/videos/${chv.id.videoId}`} key={index}>
              <div className="channelVideo">
                <img
                  src={chv.snippet.thumbnails.medium.url}
                  width="300px"
                  height="200px"
                />
                <h1>{chv.snippet.title}</h1>
              </div>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Channel;
