import IndexContainer from './pages/Home'
import AboutPage from './pages/About'
export default [
  {
    path: '/',
    exact: true,
    component: IndexContainer,
  },
  {
    path: '/about',
    exact: true,
    component: AboutPage,
  },
];
