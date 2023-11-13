import { Helmet } from 'react-helmet-async';

import { AccountView } from 'src/sectionsk/newcampaign/view';


// ----------------------------------------------------------------------

export default function ListsPage() {
  return (
    <>
      <Helmet>
        <title> New Campaign </title>
      </Helmet>

      <AccountView />
    </>
  );
}
