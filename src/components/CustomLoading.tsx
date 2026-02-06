import { PacmanLoader } from "react-spinners";

export const CustomLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <PacmanLoader color="#5b48ee" size={30} speedMultiplier={2} />
    </div>
  );
};
