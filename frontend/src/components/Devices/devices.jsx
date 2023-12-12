import React, { useEffect, useState } from "react";
import { getAllDevicesService, getAllUsers, createDeviceApiService } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeviceModal from "../modals/deviceModal";


const Devices = () => {
  const userData = JSON.parse(localStorage.getItem("user"))
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [deviceList, setDeviceList] = useState([]);
  const [deviceModal, setDeviceModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [device, setDevice] = useState({
    name: "",
    user: "Choose a user",
    serial_number: "",
    manufacturer: "",
    is_active: true,
  });
  const navigate = useNavigate();

  const onClickMoreInfo = (deveiceId) => {
    navigate(`/device_details/${deveiceId}`, { state: { users } });
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const getDeviceApiCall = async () => {
    try {
      const data = await getAllDevicesService();
      setDeviceList(data);
    } catch (error) {
      localStorage.clear()
      navigate("/login")
      console.log(error);
    }
  };

  const getAllUsersApiCall = async () => {
    const users = await getAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    getDeviceApiCall();
    getAllUsersApiCall();
  }, []);

  const handleAddDevice = async () => {
    const { name, manufacturer, user, serial_number } = device
    if (!name || !manufacturer || !user || !serial_number || user === "Choose a user") {
      toast.error("Please fill all the required fields")
      return
    }
    try {
      const data = await createDeviceApiService(device);
      if (data) {
        setDeviceModal(false)
        setDevice({})
        toast.success("Device is created");
        getDeviceApiCall()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container mx-auto px-6 py-3">
        {userData.role !== "operator" && (
          <button onClick={() => setDeviceModal(true)} style={{
            backgroundColor: "deepskyblue",
            padding: "10px",
            borderRadius: "10px",
            color: "white",
            marginBottom: "10px"
          }}>Add Device</button>
        )}
        <hr />
        {deviceList?.map((item, index) => (
          <div key={index} className="relative mb-3">
            <h6 className="mb-0">
              <button
                onClick={() => toggleAccordion(index)}
                className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
              >
                <span>Device - {`${item?.name}_${item?.serial_number}`}</span>
                <i
                  className={`absolute right-0 pt-1 text-xs fa ${activeAccordion === index ? "fa-minus" : "fa-plus"
                    } ${activeAccordion === index ? "opacity-100" : "opacity-0"
                    } group-open:opacity-100`}
                ></i>
              </button>
            </h6>
            <div
              className={`${activeAccordion === index ? "block" : "hidden"
                } overflow-hidden transition-all duration-300 ease-in-out`}
            >
              <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
                Manufacturer - {item?.manufacturer}
              </div>
              <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
                Purchase Date - {item?.purchase_date}
              </div>
              <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
                Serial Number - {item?.serial_number}
              </div>
              <div className="px-4">
                <button
                  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  onClick={() => onClickMoreInfo(item?.id)}
                >
                  More Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {deviceModal && (
        <DeviceModal
          setDeviceModal={setDeviceModal}
          setDevice={setDevice}
          device={device}
          users={users}
          handleAddDevice={handleAddDevice}
        />
      )}
    </>
  );
};

export default Devices;
