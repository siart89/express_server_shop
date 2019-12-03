import React, { useState } from 'react';
import { AvatarBox, AddInp, InputLabel, Tip } from '../profileStyles/styles';

const Avatar = ({ url }) => {
  const [tips, setTips] = useState('');
  console.log(tips);
  return (
    <AvatarBox url={url}>
      {!url && (
        <form
          style={{ position: 'relative' }}
          action="/profile/avatar"
          method="post"
          encType="multipart/form-data"
          onMouseLeave={() => setTips(false)}
          onMouseOverCapture={() => setTips(true)}
        >
          <InputLabel isOnIn={tips}>
            <AddInp type="file" name="avatar" />
          </InputLabel>
          {tips && <Tip>Добавить изображение</Tip>}
          <button type="submit">click</button>
        </form>
      )}
    </AvatarBox>
  );
};

export default Avatar;
