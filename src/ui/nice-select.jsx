import { useState, useCallback, useRef } from "react";
import { useClickAway } from "react-use";

const NiceSelect = ({ options, placeholder, className, onChange, name }) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const ref = useRef(null);

  useClickAway(ref, onClose);

  const currentHandler = (item) => {
    setCurrent(item);
    onChange(item, name);
    onClose();
  };

  return (
    <div
      className={`nice-select ${(className, open && "open")}`}
      role="button"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      onKeyPress={(e) => e}
      ref={ref}
    >
      <span className="current">
        {current?.attributes?.name || placeholder}
      </span>
      <ul
        className="list"
        role="menubar"
        onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.stopPropagation()}
      >
        {options?.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            data-value={item.value}
            className={`option text-capitalize ${
              item?.attributes?.name === current?.attributes?.name &&
              "selected focus"
            }`}
            role="menuitem"
            onClick={() => currentHandler(item)}
            onKeyPress={(e) => e}
          >
            {item?.attributes?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NiceSelect;
