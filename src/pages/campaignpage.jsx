import { Helmet } from 'react-helmet-async';

import { ConversationsView } from 'src/sectionsk/campaignpage/view';

// ----------------------------------------------------------------------

export default function ConversationsPage() {
  return (
    <>
      <Helmet>
        <title> Campaign Page </title>
      </Helmet>

      <ConversationsView />
    </>
  );
}
