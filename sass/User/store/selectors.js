import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

const userStateSelector = (state) => state.user;

export const isLoggedInSelector = createSelector(
  userStateSelector,
  ({ user }) => !isEmpty(user),
);
