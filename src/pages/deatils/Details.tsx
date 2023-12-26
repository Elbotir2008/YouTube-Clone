import { Link, useParams } from "react-router-dom";
import "./details.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Loading from "../../loading/Loading";
import { Button, Input } from "@mui/material";
const Details = () => {
  const [detailsTools, setDetailsTools] = useState([]);
  const [detailsComments, setDetailsComments] = useState([]);
  const [detailsRecomendet, setDetailsRecomendet] = useState([]);
  const [comments, setComments] = useState([{ id: 1, text: "Asadov Elbotir" }]);
  const [newComment, setNewComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
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
        "X-RapidAPI-Key": "b87e71253bmsh4087579332e4b83p1726c5jsn95d11fef2cb4",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    try {
      let res = await axios.request(options);
      let data = await res.data;
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
        "X-RapidAPI-Key": "b87e71253bmsh4087579332e4b83p1726c5jsn95d11fef2cb4",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };
    try {
      let res = await axios.request(options);
      let data = await res.data;
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
        "X-RapidAPI-Key": "b87e71253bmsh4087579332e4b83p1726c5jsn95d11fef2cb4",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };
    try {
      let res = await axios.request(options);
      let data = await res.data;
      setDetailsRecomendet(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = (e: any) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newComments = [
        ...comments,
        { id: comments.length + 1, text: newComment },
      ];
      setComments(newComments);
      setNewComment("");
    }
  };

  const editComment = (id: any, text: any) => {
    setEditedCommentId(id);
    setEditedCommentText(text);
  };

  const saveEditedComment = () => {
    const updatedComments = comments.map((comment) =>
      comment.id === editedCommentId
        ? { ...comment, text: editedCommentText }
        : comment
    );
    setComments(updatedComments);
    setEditedCommentId(null);
    setEditedCommentText("");
  };

  useEffect(() => {
    fetchVideos();
    fetchComments();
    fetchRecomendetVideos();
  }, []);

  const deleteComment = (id: any) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return (
    <div className="flex-class">
      <div className="videoBox">
        {detailsTools?.length > 0 ? (
          detailsTools?.map((dt: any, index) => (
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
        ) : (
          <Loading />
        )}

        <div className="myComments">
          <form>
            <Input
              size="medium"
              sx={{ marginLeft: "5rem", width: "40rem", fontSize: "1.6rem" }}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              placeholder="write comment..."
            />
            <Button
              type="submit"
              variant="outlined"
              onClick={(e) => addComment(e)}
            >
              Add Comment
            </Button>
          </form>
        </div>

        <div className="comments">
          <div className="comments">
            {comments.map((comment) => (
              <div key={comment.id} className="comment2">
                {editedCommentId === comment.id ? (
                  <div className="flex-class">
                    <input
                      type="text"
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                    />
                    <Button
                      variant="outlined"
                      style={{ marginLeft: "0rem", marginTop: "0rem" }}
                      onClick={saveEditedComment}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex-class">
                    <img
                      src="../../../public/menjpeg.jpeg"
                      className="myImg"
                      alt="Eror"
                    />
                    <p className="commenPhar">{comment.text}</p>
                  </div>
                )}
                <Button
                  variant="outlined"
                  onClick={() => editComment(comment.id, comment.text)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
          {detailsComments?.length > 0
            ? detailsComments?.map((dc: any, index) => (
                <div className="comment flex-class" key={index}>
                  <Link to={`/channel/${dc.snippet.channelId}`}>
                    <img
                      src={
                        dc.snippet.topLevelComment.snippet.authorProfileImageUrl
                      }
                      alt="Eror"
                    />
                  </Link>
                  <h4 key={index}>
                    {dc.snippet.topLevelComment.snippet.textOriginal}
                  </h4>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="recomendetVideos">
        {detailsRecomendet?.length > 0 ? (
          detailsRecomendet?.map((dv: any, index) => (
            <div className="rcvideos flex-class" key={index}>
              <Link to={`/videos/${dv.id.videoId}`}>
                <img
                  src={dv.snippet.thumbnails.medium?.url}
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
                  <Link to={`/channel/${dv.snippet.channelId}`}>
                    <img
                      src={dv.snippet.thumbnails.default?.url}
                      width="50px"
                      height="50px"
                      alt="Eror"
                      style={{
                        borderRadius: "50%",
                        marginRight: "1rem",
                      }}
                    />
                  </Link>
                  <h2>{dv.snippet.channelTitle}</h2>
                </div>
                <h3>{dv.snippet.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Details;
