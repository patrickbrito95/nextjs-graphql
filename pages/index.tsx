import Head from "next/head";
import { useQuery } from "@apollo/client";

import QUERY_COUNTRIES from "./queryCountries.graphql";
import { Wrapper, WrapperCountries } from "../styles/styles";
import { Col, Row } from "react-bootstrap";

export default function Home() {
  const { data, loading, error } = useQuery(QUERY_COUNTRIES);

  if (error) {
    return <p>:( an error happened</p>;
  }


  return (
    <Col>
      <Head>
        <title>Países</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Países</h1>

      {loading && <p>Carregando...</p>}


      <WrapperCountries>
        {data?.countries?.map((country) => (
          <Wrapper key={country.code}>
            {country.name} {country.emoji}
            <br />
            capital:{country.capital}
          </Wrapper>
        ))}
      </WrapperCountries>
       
    </Col>
  );
}
