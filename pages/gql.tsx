import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const GQL: NextPage = () => {
  const [time, setTime] = useState<{
    begin: number;
    end: number;
  }>({ begin: Date.now(), end: Date.now() });
  const { data, loading } = useQuery(gql`
    fragment templateCard on Template {
      authors {
        name
        avatar
      }
      name
      updatedAt
    }
    fragment updateCard on Update {
      authors {
        name
        avatar
      }
      name
      updatedAt
    }

    query {
      organizations {
        name
        projects {
          name
          templates {
            ...templateCard
          }
          updates {
            ...updateCard
          }
          updatedAt
        }
        templates {
          ...templateCard
        }
        updatedAt
        updates {
          ...updateCard
        }
      }
    }
  `);

  useEffect(() => {
    setTime({ ...time, end: Date.now() });
  }, [loading]);

  return (
    <>
      {loading ? <p>Loading...</p> : <p>Duration: ${time.end - time.begin}</p>}
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default GQL;
