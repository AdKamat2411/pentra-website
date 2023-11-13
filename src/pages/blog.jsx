import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sectionsk/campaigns/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Campaigns </title>
      </Helmet>

      <BlogView />
    </>
  );
}
