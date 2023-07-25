import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IPostingGet } from "interfaces";

export default function ListingTable(props: { data: IPostingGet[] }) {
  const [descendingId, setDescendingId] = useState<boolean>(false);

  const toggleDescendingId = () => {
    setDescendingId(!descendingId);
  };

  const data = props.data;

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th onClick={toggleDescendingId} style={{ cursor: "pointer" }}>
            ID
            <span>{descendingId ? -1 : 1} </span>
          </th>
          <th>Title</th>
          <th>Level</th>
          <th>Company</th>
          <th>Location</th>
          <th>{"Due Date"}</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {data.map((posting: IPostingGet) => (
          <tr key={posting._id}>
            <td>{posting._id}</td>
            <td>
              <Link to={`/posting/${posting._id}`}>{posting.jobTitle}</Link>
            </td>
            <td>{posting.jobLevel}</td>
            <td>{posting.company}</td>
            <td>{posting.location}</td>
            <td>{posting.applicationDueDate.toString()}</td>
            <td>{posting.other ? "YES" : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
