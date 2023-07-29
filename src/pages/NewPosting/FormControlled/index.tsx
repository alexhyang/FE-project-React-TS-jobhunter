import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import { IPostingPost, IFormData } from "interfaces";
import { baseURL } from "env";
import { TYPE_OPTIONS, LEVEL_OPTIONS } from "../formSelectOptions";
import { normalizeFormData } from "../helperFunc";

import "bootstrap/dist/css/bootstrap.min.css";

export default function PostingForm() {
  const skillRef = useRef<HTMLInputElement>(null);
  const [uniqueSkills, setUniqueSkills] = useState<string[]>([]);
  const [formattedTextarea, setFormattedTextarea] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const today = new Date();
  const { register, handleSubmit, reset, setValue, getValues } =
    useForm<IFormData>({
      defaultValues: {
        postingUrl: "",
        jobTitle: "",
        company: "",
        location: "",
        jobType: ["Full-time"],
        jobLevel: "Junior",
        applicationDueDate: today.toISOString().slice(0, 10),
        responsibilities: "",
        qualifications: "",
        skills: "",
        other: ""
      }
    });

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    const dataNormalized: IPostingPost = normalizeFormData(data);
    console.log("Form Data: ", data);
    console.log("Submit Data: ", dataNormalized);
    axios
      .post(`${baseURL}/api/postings`, dataNormalized)
      .then((response) => {
        console.log(response.data);
        if (response.status == 201) {
          reset();
          setFormattedTextarea(false);
          setAlertVariant("success");
          setAlertMessage("Posting added successfully");
          setShowAlert(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setAlertVariant("danger");
        setAlertMessage("Posting added unsuccessfully");
        setShowAlert(true);
      });
  };

  const formatTextarea = () => {
    const convertToHTML = (text: string): string => {
      return (
        "- " +
        text.replaceAll(/[-][\s]+/g, "").replace(/(\s*<br>)*[\n]+/g, "\n- ")
      );
    };
    setValue("responsibilities", convertToHTML(getValues("responsibilities")));
    setValue("qualifications", convertToHTML(getValues("qualifications")));
    setFormattedTextarea(true);
  };

  const addExistingSkill = () => {
    const skill = skillRef.current?.value || "";
    const prevSkills = getValues("skills");
    if (skill !== "") {
      if (prevSkills == "") {
        setValue("skills", skill);
      } else {
        setValue("skills", getValues("skills") + `, ${skill}`);
      }
    }
    if (skillRef.current) {
      skillRef.current.value = "";
    }
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/summaries/skills?option=unique`)
      .then((response) => {
        setUniqueSkills(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }, [alertVariant]);

  return (
    <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
      {showAlert && (
        <div className={`alert alert-${alertVariant}`}>{alertMessage}</div>
      )}

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

      <div className="mb-3">
        <label className="form-label">Responsibilities*</label>
        <textarea
          className="form-control"
          {...register("responsibilities")}
          style={{ height: "250px" }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Qualifications*</label>
        <textarea
          className="form-control"
          {...register("qualifications")}
          style={{ height: "250px" }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Skills*</label>
        <input className="form-control" {...register("skills")} />
      </div>
      <div className="row row-cols-auto mb-3">
        <div className="col">
          <input
            className="form-control"
            ref={skillRef}
            placeholder="Search skills"
            type="text"
            list="skillsList"
          />
          <datalist id="skillsList">
            {uniqueSkills.map((skill) => (
              <option key={skill} value={skill} />
            ))}
          </datalist>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addExistingSkill}
          >
            Add Skill
          </button>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Other</label>
        <input className="form-control" {...register("other")} />
      </div>

      <div className="row row-cols-auto mb-3">
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={formatTextarea}
          >
            Format textarea
          </button>
        </div>
        <div className="col">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formattedTextarea}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="row row-cols-auto">
        <div className="col">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}
