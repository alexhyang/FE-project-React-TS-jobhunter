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
    <article>
      <header>
        <h2>
          {jobTitle}{" "}
          <span>
            <a target="_blank" rel="noopener noreferrer" href={postingUrl}>
              link
            </a>
          </span>
        </h2>
        <p>
          {company} - {location}
        </p>
      </header>
      <section>
        <div>
          <p>Job Level: {jobLevel}</p>
          <p>Job Type: {jobType}</p>
          <p>{`Due Date: ${applicationDueDate.slice(0, 10)}`}</p>
        </div>
        <div>
          <h4>Responsibilities</h4>
          <ul>
            {responsibilities.map((elem, index) => (
              <li key={index}>{elem}</li>
            ))}
          </ul>
          <h4>Qualifications</h4>
          <ul>
            {qualifications.map((elem, index) => (
              <li key={index}>{elem}</li>
            ))}
          </ul>
          <h4>Skills</h4>
          <ul>
            {skills.map((elem, index) => (
              <li key={index}>{elem}</li>
            ))}
          </ul>
          {other && (
            <>
              <h4>Notes</h4>
              <p>{other}</p>
            </>
          )}
        </div>
      </section>
    </article>
  );
}
