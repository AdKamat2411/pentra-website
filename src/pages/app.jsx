import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sectionsk/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Home | Pentra* </title>
      </Helmet>

      <AppView />
    </>
  );
}
