export default ({
  name,
  mail,
  phone,
  avatar,
}) => ({
  type: 'AUTH_OK',
  payload: {
    name,
    mail,
    phone,
    avatar,
    ok: true,
  },
});
