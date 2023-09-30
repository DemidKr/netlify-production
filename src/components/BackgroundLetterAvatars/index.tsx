import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";

interface IProps {
  firstName: string;
  secondName: string;
}

export const BackgroundLetterAvatars = ({ firstName, secondName }: IProps) => {
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(firstName: string, secondName: string) {
    return `${firstName.split(" ")[0][0]}${
      secondName.split(" ")?.[1]?.[0] ?? ""
    }`;
  }

  return (
    <Avatar
      sx={{
        bgcolor: stringToColor(firstName + " " + secondName),
        width: "25px",
        height: "25px",
      }}
    >
      <Typography
        component="div"
        sx={{
          color: "#FFF",
          fontSize: "12px",
          fontFamily: "Inter",
          fontWeight: "400",
          lineHeight: "normal",
        }}
      >
        {stringAvatar(firstName, secondName)}
      </Typography>
    </Avatar>
  );
};
