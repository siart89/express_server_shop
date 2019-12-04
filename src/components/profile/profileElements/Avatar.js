import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AvatarBox,
  AddInp,
  InputLabel,
} from '../profileStyles/styles';
import setUrl from '../../../store/actions/setUrl';


const Avatar = ({ name }) => {
  const url = useSelector((state) => state.isAuth.avatar);
  const dispatch = useDispatch();

  const handleSendData = async (e) => {
    const data = new FormData();

    data.append('avatar', e.target.files[0]);
    const resp = await fetch('/profile/avatar', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
      body: data,
    });
    const result = await resp.json();

    dispatch(setUrl(result.url));
  };

  return (
    <AvatarBox url={url}>
      <InputLabel htmlFor="avatar">
        {!url && name[0].toUpperCase()}
      </InputLabel>
      <form
        style={{ position: 'relative' }}
      >
        <AddInp
          type="file"
          name="avatar"
          id="avatar"
          onChange={handleSendData}
        />
      </form>
    </AvatarBox>

  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Avatar;
