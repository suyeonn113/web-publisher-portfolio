const DEVICE_LABELS = {
  mobile: "Mobile",
  tablet: "Tablet",
  desktop: "Desktop",
};

const DeviceSwitcher = ({
  devices,
  selectedDevice,
  disabledDevices = [],
  onChange,
}) => {
  return (
    <div className="device-switcher" aria-label="디바이스 선택">
      {Object.keys(devices).map((device) => {
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
