import React from 'react';
import { Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const routes = [
  {
    path: '/movies',
    breadcrumb: 'Movie management',
  },
];

export default function BreadCrumbNav() {
  const breadcrumbs = useBreadcrumbs(routes);
  const breadcrumbItems = breadcrumbs.slice(2).map(({ breadcrumb, match }) => ({
    title: <NavLink to={match.pathname}>{breadcrumb}</NavLink>,
  }));

  return <Breadcrumb className="p-5" items={breadcrumbItems} />;
}
