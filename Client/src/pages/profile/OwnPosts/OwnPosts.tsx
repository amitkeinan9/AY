import { Alert, Box, CircularProgress, Container, Typography } from "@mui/material"
import styled from '@emotion/styled';
import { useNavigate } from "react-router-dom";
import { PostDTO } from "../../../types/post";
import { Post } from "../../../components/post/Post";
import { postsTitleStyles } from "./styles";

interface Props {
    isLoading: boolean;
    isError: boolean;
    posts: PostDTO[];
}

const PostsTitle = styled(Typography)(postsTitleStyles);

export const OwnPosts = ({ isLoading, isError, posts }: Props) => {
    const navigate = useNavigate();
    return (
        <Box>
            <PostsTitle>Posts</PostsTitle>
            {isLoading ? (
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Container>
            ) : isError ? (
                <Container>
                    <Alert severity="error">
                        Could not fetch posts, please try again later
                    </Alert>
                </Container>
            ) : (posts && posts.map(({ _id, author, content, commentsCount }: PostDTO) => (
                <Post
                    // TODO: Fix after adding pictures usernames and names
                    author={{
                        fullName: "",
                        username: author.email,
                        profilePic: "",
                    }}
                    content={content}
                    commentsCount={commentsCount}
                    onClick={() => navigate(`/posts/${_id}`)}
                />
            )))}
        </Box>
    )
};
