import React, { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

import { IPostingPost, IFormData } from "interfaces";
import { baseURL } from "env";
import { TYPE_OPTIONS, LEVEL_OPTIONS } from "../formSelectOptions";

export default function PostingForm() {
  const { register, handleSubmit, setValue, getValues } = useForm<IFormData>();
  const [data, setData] = useState<string>("");
  const onSubmit: SubmitHandler<IFormData> = (data) => {
    const dataNormalized: IPostingPost = normalizeData(data);
    const dataNormalizedJSON = JSON.stringify(dataNormalized);
    setData(dataNormalizedJSON);
    axios
      .post(`${baseURL}/api/postings`, dataNormalized)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const formatTextarea = () => {
    setValue("responsibilities", convertToHTML(getValues("responsibilities")));
    setValue("qualifications", convertToHTML(getValues("qualifications")));
  };

  const convertToHTML = (text: string): string => {
    return (
      "- " +
      text.replaceAll(/[-][\s]+/g, "").replace(/(\s*<br>)*[\n]+/g, "\n- ")
    );
  };

  const normalizeData = (data: IFormData): IPostingPost => {
    const {
      postingUrl,
      jobTitle,
      company,
      location,
      jobType,
      jobLevel,
      applicationDueDate,
      responsibilities,
      qualifications,
      skills,
      other
    } = data;
    const dataNormalized: IPostingPost = {
      postingUrl,
      jobTitle,
      company,
      location,
      jobType,
      jobLevel,
      applicationDueDate,
      responsibilities: normalizeTextarea(responsibilities),
      qualifications: normalizeTextarea(qualifications),
      skills: skills.split(", "),
      other
    };
    return dataNormalized;
  };

  const normalizeTextarea = (text: string): string[] => {
    return text
      .slice(2)
      .split("\n- ")
      .filter((entry) => entry !== "");
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">URL*</label>
        <input
          className="form-control"
          type="url"
          {...register("postingUrl")}
        />
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label className="form-label">Title*</label>
          <input
            className="form-control"
            type="text"
            {...register("jobTitle")}
          />
        </div>
        <div className="col">
          <label className="form-label">Company*</label>
          <input
            className="form-control"
            type="text"
            {...register("company")}
          />
        </div>
        <div className="col">
          <label className="form-label">Location*</label>
          <input
            className="form-control"
            type="text"
            {...register("location")}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col">
          <label className="form-label">Type*</label>
          <select className="form-select" {...register("jobType")}>
            {TYPE_OPTIONS.map((jobType) => (
              <option key={jobType.id} value={jobType.value}>
                {jobType.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className="form-label">Level*</label>
          <select className="form-select" {...register("jobLevel")}>
            {LEVEL_OPTIONS.map((jobLevel) => (
              <option key={jobLevel.id} value={jobLevel.value}>
                {jobLevel.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className="form-label">Due Date*</label>
          <input
            className="form-control"
            type="date"
            {...register("applicationDueDate")}
          />
        </div>
      </div>
      <div>
        <label className="form-label">Responsibilities*</label>
        <textarea
          className="form-control"
          {...register("responsibilities")}
          style={{ height: "250px" }}
        />
      </div>
      <div>
        <label className="form-label">Qualifications*</label>
        <textarea
          className="form-control"
          {...register("qualifications")}
          style={{ height: "250px" }}
        />
      </div>
      <div>
        <label className="form-label">Skills*</label>
        <input className="form-control" {...register("skills")} />
      </div>
      <div>
        <label className="form-label">Other</label>
        <input className="form-control" {...register("other")} />
      </div>

      <p>{data}</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={formatTextarea}
      >
        Format textarea
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
