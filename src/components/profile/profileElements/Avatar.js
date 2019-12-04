import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AvatarBox,
  AddInp,
  InputLabel,
  Tip,
  SubmitBtn,
} from '../profileStyles/styles';
import setUrl from '../../../store/actions/setUrl';


const Avatar = ({ name }) => {
  const [tips, setTips] = useState('');
  const [file, setFile] = useState(null);
  const url = useSelector((state) => state.isAuth.avatar);
  const dispatch = useDispatch();

  const handleSendData = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('avatar', file);
    const resp = await fetch('/profile/avatar', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
      body: data,
    });
    const result = await resp.json();

    dispatch(setUrl(result.url));
    setFile(null);
  };

  return (
    <AvatarBox url={url}>
      <InputLabel isOnIn={tips} htmlFor="avatar">
        {!url && name[0].toUpperCase()}
      </InputLabel>
      <form
        style={{ position: 'relative' }}
        onSubmit={handleSendData}
        onMouseLeave={() => setTips(false)}
        onMouseOverCapture={() => setTips(true)}
      >
        <AddInp
          type="file"
          name="avatar"
          id="avatar"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {tips && <Tip>Добавить изображение</Tip>}
        {file && (
          <SubmitBtn
            type="submit"
          >
            +
          </SubmitBtn>
        )}
      </form>
    </AvatarBox>

  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Avatar;
