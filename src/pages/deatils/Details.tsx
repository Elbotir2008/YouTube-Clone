import { Link, useParams } from "react-router-dom";
import "./details.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
const Details = () => {
  const [detailsTools, setDetailsTools] = useState([]);
  const [detailsComments, setDetailsComments] = useState([]);
  const [detailsRecomendet, setDetailsRecomendet] = useState([]);
  let params = useParams();
  const fetchVideos = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/videos",
      params: {
        part: "contentDetails,snippet,statistics",
        id: `${params.id}`,
      },
      headers: {
        "X-RapidAPI-Key": "b4d3951735mshc2ec91a7c330cafp1fcff0jsn5d7b628e34d9",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
      //   console.log(data.items);
      setDetailsTools(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/commentThreads",
      params: {
        part: "snippet",
        videoId: `${params.id}`,
        maxResults: "100",
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
      setDetailsComments(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecomendetVideos = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/search",
      params: {
        relatedToVideoId: "7ghhRHRP6t4",
        part: "id,snippet",
        type: "video",
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
      setDetailsRecomendet(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchComments();
    fetchRecomendetVideos();
  }, []);
  return (
    <div className="flex-class">
      <div className="videoBox">
        {detailsTools.length > 0
          ? detailsTools.map((dt: any, index) => (
              <div className="details" key={index}>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${params.id}`}
                  controls
                  className="react-player"
                  loop
                  playing
                />
                <h1>{dt.snippet.title}</h1>
                <p>{dt.snippet.description}</p>
                <b>#{dt.snippet.tags[0]}</b>
                <b className="b">#{dt.snippet.tags[1]}</b>
                <b className="b">#{dt.snippet.tags[2]}</b>
                <b className="b">#{dt.snippet.tags[3]}</b>
              </div>
            ))
          : null}
        <div className="comments">
          {detailsComments.length > 0
            ? detailsComments.map((dc: any, index) => (
                <div className="comment flex-class" key={index}>
                  <img
                    src={
                      dc.snippet.topLevelComment.snippet.authorProfileImageUrl
                    }
                    alt="Eror"
                  />
                  <h4 key={index}>
                    {dc.snippet.topLevelComment.snippet.textOriginal}
                  </h4>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="recomendetVideos">
        {detailsRecomendet.length > 0
          ? detailsRecomendet.map((dv: any, index) => (
              <div className="rcvideos flex-class" key={index}>
                <Link to={`/videos/${dv.id.videoId}`}>
                  <img
                    src={dv.snippet.thumbnails.medium.url}
                    width="200px"
                    height="100px"
                    style={{ cursor: "pointer" }}
                    alt="Eror"
                  />
                </Link>
                <div className="rcvideos-txt">
                  <div
                    className="flex-class"
                    style={{ alignItems: "center", marginLeft: "1rem" }}
                  >
                    <img
                      src={dv.snippet.thumbnails.default.url}
                      width="50px"
                      height="50px"
                      alt="Eror"
                      style={{
                        borderRadius: "50%",
                        marginRight: "1rem",
                      }}
                    />
                    <h2>{dv.snippet.channelTitle}</h2>
                  </div>
                  <h3>{dv.snippet.title}</h3>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Details;
