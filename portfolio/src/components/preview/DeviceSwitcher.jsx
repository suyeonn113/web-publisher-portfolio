const DEVICE_LABELS = {
  mobile: "Mobile",
  tablet: "Tablet",
  desktop: "Desktop",
};

const DeviceSwitcher = ({ devices, selectedDevice, onChange }) => {
  return (
    <div className="device-switcher" aria-label="디바이스 선택">
      {Object.keys(devices).map((device) => (
        <button
          key={device}
          type="button"
          aria-pressed={selectedDevice === device}
          onClick={() => onChange(device)}
        >
          {DEVICE_LABELS[device] ?? device}
        </button>
      ))}
    </div>
  );
};

export default DeviceSwitcher;
