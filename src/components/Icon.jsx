
import React from 'react';
import classnames from 'classnames';

export const Icon = ({ icon, className }) => <i className={classnames('icon', `ico-${icon}`, className)}/>;
