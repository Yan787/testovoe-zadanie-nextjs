import * as React from 'react';

import {IField} from '../model/fieldType';
import styles from './Field.module.css';
import cn from 'classnames';

export function Field({
  placeholder,
  type = 'text',
  error,
  ...props
}: React.ComponentProps<'input'> & IField) {
  return (
    <div className={cn(styles.common, styles.field)}>
      <label>
        <span>{placeholder}</span>
        <input type={type} data-slot="input" {...props} />
      </label>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
}
