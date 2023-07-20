import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormValues } from "./interfaces";
import { TYPE_OPTIONS, LEVEL_OPTIONS } from "./formSelectOptions";

import { TextField, SelectField, TextArea } from "./formComponents";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function PostingForm() {
  const { control, handleSubmit } = useForm<IFormValues>();
  const [data, setData] = useState<string>("");
  const onSubmit: SubmitHandler<IFormValues> = (data) =>
    setData(JSON.stringify(data));

  return (
    <Form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField name="url" control={control} required={true} />
      <Row className="mb-3">
        <TextField
          name="position"
          control={control}
          required={true}
          asCol={true}
        />
        <TextField
          name="company"
          control={control}
          required={true}
          asCol={true}
        />
        <TextField
          name="location"
          control={control}
          required={true}
          asCol={true}
        />
      </Row>

      <Row className="mb-3">
        <SelectField
          name="type"
          control={control}
          required={true}
          options={TYPE_OPTIONS}
          asCol={true}
        />
        <SelectField
          name="level"
          control={control}
          required={true}
          options={LEVEL_OPTIONS}
          asCol={true}
        />
        <TextField
          name="due_date"
          type="date"
          control={control}
          required={true}
          asCol={true}
        />
      </Row>
      <TextArea name="responsibilities" control={control} required={true} />
      <TextArea name="qualifications" control={control} required={true} />
      <TextField name="other" control={control} />

      <p>{data}</p>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
