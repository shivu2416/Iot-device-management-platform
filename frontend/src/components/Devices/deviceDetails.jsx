import React, { useEffect, useState } from "react";
import {
  getDeviceByIdService,
  addDeviceDataService,
  updateDeviceByIdService,
  deleteDeviceByIdService,
  deleteDeviceDataByIdService,
  getAllDeviceDataService,
  editDeviceDataService
} from "../../services/api";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import EditDeviceModal from "../modals/editDeviceModal"
import DeviceDataModal from "../modals/deviceDataModal";

const DeviceDetails = () => {
  const userData = JSON.parse(localStorage.getItem("user"))
  const [device, setDevice] = useState({});
  const [deviceData, setDeviceData] = useState({
    device_id: "",
    timestamp: "",
    temperature: "",
    humidity: "",
    value: "",
    location: "",
    status: "",
    battery_level: ""
  })
  const [deviceDataModal, setDeviceDataModal] = useState(false);
  const [deviceModal, setDeviceModal] = useState(false);
  const [allDeviceData, setAllDeviceData] = useState([])
  const [editId, setEditId] = useState("")
  const users = useLocation().state.users

  const navigate = useNavigate();
  const params = useParams();
  const { deviceId } = params;

  useEffect(() => {
    fetchDeviceById(deviceId);
    fetchAllDeviceData()
  }, [deviceId]);

  const fetchDeviceById = async (deviceId) => {
    try {
      const data = await getDeviceByIdService(deviceId);
      setDevice(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllDeviceData = async () => {
    try {
      const data = await getAllDeviceDataService(deviceId);
      setAllDeviceData(data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddDeviceData = async () => {
    const { temperature, humidity, value, status, battery_level, timestamp } = deviceData
    if (!temperature || !humidity || !value || !status || !battery_level || !timestamp) {
      toast.error("Please fill all the required fields")
      return
    }
    if (status.toLowerCase() === "offline" || status.toLowerCase() === "online") {
      try {
        const res = await addDeviceDataService({ ...deviceData, device_id: deviceId });
        if (res) {
          setDeviceDataModal(false)
          toast.success("Device data is added")
          fetchAllDeviceData()
          setDeviceData({})
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Device status is invalid")
    }
  }

  const handleEditDeviceData = async () => {
    const { temperature, humidity, value, status, battery_level, timestamp } = deviceData
    if (!temperature || !humidity || !value || !status || !battery_level || !timestamp) {
      toast.error("Please fill all the required fields")
      return
    }
    if (status.toLowerCase() === "offline" || status.toLowerCase() === "online") {
      try {
        const res = await editDeviceDataService(deviceData, editId);
        if (res) {
          setDeviceDataModal(false)
          toast.success("Device data is updated")
          fetchAllDeviceData()
          setDeviceData({})
          setEditId("")
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Device status is invalid")

    }
  }

  const handleEditDevice = async () => {
    const { name, manufacturer, user, serial_number } = device
    if (!name || !manufacturer || !user || !serial_number) {
      toast.error("Please fill all the required fields")
      return
    }
    try {
      const data = await updateDeviceByIdService(deviceId, device);
      if (data) {
        setDeviceModal(false)
        toast.success("Device is updated");
        fetchDeviceById(deviceId)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteDevice = async () => {
    try {
      await deleteDeviceByIdService(deviceId);
      toast.success("Device is deleted");
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteDeviceData = async (id) => {
    try {
      await deleteDeviceDataByIdService(id);
      toast.success("Device data is deleted");
      fetchAllDeviceData()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container mx-auto px-6 py-3">
        <div className="relative mb-3">
          <h6 className="mb-0 flex">
            <button className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500">
              <span>Device - {device?.name}</span>
            </button>
            {userData.role !== "operator" && (
              <button
                onClick={() => {
                  setDeviceModal(true)
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path d="M12 20h9" />{" "}
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </button>
            )}
            {(userData.role !== "operator" && userData.role !== "engineer") && (
              <button className="mx-2" onClick={handleDeleteDevice}>
                <MdDelete size={24} />
              </button>
            )}
          </h6>

          <div>
            <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
              Manufacturer - {device?.manufacturer}
            </div>
            <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
              Purchase Date - {device?.purchase_date}
            </div>
            <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
              Serial Number - {device?.serial_number}
            </div>
            {userData.role !== "engineer" && (
              <button onClick={() => setDeviceDataModal(true)} style={{
                backgroundColor: "deepskyblue",
                padding: "10px",
                borderRadius: "10px",
                color: "white",
                marginBottom: "10px"
              }}>Add Device Data</button>
            )}
            <hr />
            {allDeviceData.map((d) => (
              <div key={d.id} style={{ boxShadow: "0 0 5px 0 black", marginBottom: "10px", borderRadius: "10px" }}>
                <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
                  Device location - {d?.location}
                </div>
                <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
                  Device humidity - {d?.humidity}
                </div>
                <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
                  Device temperature - {d?.temperature}
                </div>
                <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
                  Device value - {d?.value}
                </div>
                <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
                  Device battery level - {d?.battery_level}
                </div>
                <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
                  Device status - {d?.status}
                </div>
                {userData.role !== "engineer" && (
                  <button
                    className="m-4"
                    onClick={() => {
                      setDeviceDataModal(true)
                      setDeviceData({
                        device_id: d.device_id,
                        timestamp: d.timestamp,
                        temperature: d.temperature,
                        humidity: d.humidity,
                        value: d.value,
                        location: d.location,
                        status: d.status,
                        battery_level: d.battery_level
                      })
                      setEditId(d.id)
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path d="M12 20h9" />{" "}
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                )}
                {(userData.role !== "operator" && userData.role !== "engineer") && (
                  <button className="mx-2" onClick={() => handleDeleteDeviceData(d.id)}>
                    <MdDelete size={24} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {deviceDataModal && (
        <DeviceDataModal
          editId={editId}
          setDeviceData={setDeviceData}
          setDeviceDataModal={setDeviceDataModal}
          setEditId={setEditId}
          deviceId={deviceId}
          deviceData={deviceData}
          handleEditDeviceData={handleEditDeviceData}
          handleAddDeviceData={handleAddDeviceData}
        />
      )}
      {deviceModal && (
        <EditDeviceModal
          setDeviceModal={setDeviceModal}
          fetchDeviceById={fetchDeviceById}
          device={device}
          setDevice={setDevice}
          users={users}
          handleEditDevice={handleEditDevice}
          deviceId={deviceId}
        />
      )}
    </>
  );
};

export default DeviceDetails;
