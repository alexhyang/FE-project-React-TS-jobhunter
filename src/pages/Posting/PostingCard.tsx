import React from "react";
import { IPostingGet } from "interfaces";

export default function PostingCard(props: { data: IPostingGet }) {
  const {
    jobTitle,
    company,
    location,
    jobLevel,
    jobType,
    applicationDueDate,
    responsibilities,
    qualifications,
    skills,
    postingUrl,
    other
  } = props.data;
  return (
    <div>
      <h3>{jobTitle}<span><a target="_blank" rel="noreferrer" href={postingUrl}>link</a></span></h3>
      <p>Company: {company}</p>
      <p>Location: {location}</p>
      <p>Job Level: {jobLevel}</p>
      <p>Job Type: {jobType}</p>
      <p>Due Date: {applicationDueDate.slice(0, 10)}</p>
      <p>Responsibilities</p>
      <ul>
        {responsibilities.map((elem, index) => (
          <li key={index}>{elem}</li>
        ))}
      </ul>
      <p>Qualifications</p>
      <ul>
        {qualifications.map((elem, index) => (
          <li key={index}>{elem}</li>
        ))}
      </ul>
      <p>Skills</p>
      <ul>
        {skills.map((elem, index) => (
          <li key={index}>{elem}</li>
        ))}
      </ul>
      <p>{other}</p>
    </div>
  );
}
