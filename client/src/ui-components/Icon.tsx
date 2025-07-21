import { useCallback, useMemo } from "react";
import { Tooltip, Box } from "@mui/material";
import theme from "../theme";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { RefreshCw, Settings, LogInIcon } from "lucide-react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

export interface TypeProps {
  type?:
    | "angle-down"
    | "calendar"
    | "angle-right"
    | "angle-left"
    | "settings"
    | "refresh"
    | "login"
    | "google"
    | "facebook";
}

export interface IconProps {
  id: string;
  type?:
    | "angle-down"
    | "calendar"
    | "angle-right"
    | "angle-left"
    | "settings"
    | "refresh"
    | "login"
    | "google"
    | "facebook";
  color?: string;
  disabled?: boolean;
  style?: any;
  variant?: string;
  onClick?: () => void;
  tabIndex?: number;
  marginRequired?: boolean;
  tooltip?: string;
  error?: boolean;
  showbg?: boolean;
}

export function Icon({
  id,
  type,
  color,
  style,
  disabled,
  variant = "medium",
  onClick,
  tabIndex = -1,
  marginRequired = true,
  tooltip,
  error = false,
  showbg = false,
}: IconProps) {
  const getContainerHeightAndWidth = useCallback((variant: string) => {
    let height, width;
    if (variant === "small") {
      height = 14;
      width = 14;
    } else if (variant === "medium") {
      height = 16;
      width = 16;
    } else if (variant === "inherit") {
      height = 18;
      width = 18;
    } else if (variant === "midsize") {
      height = 22;
      width = 22;
    } else if (variant === "large") {
      height = 24;
      width = 24;
    } else {
      height = 20;
      width = 20;
    }
    return { height, width };
  }, []);

  const bgIconStyle = {
    background: error
      ? theme.palette.error.light
      : theme.palette.primary.lighter,
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mx: 0.7,
  };

  const containerHeight = getContainerHeightAndWidth(variant).height;
  const containerWidth = getContainerHeightAndWidth(variant).width;
  const isDisable = disabled ? 0.5 : 1;
  const modifiedStyle = useMemo(() => {
    return {
      ...style,
      height: getContainerHeightAndWidth(variant).height - 2 + "px",
      width: getContainerHeightAndWidth(variant).width - 2 + "px",
      // color: color
      //   ? color
      //   : error
      //   ? theme.palette.error.main
      //   : theme.palette.primary.main,
      cursor: "pointer",
    };
  }, [getContainerHeightAndWidth, style, variant]);

  const getIcon = useCallback(() => {
    switch (type) {
      case "angle-down":
        return (
          <Box
            sx={showbg ? bgIconStyle : null}
            onClick={onClick}
            id={id + "angle-down"}
          >
            <ExpandMoreOutlinedIcon
              strokeWidth={0.8}
              style={{ ...modifiedStyle }}
            />
          </Box>
        );

      case "angle-right":
        return (
          <Box
            sx={showbg ? bgIconStyle : null}
            onClick={onClick}
            id={id + "angle-right"}
          >
            <KeyboardArrowRightOutlinedIcon
              strokeWidth={0.8}
              style={{ ...modifiedStyle }}
            />
          </Box>
        );

      case "angle-left":
        return (
          <Box
            sx={showbg ? bgIconStyle : null}
            onClick={onClick}
            id={id + "angle-left"}
          >
            <KeyboardArrowLeftOutlinedIcon
              strokeWidth={0.8}
              style={{ ...modifiedStyle }}
            />
          </Box>
        );

      case "refresh":
        return (
          <Box
            sx={showbg ? bgIconStyle : null}
            onClick={onClick}
            id={id + "refresh"}
          >
            <RefreshCw strokeWidth={0.8} style={{ ...modifiedStyle }} />
          </Box>
        );

      case "calendar":
        return (
          <Box sx={bgIconStyle} onClick={onClick} id={id + "angle-down"}>
            <ExpandMoreOutlinedIcon
              strokeWidth={0.8}
              style={{ ...modifiedStyle }}
            />
          </Box>
        );

      case "settings":
        return (
          <Box
            sx={showbg ? bgIconStyle : null}
            onClick={onClick}
            id={id + "setting"}
          >
            <Settings strokeWidth={0.8} style={{ ...modifiedStyle }} />
          </Box>
        );

      case "login":
        return (
          <Box
            sx={showbg ? bgIconStyle : null}
            onClick={onClick}
            id={id + "login"}
          >
            <LogInIcon strokeWidth={1} style={{ ...modifiedStyle }} />
          </Box>
        );

      case "google":
        return (
          <Box
            sx={showbg ? bgIconStyle : null}
            onClick={onClick}
            id={id + "google"}
          >
            <GoogleIcon strokeWidth={1} style={{ ...modifiedStyle }} />
          </Box>
        );

      case "facebook":
        return (
          <Box
            sx={showbg ? bgIconStyle : null}
            onClick={onClick}
            id={id + "facebook"}
          >
            <FacebookIcon strokeWidth={1} style={{ ...modifiedStyle }} />
          </Box>
        );
    }

    return null;
  }, [
    color,
    id,
    isDisable,
    marginRequired,
    modifiedStyle,
    onClick,
    tabIndex,
    type,
    variant,
  ]);

  const iconElement = () => {
    return (
      <Box
        sx={{
          height: containerHeight,
          width: containerWidth,
          minWidth: containerWidth,
          padding: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 0,
          color: color ? color : "primary.dark",
          ...(tooltip
            ? {
                "&:hover": {
                  cursor: "pointer", // Cursor change on hover when tooltip is available
                },
              }
            : {}),
        }}
      >
        {getIcon()}
      </Box>
    );
  };

  const tooltipComponentProps = useMemo(() => {
    return {
      tooltip: {
        sx: {
          textAlign: "center",
          cursor: "pointer",
          pointerEvents: "auto",
        },
      },
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -4.75],
          },
        },
      ],
    };
  }, []);

  return tooltip ? (
    <Tooltip
      id={`${id}-tooltip`}
      title={tooltip}
      slotProps={tooltipComponentProps}
      disableInteractive
    >
      {iconElement()}
    </Tooltip>
  ) : (
    iconElement()
  );
}

export default Icon;
