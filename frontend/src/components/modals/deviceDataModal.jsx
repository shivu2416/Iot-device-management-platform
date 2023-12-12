const DeviceDataModal = ({ editId, setDeviceData, setDeviceDataModal, setEditId, deviceId,
    deviceData, handleEditDeviceData, handleAddDeviceData }) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)" /* Semi-transparent dark background */
        }}>
            <div
                tabindex="-1"
                aria-hidden="true"
            // className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {editId ? "Edit" : "Add"} Device Data
                            </h3>
                            <button
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                                onClick={() => {
                                    setDeviceDataModal(false)
                                    setDeviceData({})
                                    setEditId("")
                                }}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <div>
                                <label
                                    for="device_id"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Device Id
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    value={deviceId}
                                    name="device_id"
                                    id="device_id"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    for="timestamp"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Timestamp<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={deviceData.timestamp}
                                    onChange={(event) => setDeviceData({ ...deviceData, timestamp: event.target.value })}
                                    name="timestamp"
                                    id="timestamp"
                                    className="bg-gray-50 border border-gray-300 
                  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                                <small>Please enter the timestamp with this format "2023-12-09T18:50:34.236Z"</small>
                            </div>
                            <div className="mt-2">
                                <label
                                    for="device location"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Device Location
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={deviceData.location}
                                    onChange={(event) => setDeviceData({ ...deviceData, location: event.target.value })}
                                    name="device location"
                                    id="device location"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    for="humidity"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Device Humidity<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={deviceData.humidity}
                                    onChange={(event) => setDeviceData({ ...deviceData, humidity: event.target.value })}
                                    name="humidity"
                                    id="humidity"
                                    className="bg-gray-50 border border-gray-300 
                  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    for="temp"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Device Temperature<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={deviceData.temperature}
                                    onChange={(event) => setDeviceData({ ...deviceData, temperature: event.target.value })}
                                    name="temp"
                                    id="temp"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    for="value"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Device Value<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={deviceData.value}
                                    onChange={(event) => setDeviceData({ ...deviceData, value: event.target.value })}
                                    name="value"
                                    id="value"
                                    className="bg-gray-50 border border-gray-300 
                  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    for="level"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Device Battery Level<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={deviceData.battery_level}
                                    onChange={(event) => setDeviceData({ ...deviceData, battery_level: event.target.value })}
                                    name="level"
                                    id="level"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    for="status"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Device Status<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={deviceData.status}
                                    onChange={(event) => setDeviceData({ ...deviceData, status: event.target.value })}
                                    name="status"
                                    id="status"
                                    className="bg-gray-50 border border-gray-300 
                  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                                <small>Device status should be only online or offline</small>
                            </div>
                            <button
                                onClick={() => editId ? handleEditDeviceData() : handleAddDeviceData()}
                                className="w-full mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default DeviceDataModal