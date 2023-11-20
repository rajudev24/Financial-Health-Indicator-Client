import { useState } from "react";
import ShowData from "../components/UI/ShowData";
import UserDashboard from "../components/UI/UserDashboard";

export default function Dashboard() {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <div className="pb-16 ">
      <UserDashboard setIsUpdate={setIsUpdate} />
      <ShowData isUpdate={isUpdate} />
    </div>
  );
}
