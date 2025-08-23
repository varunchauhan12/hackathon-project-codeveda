import { motion } from "framer-motion";
import MuiButton from "@mui/material/Button";

const MotionButton = motion(MuiButton);

export default function StyledButton({
  children,
  variant = "primary",
  href,
  ...props
}) {
  const base =
    "!px-6 !py-2.5 !rounded-lg !text-base font-medium tracking-wide transition-all duration-200";

  const styles =
    variant === "primary"
      ? "!bg-green-800 !text-white hover:!bg-green-900" // dark green button
      : "!border !border-green-700 !text-green-600 hover:!bg-green-700 hover:!text-white"; // outline dark green

  return (
    <MotionButton
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      className={`${base} ${styles} ${props.className || ""}`}
      href={href}
      {...props}
    >
      {children}
    </MotionButton>
  );
}
