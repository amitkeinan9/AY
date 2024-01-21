import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cardStyles, quoteStyles, titleStyles } from "./styles";

const Card = styled("div")(cardStyles);
const Title = styled(Typography)(titleStyles);
const Quote = styled("div")(quoteStyles);

export const KanyeQuote = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["kanye"],
    queryFn: async () => (await axios.get("https://api.kanye.rest/api")).data,
  });

  return (
    <Card>
      <Title>Some motivation from Kanye:</Title>
      {isLoading ? (
        "Thinking about it..."
      ) : isError ? (
        "Kanye is not motivational right not, try again later"
      ) : (
        <Quote>"{data.quote}"</Quote>
      )}

      <a href="https://en.wikipedia.org/wiki/Kanye_West">Read more &#8594;</a>
    </Card>
  );
};
