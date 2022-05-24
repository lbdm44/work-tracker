import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

import { AwesomeLink } from '../components/AwesomeLink';

interface LinkNode {
  id: string;
  title: string;
  url: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface LinkEdge {
  cursor: string;
  node: LinkNode;
}

interface LinkPageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

interface AllLinksData {
  links: {
    edges: LinkEdge[];
    pageInfo: LinkPageInfo;
  };
}

const AllLinksQuery = gql`
  query allLinksQuery($first: Int, $after: String) {
    links(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          imageUrl
          url
          title
          category
          description
          id
        }
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading, error, fetchMore } = useQuery<AllLinksData>(
    AllLinksQuery,
    {
      variables: { first: 2 },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load data</p>;

  const { endCursor, hasNextPage } = data.links.pageInfo;

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto max-w-5xl my-20">
        <div className={styles.grid}>
          {' '}
          {/* "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" */}
          {data?.links.edges.map(({ node }) => (
            <AwesomeLink
              className={styles.card}
              title={node.title}
              category={node.category}
              url={node.url}
              id={node.id}
              description={node.description}
              imageUrl={node.imageUrl}
              key={node.id}
            />
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.links.edges = [
                    ...prevResult.links.edges,
                    ...fetchMoreResult.links.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You&apos;ve reached the end!{' '}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
