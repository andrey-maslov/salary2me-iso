import React from 'react';
import PopoverExport from '../popover-export/PopoverExport';
import PopoverMore from '../popover-more/PopoverMore';
import {useTranslation} from 'react-i18next';

import style from './top-bar.module.scss';

interface TopBarProps {
    userResult: [string, number][]
    details: string[]
}

const TopBar: React.FC<TopBarProps> = ({userResult, details}) => {

    const {t} = useTranslation()

  return (
      <div className={style.top}>
          <h4 className={style.title}>{t('common:result_page.your_profile')}</h4>
          <PopoverMore userResult={userResult} details={details}/>
          <PopoverExport/>
      </div>
  );
}

export default TopBar;