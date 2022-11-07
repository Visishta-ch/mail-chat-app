import React from 'react'
import { SlOptionsVertical } from 'react-icons/sl';
import { SlArrowDown } from 'react-icons/sl';
import { SlActionRedo } from 'react-icons/sl';

import styles from './Main.module.css';
const Icons = () => {
  return (
    <>
        <div className={styles['email-section-left']}>
          <span>
            <input type="checkbox" />
          </span>
          <span className={styles['sidebar-icons']}>
            <SlArrowDown />
          </span>
          <span className={styles['sidebar-icons']}>
            <SlActionRedo />
          </span>
          <span className={styles['sidebar-icons']}>
            <SlOptionsVertical />
          </span>
        </div>

        <div className={styles['email-section-right']}></div>
        {/*promotions section start */}
        <div className={styles['email-List']}>
          <div className={styles['list-header']}>
            <span>
              <h4>Primary</h4>
            </span>
          </div>
          <div className={styles['list-header']}>
            <span>
              <h4>Social</h4>
            </span>
          </div>
          <div className={styles['list-header']}>
            <span>
              <h4>Promotions</h4>
            </span>
          </div>
        </div>
    </>
  )
}

export default Icons