import { Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../loading/Loading";

const Videos = () => {
  const [videosData, setVideosData] = useState<any>([]);
  const [selectedButton, setSelectedButton] = useState("");
  const fetchVideos = async () => {
    const options = {
      method: "GET",
      url: `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=$news`,
      params: {
        playlistId: "RDZiQo7nAkQHU",
        part: "snippet",
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": "1d48b52a30msh402aef233dd2b53p13823djsn07843b2bbce3",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
      setVideosData(data.items); // Set the items array to state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos();
    // fetchInputValues();
  }, []);

  const handleClick = async (e: any) => {
    setSelectedButton(e.currentTarget.innerText);
    const options = {
      method: "GET",
      url: `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=$${e.currentTarget.innerText}`,
      params: {
        playlistId: "RDZiQo7nAkQHU",
        part: "snippet",
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": "1d48b52a30msh402aef233dd2b53p13823djsn07843b2bbce3",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
      setVideosData(data.items); // Set the items array to state
    } catch (error) {
      console.log(error);
    }
  };

  //   setVideosData(searchVideos);

  return (
    <Box>
      <div className="btns flex-class">
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "New" ? "selectedButton" : ""}
        >
          New
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Movie" ? "selectedButton" : ""}
        >
          Movie
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "New" ? "selectedButton" : ""}
        >
          Live
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Live" ? "selectedButton" : ""}
        >
          Gaming
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Education" ? "selectedButton" : ""}
        >
          Education
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Sport" ? "selectedButton" : ""}
        >
          Sport
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Comedy" ? "selectedButton" : ""}
        >
          Comedy
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Podcast" ? "selectedButton" : ""}
        >
          Podcast
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Fashion" ? "selectedButton" : ""}
        >
          Fashion
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "Crypto" ? "selectedButton" : ""}
        >
          Crypto
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e)}
          className={selectedButton === "GYM" ? "selectedButton" : ""}
        >
          GYM
        </Button>
      </div>
      <div className="cards grid-class">
        {videosData?.length > 0 ? (
          videosData?.map((vd: any, index: any) => (
            <div className="card" key={index}>
              <Link to={`/videos/${vd.id.videoId}`}>
                <img src={vd.snippet.thumbnails.high.url} alt="Error" />
              </Link>
              <h1>{vd.snippet.title}</h1>
              <Link to={`/channel/${vd.snippet.channelId}`}>
                <div className="flex-class">
                  <img
                    src={vd.snippet.thumbnails.default.url}
                    className="channelImg"
                    alt="Eror"
                  />
                  <h4>{vd.snippet.channelTitle}</h4>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </Box>
  );
};

export default Videos;
