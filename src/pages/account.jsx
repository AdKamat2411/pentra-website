import { Helmet } from 'react-helmet-async';

import { AccountView } from 'src/sectionsk/account/view';
import { ListsView } from 'src/sectionsk/lists/view';


// ----------------------------------------------------------------------

export default function ListsPage() {
  return (
    <>
      <Helmet>
        <title> Account | Pentra </title>
      </Helmet>

      <AccountView />
    </>
  );
}
