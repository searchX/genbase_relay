import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'home',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'projects',
    path: '/projects',
    icon: icon('ic--baseline-queue'),
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: icon('ic--baseline-settings-suggest'),
  },  // }
];

export default navConfig;
