import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Notifications from './Notifications';
import { FlexColumn, EmptyTitle } from './styles';


const ProfileBoard = () => {
  const [note, setNote] = useState([]);
  const { id } = useSelector((state) => state.currentUser);

  useEffect(() => {
    const fetchNotifications = async () => {
      const resp = await fetch(`/profile/notifications/user${id}`);
      if (resp.ok) {
        const result = await resp.json();
        setNote(result);
      }
    };
    fetchNotifications();
  }, [id]);

  return (
    <>
      <FlexColumn>
        {note.length > 0 ? (
          note.map((item) => (
            <Notifications
              key={item.id}
              title={item.title}
              bookId={item.id}
              count={item.count}
            />
          ))
        ) : (
          <EmptyTitle>Новых отзывов нет</EmptyTitle>
        )}
      </FlexColumn>
      <h2>Board</h2>
    </>
  );
};

export default ProfileBoard;
