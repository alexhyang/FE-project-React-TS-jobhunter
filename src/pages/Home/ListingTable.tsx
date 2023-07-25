import React from "react";
import { Link } from "react-router-dom";
import { IPostingGet } from "interfaces";

export default function ListingTable(props: { data: IPostingGet[] }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Level</th>
          <th>Company</th>
          <th>Location</th>
          <th>{"Due Date"}</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((posting: IPostingGet) => (
          <tr key={posting._id}>
            <td>
              <Link to={`/postings/${posting._id}`}>{posting.jobTitle}</Link>
            </td>
            <td>{posting.jobLevel}</td>
            <td>{posting.company}</td>
            <td>{posting.location}</td>
            <td>{posting.applicationDueDate.slice(0, 10)}</td>
            <td>{posting.other ? "YES" : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
