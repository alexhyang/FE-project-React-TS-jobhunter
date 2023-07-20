import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../env";
import { IListing } from "interfaces";

export default function Notes() {
  const [data, setData] = useState<IListing[]>();
  useEffect(() => {
    axios
      .get(`${baseURL}/api/notes`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      {data ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Position</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((posting) =>
              posting.other ? (
                <tr key={posting._id}>
                  <td>{posting._id}</td>
                  <td>
                    <a href={posting.postingUrl}>{posting.jobTitle}</a>
                  </td>
                  <td>{posting.other}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
