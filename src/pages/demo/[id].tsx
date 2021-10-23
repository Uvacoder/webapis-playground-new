import React from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import SEO from '@bradgarropy/next-seo';

import { getDemoById } from 'services/demo';

function Demo() {
  let router = useRouter();
  let id = router.query.id as string;

  let [demo, setdemo] = React.useState(getDemoById(id));

  React.useEffect(() => {
    setdemo(getDemoById(id));
  }, [id]);

  let Component = dynamic(() => import(`../../modules/demos/${id}`), {
    ssr: false,
  });

  return (
    <React.Fragment>
      <SEO
        title={`Web APIs Playground - ${demo?.title}`}
        description={demo?.description}
        icon={demo?.emoji}
      />
      <Component />
    </React.Fragment>
  );
}

export default Demo;
