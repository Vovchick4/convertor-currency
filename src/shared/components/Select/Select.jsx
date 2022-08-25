import { Fragment, useMemo, useState } from "react";
import styles from "./Select.module.css";

export default function Select({
  options = [],
  value = "",
  onChangeSelectItem = () => {},
}) {
  const [open, setOpen] = useState(false);
  const classes = useMemo(() => {
    const clss = [styles["content_options"]];

    if (open) {
      clss.push(styles.active);
    }

    return clss;
  }, [open]);

  function toggleSelect() {
    setOpen((prev) => !prev);
  }

  return (
    <Fragment>
      {open && (
        <div className={styles.select_content_dimmer} onClick={toggleSelect} />
      )}

      <div className={styles.select_content}>
        <div className={styles.open_options} onClick={toggleSelect}>
          <p>{value.cc}</p>
        </div>

        <div className={styles.main_content}>
          <ul className={classes.join(" ")}>
            <li
              className={styles.li_option}
              onClick={() => {
                onChangeSelectItem({ cc: "UAH", rate: 1 });
                toggleSelect();
              }}
            >
              <p>
                Українська гривня <span>UAH</span>
              </p>
            </li>

            {options.length > 0 &&
              options.map(({ txt, cc, ...rest }) => (
                <li
                  key={txt}
                  className={styles.li_option}
                  onClick={() => {
                    onChangeSelectItem({ cc, ...rest });
                    toggleSelect();
                  }}
                >
                  <p>
                    {txt} <span>{cc}</span>
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
