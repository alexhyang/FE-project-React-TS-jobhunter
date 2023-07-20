import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../env";

import ListingTable from "./ListingTable";
import { IListing } from "interfaces";

export default function Home() {
  const [data, setData] = useState<IListing[]>();
  useEffect(() => {
    axios
      .get(`${baseURL}/api/postings`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!data || data.length == 0) return <h1>No Posting found</h1>;
  return (
    <>
      <h1>{`Postings List ${data.length} in total`}</h1>
      <ListingTable data={data} />
    </>
  );
}
