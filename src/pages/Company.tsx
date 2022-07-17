import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Container from '../components/Container';

interface ICompanyProps {
  token: string | null;
}

const Company: React.FC<ICompanyProps> = (props) => {
  const { param } = useParams();
  const id = param?.split('-').join(' ');
  useEffect(() => {
    if (!props.token) return;
    return () => {
      const fetchData = async () => {
        const response = await fetch('', {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        });
      };
      fetchData();
    };
  }, []);

  return (
    <>
      <Container>
        {!props.token ? <Navigate to={'/'} replace={true} /> : ''}
        {id}
      </Container>
    </>
  );
};

export default Company;
