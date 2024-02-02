import styled from "@emotion/styled";
import {
  Tooltip,
  TooltipProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  cardStyles,
  containerStyles,
  iconStyles,
  quoteStyles,
  titleStyles,
  tooltipStyles,
} from "./styles";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const Card = styled("div")(cardStyles);
const Title = styled(Typography)(titleStyles);
const Quote = styled("div")(quoteStyles);
const QuoteIcon = styled(FormatQuoteIcon)(iconStyles);
const Container = styled("div")(containerStyles);
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(tooltipStyles);

export const KanyeQuote = () => {
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["kanye"],
    queryFn: async () => (await axios.get("https://api.kanye.rest/api")).data,
  });

  const quote = (
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

  return (
    <Container>
      {isSmallScreen ? (
        <HtmlTooltip title={quote}>
          <QuoteIcon />
        </HtmlTooltip>
      ) : (
        quote
      )}
    </Container>
  );
};
