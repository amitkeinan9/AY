import { styled } from "@mui/system";
import { Post } from "../../components/post/Post";
import BackIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton/IconButton";
const PostContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  width: "40vw",
  borderRight: "1px solid rgba(239,243,244,1.00)",
  borderLeft: "1px solid rgba(239,243,244,1.00)",
});

const PostHeader = styled("div")({
  display: "flex",
  flexDirection: "row",
  fontSize: "1.5rem",
  alignItems: "center",
});

const BackButton = styled(IconButton)({
  margin: 10,
});

export const PostPage = () => {
  const navigator = useNavigate();
  const { postId } = useParams();

  // TODO: Add logic w/ get comments

  const goBack = () => {
    navigator(-1);
  };

  return (
    <PostContainer>
      <PostHeader>
        <BackButton>
          <BackIcon onClick={goBack} />
        </BackButton>
        <strong>Post</strong>
      </PostHeader>
      <Post
        content="How are you guys?"
        author={{
          fullName: "Amit Keinan",
          username: "@amitkeinan",
          profilePic:
            "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
        }}
        comments={0}
      />
      <Post
        content="How are you guys?"
        author={{
          fullName: "Yael Cohen",
          username: "@yael",
          profilePic: "https://google.com/pic",
        }}
      />
    </PostContainer>
  );
};
