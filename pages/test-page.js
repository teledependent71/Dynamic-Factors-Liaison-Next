import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/thq-react-components'

import testPageResource from '../resources/test-page'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Dynamic Factors Liaison</title>
          <meta
            property="og:title"
            content="test-page - Dynamic Factors Liaison"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_d3z73m) => (
            <>
              <h1>{context_d3z73m?.name}</h1>
            </>
          )}
          initialData={props.contextD3z73mProp}
          persistDataDuringLoading={true}
          key={props?.contextD3z73mProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  const contextD3z73mProp = await testPageResource({
    ...context?.params,
  })
  return {
    props: {
      contextD3z73mProp: contextD3z73mProp?.data?.[0],
    },
  }
}
