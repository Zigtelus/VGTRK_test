// modules
import React, { useState } from "react";
import InputMask from "react-input-mask";

// main code

type Data = {
  name: string;
  mask: string;
  type: string;
  placeholder: string;
};

const data: Data[] = [
  {
    name: "Имя",
    mask: "aaaaaaaaaaaaaaaaaaaa",
    type: "firstName",
    placeholder: "FEDOR",
  },
  {
    name: "Фамилия",
    mask: "aaaaaaaaaaaaaaaaaaaa",
    type: "lastName",
    placeholder: "FEDOROV",
  },
  {
    name: "Дата действия карты",
    mask: "99/99",
    type: "date",
    placeholder: "00/00",
  },
  {
    name: "Номер карты",
    mask: "9999 9999 9999 9999",
    type: "numberCard",
    placeholder: "0000 0000 0000 0000",
  },
  {
    name: "CVC/CVV",
    mask: "999",
    type: "code",
    placeholder: "000",
  }
];

const validationRules: Record<string, (value: string) => boolean> = {
  firstName : (value) => value.length > 0,
  lastName  : (value) => value.length > 0,
  date      : (value) => value.length >= 5,
  numberCard: (value) => value.length >= 19,
  code      : (value) => value.length >= 3
};

export const FirstTask: React.FC = () => {
  const [form, setForm] = useState<Record<string, string>>({
    firstName : "",
    lastName  : "",
    date      : "",
    numberCard: "",
    code      : ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    let { value } = event.target;

    if (type === "firstName" || type === "lastName") {
      value = value.toUpperCase();
    }

    setForm((state) => ({ ...state, [type]: value }));
  };

  const sendForm = () => {
    let isValidForm = true;

    data.forEach((item) => {
      const value = form[item.type];
      const validate = validationRules[item.type];
      if (validate && !validate(value)) {
        isValidForm = false;
      }
    });

    if (isValidForm) {
      setForm({
        firstName : "",
        lastName  : "",
        date      : "",
        numberCard: "",
        code      : ""
      });

      alert("Форма отправлена");
    }
  };

  return (
    <div className="first_task">
      first task

      <form className="card">
        {data.map((value) => (
          <label key={value.name} className="card__item">
            {value.name}
            <InputMask
              mask        = {value.mask}
              value       = {form[value.type]}
              onChange    = {(event) => handleInputChange(event, value.type)}
              placeholder = {value.placeholder}
              maskChar    = {null}
            >
              {(inputProps: any) => (
                <div
                  className={
                    validationRules[value.type](form[value.type])
                      ? "container_input-active"
                      : "container_input"
                  }
                >
                  <div className="indicator"></div>
                  <input {...inputProps} type="text" aria-label={value.name} />
                </div>
              )}
            </InputMask>
          </label>
        ))}

        <button
          type     = "button"
          disabled = {!Object.values(form).every((value, index) => validationRules[data[index].type](value))}
          onClick  = {sendForm}
        >
          отправить форму
        </button>
      </form>
    </div>
  );
};
