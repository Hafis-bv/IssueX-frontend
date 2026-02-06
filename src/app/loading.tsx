import { PacmanLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <PacmanLoader color="#5b48ee" size={30} speedMultiplier={3} />
    </div>
  );
}
