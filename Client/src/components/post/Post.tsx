import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar/Avatar";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import {
  commentIconStyles,
  imageStyles,
  postContainerHoverStyles,
  postContainerStyles,
  postFooterStyles,
  postHeaderStyles,
  usernameStyles,
} from "./styles";

interface PostProps {
  author: {
    fullName: string;
    username: string;
    profilePic: string;
  };
  content: string;
  image?: string;
  comments?: number;
  onClick?: () => void;
}

const PostContainer = styled("div")(
  postContainerStyles,
  (props: { isClickable: boolean }) => ({
    "&:hover": props.isClickable ? postContainerHoverStyles : {},
  })
);
const Username = styled("span")(usernameStyles);
const PostHeader = styled("div")(postHeaderStyles);
const PostFooter = styled("div")(postFooterStyles);
const Image = styled("img")(imageStyles);
const CommentIcon = styled(ChatBubbleOutlineOutlinedIcon)(commentIconStyles);

export const Post = (props: PostProps) => {
  const { author, content, comments, image, onClick } = props;

  return (
    <PostContainer onClick={onClick} isClickable={onClick !== undefined}>
      <Avatar alt={author.fullName} src={author.profilePic}></Avatar>
      <div>
        <PostHeader>
          <strong>{author.fullName}</strong>{" "}
          <Username>{author.username}</Username>
        </PostHeader>

        <div>{content}</div>
        {image && <Image src={image} />}

        {comments !== undefined && (
          <PostFooter>
            <CommentIcon /> {comments}
          </PostFooter>
        )}
      </div>
    </PostContainer>
  );
};
