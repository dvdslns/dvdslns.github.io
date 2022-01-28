/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <>
      <main className="min-h-screen bg-black text-white">
        {children}
      </main>

      <footer className="absolute bottom-8 left-8 text-xs font-extralight text-white">
        david[at]super45.cl
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
