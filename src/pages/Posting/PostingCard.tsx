import React from "react";
import { IListing } from "../../interfaces";

export default function PostingCard(props: { data: IListing }) {
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
      <h3>{jobTitle}</h3>
      <h3>{company}</h3>
      <h3>{location}</h3>
      <h3>{jobLevel}</h3>
      <h3>{jobType}</h3>
      <p>{applicationDueDate.toString()}</p>
      <p>{responsibilities}</p>
      <p>{qualifications}</p>
      <p>{skills}</p>
      <p>{postingUrl}</p>
      <p>{other}</p>
    </div>
  );
}
