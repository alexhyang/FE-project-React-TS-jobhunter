import React from "react";
import { Controller } from "react-hook-form";
import { IFormValues, ITextField, ISelectField } from "./interfaces";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const labelize = (name: keyof IFormValues): string =>
  name &&
  name
    .split(/[^A-Za-z0-9]/g)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ");

export function TextField(props: ITextField) {
  return (
    <Form.Group
      as={props.asCol ? Col : undefined}
      className={props.asCol ? "" : "mb-3"}
    >
      <Form.Label>
        {labelize(props.name)}
        {props.required ? "*" : ""}
      </Form.Label>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue=""
        render={({ field }) => (
          <Form.Control type={props.type || undefined} {...field} />
        )}
      />
    </Form.Group>
  );
}

export function SelectField(props: ISelectField) {
  return (
    <Form.Group
      as={props.asCol ? Col : undefined}
      className={props.asCol ? "" : "mb-3"}
    >
      <Form.Label>
        {labelize(props.name)}
        {props.required && "*"}
      </Form.Label>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => (
          <Form.Select {...field}>
            {props.options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        )}
      />
    </Form.Group>
  );
}

export function TextArea(props: ITextField) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {labelize(props.name)}
        {props.required ? "*" : ""}
      </Form.Label>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => (
          <Form.Control as="textarea" style={{ height: "250px" }} {...field} />
        )}
      />
    </Form.Group>
  );
}
