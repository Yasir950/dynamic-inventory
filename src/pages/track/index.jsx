import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Button, TextField, Typography } from "@mui/material";
import { CarOutlined } from "@ant-design/icons";
import { getVehByVin } from "apiservices";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { useLocation, useNavigate } from "react-router";
const QontoStepIconRoot = styled("div")(({ theme }) => ({
  color: "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  ...theme.applyStyles("dark", {
    color: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        color: "#784af4",
      },
    },
  ],
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const steps = [
  "New Car",
  "Picked",
  "At Warehouse",
  "Loaded",
  "Shipped",
  "At Port",
  "Arrived",
  "Handed Over",
  "Delivered",
];

export default function CustomizedSteppers() {
  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.3s ease-in-out",

    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),

    ...(ownerState.completed && {
      backgroundColor:
        ownerState.stepIndex === 1
          ? "#6F7B91"
          : ownerState.stepIndex === 2
            ? "#8DC9CC"
            : ownerState.stepIndex === 3
              ? "#F2C43A"
              : ownerState.stepIndex === 4
                ? "#EB6B5C"
                : ownerState.stepIndex === 5
                  ? "#A0C6A2"
                  : ownerState.stepIndex === 6
                    ? "#FF9F30"
                    : ownerState.stepIndex === 7
                      ? "#0095FF"
                      : ownerState.stepIndex === 8
                        ? "#14BA6D"
                        : "#ccc",
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className, icon } = props;

    const icons = {
      1: <CarOutlined />,
      2: <GroupAddIcon />,
      3: <WarehouseIcon />,
      4: <HourglassTopIcon />,
      5: <ChildFriendlyIcon />,
      6: <LocalShippingIcon />,
      7: <AirportShuttleIcon />,
      8: <SignLanguageIcon />,
      9: <DeliveryDiningIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active, stepIndex: Number(icon) }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
  const location = useLocation();

  const [tracked, setTracked] = React.useState(false);
  const [vin, setVin] = React.useState("");
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const data = location.state;
    if (data) {
      setVin(data);
      handleTrack();
    }
    return () => {};
  }, []);
  const handleTrack = async () => {
    let resp = await getVehByVin(vin);
    if (resp?.current_status) {
      setActive(resp.current_status.id);
      setTracked(true);
    }
  };
  return (
    <Stack
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={5}
    >
      <Stack sx={{ width: "50%" }} spacing={2}>
        <Typography variant="h5" gutterBottom>
          Enter Vin No for Tracking
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Track Car By VIN no"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleTrack}
          sx={{ mb: 3, backgroundColor: tracked ? "#ff9800" : "#e0e0e0" }}
        >
          Track
        </Button>
      </Stack>
      <Stack sx={{ width: "100%" }} spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={active - 1}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </Stack>
  );
}
