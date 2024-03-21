import { right } from "@popperjs/core";
import { getTrackBackground, Range } from "react-range";

const InputRange = ({ STEP, MIN, MAX, values, handleChanges }) => {
  return (
    <>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(vals) => handleChanges(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "3px",
              width: "100%",
              background: getTrackBackground({
                values: values,
                colors: ["#EDEDED", "var(--tp-theme-primary)", "#EDEDED"],
                min: MIN,
                max: MAX,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "17px",
              width: "5px",
              backgroundColor: "var(--tp-theme-primary)",
              backgroundColor: isDragged
                ? "var(--tp-theme-primary)"
                : "var(--tp-theme-primary)",
            }}
          />
        )}
      />
    </>
  );
};

export default InputRange;
