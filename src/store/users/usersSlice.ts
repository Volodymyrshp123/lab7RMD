import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  pib: string;
  email: string;
  phone: string;
  address: string;
}

const initialState: UserProfile = {
  pib: '',
  email: '',
  phone: '',
  address: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<UserProfile>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = usersSlice.actions;
export default usersSlice.reducer;
