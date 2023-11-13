import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Home',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Pentra Creators',
    path: '/products',
    icon: icon('ic_user'),
  },
  {
    title: 'Conversations',
    path: '/conversations',
    icon: icon('ic_blog'),
  },
  {
    title: 'My campaigns',
    path: '/campaigns',
    icon: icon('ic_blog'),
  },
  {
    title: 'My Lists',
    path: '/lists',
    icon: icon('ic_blog'),
  },
  {
    title: 'Global Search',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'My Account',
    path: '/account',
    icon: icon('ic_lock'),
  },
  
];

export default navConfig;
