import Head from "next/head";

const SEO = ({ seoData, PageTitle }) => {
  return (
    <>
      {seoData ? (
        <Head>
          <title>
            {seoData?.metaTitle || "CompanyNeeds"} - CompanyNeeds E-commerce
            Website
          </title>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content={seoData?.metaDescription} />
          <meta name="title" content={seoData?.metaTitle} />
          <meta name="robots" content={seoData?.metaRobots} />
          <meta name="keywords" content={seoData?.keywords} />
          <meta property="og:title" content={seoData?.metaTitle} />
          <meta property="og:description" content={seoData?.metaDescription} />
          <meta property="og:url" content={seoData?.canonicalURL} />
          <meta
            property="og:image"
            content={seoData?.metaImage?.data?.attributes?.url}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoData?.metaSocial?.title} />
          <meta
            name="twitter:description"
            content={seoData?.metaSocial?.description}
          />
          <meta
            name="twitter:image"
            content={seoData?.metaSocial?.image?.data?.attributes?.url}
          />
          {/*<meta name="viewport" content={seoData?.metaViewport} /> */}
          <meta name="author" content="CompanyNeeds" />
          <meta name="publisher" content="CompanyNeeds" />
          <link rel="canonical" href={seoData?.canonicalURL} />
          <link rel="icon" href="/favicon.png" />
        </Head>
      ) : (
        <Head>
          <title>{PageTitle} - CompanyNeeds E-commerce Website</title>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="description" content={"Add Description"} />
          <meta name="title" content={PageTitle} />
          <meta
            name="robots"
            content={"index, follow, max-image-preview:large,"}
          />
          <meta name="keywords" content={PageTitle} />
          <meta property="og:title" content={PageTitle} />
          <meta property="og:description" content={"Add Description"} />
          <meta property="og:url" content={"https://www.companyneeds.com/"} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={PageTitle} />
          <meta name="twitter:description" content={"Add Description"} />
          <meta
            name="viewport"
            content={"width=device-width, initial-scale=1, maximum-scale=1"}
          />
          <meta name="author" content="CompanyNeeds" />
          <meta name="publisher" content="CompanyNeeds" />
          <link rel="canonical" href={"https://www.companyneeds.com/"} />
          <link rel="icon" href="/favicon.png" />
        </Head>
      )}
    </>
  );
};

export default SEO;
