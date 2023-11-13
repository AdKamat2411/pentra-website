import { Helmet } from 'react-helmet-async';

import { ConversationsView } from 'src/sectionsk/conversations/view';

// ----------------------------------------------------------------------

export default function ConversationsPage() {
  return (
    <>
      <Helmet>
        <title> Conversations </title>
      </Helmet>

      <ConversationsView />
    </>
  );
}
