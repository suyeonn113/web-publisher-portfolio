const DEVICE_LABELS = {
  mobile: "Mobile",
  tablet: "Tablet",
  desktop: "Desktop",
  wide: "Wide",
};

const DeviceSwitcher = ({
  devices,
  deviceKeys = Object.keys(devices),
  selectedDevice,
  disabledDevices = [],
  onChange,
}) => {
  return (
    <div className="device-switcher" aria-label="디바이스 선택">
      {deviceKeys.map((device) => {
        const isDisabled = disabledDevices.includes(device);

        return (
          <button
            key={device}
            type="button"
            aria-pressed={selectedDevice === device}
            disabled={isDisabled}
            onClick={() => onChange(device)}
          >
            {DEVICE_LABELS[device] ?? device}
          </button>
        );
      })}
    </div>
  );
};

export default DeviceSwitcher;
