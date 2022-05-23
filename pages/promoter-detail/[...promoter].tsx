import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import React, { FC } from 'react'
import Navbar from '../../components/Navbar';
import styles from '../../styles/promoterDetail.module.scss';


interface Props {
  promoter: any,
}

const promoterDetail: FC<Props> = ({ promoter }) => {
  console.log(promoter)
  return (
    <>
      <Navbar />
      <div>
        <div className={styles['bg']}>
        </div>
        <div className={styles['promoter-card-wrapper']}>
          <div className={styles['promoter']}>
            <div className={styles['img-container']}>

            </div>
            <div className={styles['personal-info']}>
              <div className={styles['personal-info--column']}>
                <span className={styles['name']}>
                  John doe
                </span>
                <span className={styles['role']}>
                  Promoter
                </span>
              </div>
              <div className={styles['personal-info--column']}>
                <span>
                  mail
                </span>
                <span>
                  phone
                </span>
              </div>
            </div>
          </div>
          <div className={styles['description']}>

          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { promoter } = context.query;
  if (!promoter?.[0]) {
    return {
      redirect: {
        destination: '/properties',
        permanent: false,
      },
      props: {}
    }
  }

  const p = await axios.post(`${process.env.NEXTAUTH_URL}/api/promoter/find`, {
    promoter
  }).then(found => {
    return found.data
  }).catch(err => {
    console.log(err);
  });


  if (p?.success === 1) {
    return {
      props: {
        promoter: p.data,
      }
    }
  }

  return {
    notFound: true,
    props: {},
  }
}


export default promoterDetail