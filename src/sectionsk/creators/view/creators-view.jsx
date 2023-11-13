import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { db } from 'src/firebase-config/firebase';
import { getDocs, addDoc, collection } from 'firebase/firestore';

import { creator_avatars } from 'src/firebase-config/firebase';
import { products } from 'src/_mock/products';
import Button from '@mui/material/Button';
import ProductSearch from '../product-search';

import CreatorCard from '../creator-card';
import ProductSort from '../product-sort';
import FollowerSort from '../follower-sort';
import PlatformSort from '../platform-sort';
import EngagementSort from '../engagement-sort';
import StyleSort from '../style-sort';
import ProductFilters from '../product-filters';
import { result } from 'lodash';


// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);

  const creatorsData = collection(db, 'creators');
  const [resultLength, setResultLength] = useState(0);
  const [allCreators, setAllCreators] = useState([]);

  const [engagement, setEngagement] = useState([]);
  const [locations, setLocations] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [styles, setStyles] = useState([]);



  useEffect (() => {
  const addDocument = async () => {
  await addDoc(creatorsData, { 
    pentra_id: 12, 
    name: "Tinky itnk", 
    email: "jamesjames@g.com",
    country: "USA",
    address: "12 Main st",

    handles: { IG: "@amandacerny", TT: "", YT: "@tink", IG_bio: "", TT_bio: "", YT_bio: ""}, 
    followers: {IG: 1788, TT: 0, YT: 0}, 

    wantsGifts: true,
    wantsSponsors: false,
    gifts: { IG_story: true, tiktok: false, IG_post: true, 
    IG_reel: true, YT_video: false,  other: false},
    sponsor_rates: "",

    styles: {makeup: true, skincare: true, fashion: false, lifestyle: false},
    Date: '14 Oct', 
  
    engagement: 'A+'}); };


    const otherstuff = async () => {
      try {
        const querySnapshot = await getDocs(creatorsData);
        setAllCreators(querySnapshot.docs);
        const desiredDoc = querySnapshot.docs.find(doc => doc.data().pentra_id === 7);

      } catch (error) {
        alert(error);
      }
    }
    

  otherstuff();
  // addDocument();
  }, [])


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const searchCreators = () => {
    
    alert("done sum");
  }

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Pentra Creators
      </Typography>

      <Stack mb={4} direction="row" alignItems="center" justifyContent="space-between">
    
        <Stack direction="row" spacing={2}>
        <ProductSearch posts={products} />
      
        <ProductSort onChange={values => setLocations(values)} values={[]}/>
<FollowerSort onChange={values => setFollowers(values)} values={[]}/>
<PlatformSort onChange={values => setPlatforms(values)} values = {[]}/>
<EngagementSort onChange={values => setEngagement(values)} values={[]}/>
<StyleSort onChange={values => setStyles(values)} values={[]}/>





          

        </Stack>
        <Button onClick={() => searchCreators()}
        variant="contained" color="inherit" >
          Search: {} results
        </Button>
        </Stack>

        <Grid container spacing={3}>

        {(function() {
                    const filteredCreators = allCreators
    .sort((a, b) => a.data().pentra_id - b.data().pentra_id)
    .filter(creator => {
      const hasPlatformSelected = platforms.length > 0;
      const hasStyleSelected = styles.length > 0;
      const hasFollowerSelected = followers.length > 0;  // Use followers array
      const hasEngagementSelected = engagement.length > 0;  // Use engagement array
      const hasLocationSelected = locations.length > 0;  // Use locations array
      
        let matchesFollower = !hasFollowerSelected || followers.includes("All Followers");
        let matchesEngagement = !hasEngagementSelected || engagement.includes("All Engagement");
        let matchesLocation = !hasLocationSelected || locations.includes("Locations") || locations.includes("Global");
        let matchesPlatform = !hasPlatformSelected || platforms.includes("Platform");
        let matchesStyle = !hasStyleSelected || styles.includes("Styles");
        
        // Location Filter
        if (!matchesLocation) {
            matchesLocation = (
                (locations.includes("The West") && creator.data().country == "USA" || "UK" || "CANADA" || "AUSTRALIA") ||
                (locations.includes("US only") && creator.data().country == "USA")
                // || (locations.includes("Asia") && creator.data().country == "YourExpectedValueForAsia")
            );
        }
        
        // Follower Filter (doesnt work yet)
        if (!matchesFollower) {
          matchesFollower = (
              (followers.includes("0-5k Followers") && (creator.data().followers.IG < 5000 || creator.data().followers.TT < 5000 || creator.data().followers.YT < 5000)) ||
              (followers.includes("5-10k Followers") && (creator.data().followers.IG > 5000 && creator.data().followers.IG < 10000 || creator.data().followers.TT > 5000 && creator.data().followers.TT < 10000 || creator.data().followers.YT > 5000 && creator.data().followers.YT < 10000)) ||
              (followers.includes("10-50k Followers") && creator.data().followers.IG > 10000 || creator.data().followers.TT > 10000 || creator.data().followers.YT > 10000)
          );
      }

      // Platforms Filter
      if (!matchesPlatform) {
        matchesPlatform = (
            (platforms.includes("Tiktok") && creator.data().handles.TT !== "") ||
            (platforms.includes("YouTube") && creator.data().handles.YT !== "") ||
            (platforms.includes("Instagram") && creator.data().handles.IG !== "")
        );
    }

      // Engagement Filter
      if (!matchesEngagement) {
        matchesEngagement = (
            (engagement.includes("A+") && creator.data().engagement == "A+") ||
            (engagement.includes("A") && creator.data().engagement == "A") ||
            (engagement.includes("B+") && creator.data().engagement == "B+") ||
            (engagement.includes("B") && creator.data().engagement == "B") ||
            (engagement.includes("C") && creator.data().engagement == "C")

        );
    }


        // Styles Filter
        if (!matchesStyle) {
            matchesStyle = (
                (styles.includes("Makeup") && creator.data().styles.makeup) ||
                (styles.includes("Skincare") && creator.data().styles.skincare) ||
                (styles.includes("Fashion") && creator.data().styles.fashion) ||
                (styles.includes("Lifestyle") && creator.data().styles.lifestyle)
            );
        }

        return matchesPlatform && matchesEngagement && matchesStyle && matchesLocation && matchesFollower;  // Return true if both platform and style conditions are satisfied
    })
    
      console.log(`${filteredCreators.length} creators`);
                    
      return filteredCreators.map((creator) => (
        <Grid key={creator.data().pentra_id} xs={12} sm={6} md={3}>
            <CreatorCard creator={creator.data()} pfp={creator_avatars[`${creator.data().pentra_id}`]} />
        </Grid>
    ));
  })()
}


</Grid>



    </Container>
  );
}
