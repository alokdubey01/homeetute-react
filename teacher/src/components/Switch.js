import './switch.css'
export default function Switches({ isOn, handleToggle, onColor }) {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
            />
            <label
                style={{ background: isOn && onColor }}
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className={`react-switch-button`} />
            </label>
        </>
    );
}
