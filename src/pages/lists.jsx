import { Helmet } from 'react-helmet-async';
import { ListsView } from 'src/sectionsk/lists/view';

export default function ListsPage() {
  return (
    <>
      <Helmet>
        <title> Lists | Pentra </title>
      </Helmet>

      <ListsView />
    </>
  );
}

