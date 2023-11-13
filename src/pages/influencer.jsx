import { Helmet } from 'react-helmet-async';

import { InfluencerView } from 'src/sectionsk/influencer/view';
import { useState, useEffect } from 'react';
import { db } from 'src/firebase-config/firebase';
import { getDocs, addDoc, collection } from 'firebase/firestore';


// ----------------------------------------------------------------------
const queryParams = new URLSearchParams(window.location.search);
const pentra_id = queryParams.get('pentra_id');



export default function ListsPage() {


  return (
    <>
      <Helmet>
        <title> {pentra_id} </title>
      </Helmet>

      <InfluencerView/>
    </>
  );
}
