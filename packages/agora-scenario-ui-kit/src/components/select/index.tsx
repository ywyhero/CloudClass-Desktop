import React, { FC } from 'react';
import classnames from 'classnames';
import { BaseProps } from '~components/interface/base-props';
import RcSelect, { Option } from 'rc-select';

import './index.css'
export interface SelectProps extends BaseProps {
    defaultValue?: string;
    value?: string | number;
    placeholder?: string;
    listHeight?: number;
    size?: 'large' | 'middle' | 'small';
    onChange?: (value: string | number) => void;
}

export const Select: FC<SelectProps> = ({
    defaultValue,
    value,
    placeholder,
    listHeight,
    size = 'middle',
    onChange = value => { console.log('change', value) },
    className,
    ...restProps
}) => {
    const cls = classnames({
        [`select select-${size}`]: 1,    
        [`${className}`]: !!className,
    });
    return (
        <RcSelect
            className={cls}
            dropdownClassName={'select-dropdown'}
            defaultValue={defaultValue}
            value={value}
            placeholder={placeholder}
            listHeight={listHeight}
            showArrow
            onChange={onChange}
            {...restProps}
        />
    )
}

Select.Option = Option