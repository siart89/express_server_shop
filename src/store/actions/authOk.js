export default ({
  name,
  mail,
  phone,
  avatar,
  id,
}) => ({
  type: 'AUTH_OK',
  payload: {
    name,
    mail,
    phone,
    avatar,
    ok: true,
    id,
  },
});
