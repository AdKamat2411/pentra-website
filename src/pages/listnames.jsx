import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

import { ListNamesView } from 'src/sectionsk/listnames/view';

import { db } from 'src/firebase-config/firebase';
import { getDocs, addDoc, collection } from 'firebase/firestore';

const queryParams = new URLSearchParams(window.location.search);
const listName = queryParams.get('listName');
const listId = queryParams.get('listId');
// const listItems = queryParams.get('listItems');
const listItems = [{name: "Amanda Cerny", platforms: [true, false, false], handles: ["@amandacerny", "N/A", "N/A"], followers: [1788, 0, 0], country: "USA"}, ];


export default function ListNamesPage() {

   
  const [lists, setLists] = useState([null]);

  const listData = collection(db, 'lists');


  const getLists = async () => {
    try {
      const data = await getDocs(listData);
      const retrievedLists = data.docs?.map((doc) => ({
          ...doc.data(),
          id: doc.id,
      })).filter(list => list.listName === listName);
  
      await setLists(retrievedLists);

    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    getLists();
  ; // 3000 milliseconds = 3 seconds

  // Clear the interval when the component unmounts to avoid memory leaks
}, []);

  return (
    <>
      <Helmet>
        <title> Lists | Pentra </title>
      </Helmet>

      <ListNamesView listName={listName} listId={listId} />
    </>
  );
}

