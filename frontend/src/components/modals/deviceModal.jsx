const DeviceModal = ({ setDeviceModal, setDevice, device, users, handleAddDevice }) => {
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
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Add Device
                            </h3>
                            <button
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                                onClick={() => {
                                    setDeviceModal(false)
                                    setDevice({})
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
                                    for="device location"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Name<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={device.name}
                                    onChange={(event) =>
                                        setDevice({ ...device, name: event.target.value })
                                    }
                                    name="name"
                                    id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                      block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    for="serial"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Serial Number<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={device.serial_number}
                                    onChange={(event) =>
                                        setDevice({
                                            ...device,
                                            serial_number: event.target.value,
                                        })
                                    }
                                    name="serial"
                                    id="serial"
                                    className="bg-gray-50 border border-gray-300 
                      text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                      dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    for="manufac"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Manufacturer<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={device.manufacturer}
                                    onChange={(event) =>
                                        setDevice({ ...device, manufacturer: event.target.value })
                                    }
                                    name="manufac"
                                    id="manufac"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                      block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>

                            <label
                                for="users"
                                className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Select a user<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                                id="users"
                                value={device.user}
                                onChange={(event) =>
                                    setDevice({ ...device, user: event.target.value })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option disabled>Choose a user</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.username}
                                    </option>
                                ))}
                            </select>

                            <div className="flex items-center">
                                <input
                                    id="checked-checkbox"
                                    type="checkbox"
                                    value={device.is_active}
                                    onChange={(event) =>
                                        setDevice({ ...device, is_active: event.target.value })
                                    }
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                     focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    for="checked-checkbox"
                                    className="ms-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Active Device
                                </label>
                            </div>

                            <button onClick={() => handleAddDevice()} className="w-full mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default DeviceModal