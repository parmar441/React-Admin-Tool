import { tokens } from ".";

const Palette = (mode) => {
  const colors = tokens(mode);

  return {
    mode: mode,
    ...(mode === "dark"
      ? {
          // palette values for dark mode
          primary: {
            main: colors.primary[500],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          error: {
            main: colors.redAccent[500],
          },
          warning: {
            main: colors.redAccent[500],
          },
          info: {
            main: colors.blueAccent[500],
          },
          success: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[500],
          },
        }
      : {
          // palette values for light mode
          primary: {
            main: colors.primary[100],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          error: {
            main: colors.redAccent[500],
          },
          warning: {
            main: colors.redAccent[500],
          },
          info: {
            main: colors.blueAccent[500],
          },
          success: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: "#fcfcfc",
          },
        }),
  };
};

export default Palette;
