import { useEffect, useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import axiosInstance from "../axios-instance";
import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";
import { BsPencilSquare, BsSearch, BsTrash } from "react-icons/bs";
import InputSelect from "../components/InputSelect";
const ActivityLogsView = () => {
  const [loading, setLoading] = useState(false);
  const [logss, setlogss] = useState([]);
  const fetchlogs = async () => {
    try {
      setLoading(true);
      let res = await axiosInstance.get("/logs");
      if (res.data.status) {
        setLoading(false);
        setlogss(res.data.payload);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchlogs();
  }, []);

  return (
    <div className="w-full bg-white p-5">
      <div className="flex justify-between">
        <div className="">
          <p className="font-bold text-lg">Activity Logs</p>
        </div>
        <div className="w-72 -mt-5">
          <InputField
            placeholder="search"
            icon={<BsSearch className="mt-2 mr-2" />}
          />
        </div>
        <div className="flex gap-3 -mt-5">
          <InputField type="date" />
          <InputField type="date" />
        </div>
      </div>
      <div className="flex -mt-5 text-sm font-bold border-b">
        <div className="p-2 w-2/12">Date</div>
        <div className="p-2 w-3/12">User</div>
        <div className="p-2 w-2/12">Action</div>
        <div className="p-2 w-5/12">Description</div>
      </div>
      <div className="h-[calc(100vh-200px)] overflow-y-auto">
        {logss.map((log) => {
          return (
            <div className="flex text-sm border-gray3 hover:bg-gray1 cursor-pointer border-b">
              <div className="p-2 w-2/12">{log.timestamp}</div>
              <div className="p-2 w-3/12">
                <p>
                  {log.staff.first_name} {log.staff.last_name} -
                  <span className="p-2 bg-gray1 text-xs">
                    {log.staff.email}
                  </span>
                </p>
              </div>
              <div className="p-2 w-2/12">{log.action}</div>
              <div className="p-2 w-5/12 break-words truncate">
                <p className="whitespace-normal overflow-hidden text-ellipsis">
                  {log.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {loading ? <Loader /> : null}
    </div>
  );
};
export default ActivityLogsView;
