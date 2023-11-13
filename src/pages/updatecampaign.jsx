import { Helmet } from 'react-helmet-async';

import { AccountView } from 'src/sectionsk/updatecampaign/view';

// ----------------------------------------------------------------------

export default function ConversationsPage() {
  return (
    <>
      <Helmet>
        <title> Update Campaign </title>
      </Helmet>

      <AccountView />
    </>
  );
}
