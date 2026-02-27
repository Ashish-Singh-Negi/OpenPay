import { colorPalette } from "./colorPalette";

const { white, black, gray, slate, success, error, blue } = colorPalette;

export const darkTheme = {
  logo: {
    primary: white,
    secondary: blue[500],
  },
  bgColor: {
    primary: black,
    secondary: gray[950],
  },
  textColor: {
    primary: white,
    secondary: slate[200],
    muted: slate[600],
    link: blue[400],
  },
  status: {
    success: success,
    error: error,
  },
  button: {
    primary: {
      bg: blue[700],
      text: white,
    },
    secondary: {
      bg: blue[200],
      text: black,
    },
  },
  navbar: {
    default: {
      bg: blue[300],
      text: slate[200],
    },
    active: {
      bg: blue[950],
      text: blue[500],
    },
  },
  borderColor: {
    primary: blue[950],
    focused: blue[500],
  },
};
