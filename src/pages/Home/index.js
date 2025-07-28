import React from 'react';
import { Helmet } from 'react-helmet-async';
import HomeBanner from '../../widgets/HomeBanner';
import BrowseTheRange from '../../widgets/BrowseTheRange';
import OurProducts from '../../widgets/OurProducts';
import RoomInspiration from '../../widgets/RoomInspiration';
import ShareSetup from '../../widgets/ShareSetup';

const Home = () => (
  <>
    <Helmet>
      <title>Home | Ecom Store</title>
      <meta name="description" content="Discover the best in modern furniture, home decor, and inspiration at Ecom Store. Shop our curated collections and transform your space today!" />
      <link rel="canonical" href="/" />
      <meta property="og:title" content="Home | Ecom Store" />
      <meta property="og:description" content="Discover the best in modern furniture, home decor, and inspiration at Ecom Store. Shop our curated collections and transform your space today!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="/" />
      <meta property="og:image" content="/logo192.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Home | Ecom Store" />
      <meta name="twitter:description" content="Discover the best in modern furniture, home decor, and inspiration at Ecom Store. Shop our curated collections and transform your space today!" />
      <meta name="twitter:image" content="/logo192.png" />
      <meta name="helmet-test" content="This meta tag should appear in head if Helmet is working" />
    </Helmet>
    <div>
      <HomeBanner />
      <BrowseTheRange />
      <OurProducts />
      <RoomInspiration />
      <ShareSetup />
    </div>
  </>
);

export default Home; 