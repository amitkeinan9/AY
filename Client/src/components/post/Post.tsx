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
import { Author, PostDTO } from "../../types/post";

interface PostProps {
  author: Author;
  content?: string;
  image?: string;
  commentsCount?: number;
  onClick?: (post: Omit<PostDTO, "_id">) => void;
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
  const { author, content, commentsCount, image, onClick } = props;

  const handleClick = () => {
    onClick({
      author,
      commentsCount,
      content,
      image,
    });
  };

  return (
    <PostContainer onClick={handleClick} isClickable={onClick !== undefined}>
      <Avatar alt={author.fullName} src={author.profilePic}></Avatar>
      <div>
        <PostHeader>
          <strong>{author.fullName}</strong>{" "}
          <Username>{author.username}</Username>
        </PostHeader>

        <div>{content}</div>
        {image && <Image src={image} />}

        {commentsCount !== undefined && (
          <PostFooter>
            <CommentIcon /> {commentsCount}
          </PostFooter>
        )}
      </div>
    </PostContainer>
  );
};
