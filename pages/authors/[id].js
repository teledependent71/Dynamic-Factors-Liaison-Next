import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/thq-react-components'
import PropTypes from 'prop-types'

import authorsPageInitialPaths3d6ecResource from '../../resources/authors-page-initial-paths-3d6ec'
import authorsPageInitialProps17afdResource from '../../resources/authors-page-initial-props-17afd'

const Authors11 = (props) => {
  return (
    <>
      <div className="authors11-container">
        <Head>
          <title>Authors1 - Dynamic Factors Liaison</title>
          <meta
            property="og:title"
            content="Authors1 - Dynamic Factors Liaison"
          />
        </Head>
        <DataProvider
          renderSuccess={(AuthorsEntity) => (
            <>
              <div className="authors11-container1">
                <h1>{AuthorsEntity?.name}</h1>
                <span>{AuthorsEntity?.id}</span>
              </div>
            </>
          )}
          initialData={props.authorsEntity}
          persistDataDuringLoading={true}
          key={props?.authorsEntity?.id}
        />
      </div>
      <style jsx>
        {`
          .authors11-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .authors11-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Authors11.defaultProps = {
  authorsEntity: [],
}

Authors11.propTypes = {
  authorsEntity: PropTypes.array,
}

export default Authors11

export async function getStaticPaths() {
  const response = await authorsPageInitialPaths3d6ecResource({})
  return {
    paths: (response?.data || []).map((item) => {
      return {
        params: {
          id: (item?.id).toString(),
        },
      }
    }),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const response = await authorsPageInitialProps17afdResource({
    ...context?.params,
  })
  return {
    props: {
      authorsEntity: response?.data?.[0],
      ...response?.meta,
    },
    revalidate: 60,
  }
}
