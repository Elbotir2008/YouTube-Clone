import { Link, useParams } from "react-router-dom";
import "./channel.scss";
import { useEffect, useState } from "react";
import axios from "axios";
const Channel = () => {
  const [channel, setChannel] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]);
  let params = useParams();
  console.log(params);

  const fetchChennel = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/channels",
      params: {
        part: "snippet,statistics",
        id: params.id,
      },
      headers: {
        "X-RapidAPI-Key": "b4d3951735mshc2ec91a7c330cafp1fcff0jsn5d7b628e34d9",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
      console.log(data.items);
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
        "X-RapidAPI-Key": "b4d3951735mshc2ec91a7c330cafp1fcff0jsn5d7b628e34d9",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
      console.log(data.items);
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
      {channel.length > 0
        ? channel.map((ch: any) => (
            <div
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
        : null}

      <div className="channelVideos grid-class">
        {channelVideos.length > 0
          ? channelVideos.map((chv: any) => (
              <Link to={`/videos/${chv.id.videoId}`}>
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
          : null}
      </div>
    </div>
  );
};

export default Channel;
