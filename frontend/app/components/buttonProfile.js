import { Button } from "@mui/material";

export default function ButtonProfile({
  id,
  handleClick,
  children,
  
}) {
  return (
    <Button
      onClick={handleClick}
      id={id}
      className="basis-1/4 rounded-md bg-[#F6E9E0] text-[#FF6724]  hover:bg-[#FF6724] hover:text-white focus:bg-[#FF6724] focus:text-white"
    >
      {children}
    </Button>
  );
}
