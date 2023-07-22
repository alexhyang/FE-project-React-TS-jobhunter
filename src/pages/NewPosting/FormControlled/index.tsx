import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

import { IFormData } from "./interfaces";
import { TYPE_OPTIONS, LEVEL_OPTIONS } from "../formSelectOptions";

export default function PostingForm() {
  const { register, handleSubmit } = useForm<IFormData>();
  const [data, setData] = useState<string>("");
  const onSubmit: SubmitHandler<IFormData> = (data) =>
    setData(JSON.stringify(data));

  return (
    <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">URL*</label>
        <input className="form-control" type="text" {...register("postingUrl")} />
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label className="form-label">Title*</label>
          <input className="form-control" type="text" {...register("jobTitle")} />
        </div>
        <div className="col">
          <label className="form-label">Company*</label>
          <input className="form-control" type="text" {...register("company")} />
        </div>
        <div className="col">
          <label className="form-label">Location</label>
          <input className="form-control" type="text" {...register("location")} />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label className="form-label">Type*</label>
          <select className="form-select" {...register("jobType")}>
            {TYPE_OPTIONS.map((jobType) => (
              <option key={jobType.id} value={jobType.value}>{jobType.label}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className="form-label">Level*</label>
          <select className="form-select" {...register("jobLevel")}>
            {LEVEL_OPTIONS.map((jobLevel) => (
              <option key={jobLevel.id} value={jobLevel.value}>{jobLevel.label}</option>
            ))}
          </select>
        </div>
        <div className="col">
            <label className="form-label">
              Due Date
            </label>
            <input className="form-control" type="date" {...register("applicationDueDate")} />
        </div>
      </div>
      <div>
        <label className="form-label">
          Responsibilities
        </label>
        <textarea className="form-control" {...register("responsibilities")} style={{ height: "250px" }}/>
      </div>
      <div>
        <label className="form-label">
          Qualifications
        </label>
        <textarea className="form-control" {...register("qualifications")} style={{ height: "250px" }}/>
      <div>
      </div>
        <label className="form-label">
          Other
        </label>
        <input className="form-control" {...register("other")} />
      </div>

      <p>{data}</p>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
