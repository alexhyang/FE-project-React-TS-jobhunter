import React, { useState, ChangeEvent } from "react";
import Form from "./FormControlled";
import FormReactBoots from "./FormReactBoots";

export default function New() {
  const options = [
    {
      value: "Controlled",
    },
    {
      value: "FormReactBoots",
    },
    // {
      // value: "FormMUI",
    // },
  ];
  const [selectedOption, setSelectOption] = useState<string>("Controlled");

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectOption(e.target.value);
  };

  return (
    <div>
      <h1>
        Add New Posting
      </h1>
      {options.map(({ value }) => (
        <label key={value}>
          <input
            type="radio"
            value={value}
            checked={selectedOption == value}
            onChange={handleOptionChange}
          />
          {value}
        </label>
      ))}
      {selectedOption === "Controlled" && <Form />}
      {selectedOption === "FormReactBoots" && <FormReactBoots />}
    </div>
  );
}
